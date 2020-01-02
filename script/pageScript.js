
window.RealXMLHttpRequest = window.XMLHttpRequest
window.RealFetch = window.fetch
const ID = 'miinnbnnkagjhnkjjaegkhhcoohghiol'
function _getStorage() {
  const str = sessionStorage.getItem('intercept')
  return str ? JSON.parse(str) : {}
}
function _setStorage(data) {
  sessionStorage.setItem('intercept', JSON.stringify(data))
}
const windowOnloadCb = window.onbeforeunload ? window.onbeforeunload.bind(window) : null
window.onbeforeunload = () => {
  chrome.runtime.sendMessage(ID,  { type: 'clear' })
  windowOnloadCb && windowOnloadCb()
}
window.addEventListener("message", (event) => {
  const eventData = event.data
  const type = eventData.type
  const { data={} } = eventData
  const { url } = data
  if (type === 'saveMock') {
    const mockData = _getStorage()
    mockData[url] = data.data
    _setStorage(mockData)
  } else if (type === 'cancelMock') {
    const mockData = _getStorage()
    mockData[url] = null
    _setStorage(mockData)
  }
})
const setCustomXMLHttpRequest = () => {
  function CustomXMLHttpRequest () {
    const xhr = new window.RealXMLHttpRequest()
    for (let key in xhr) {
      if (key === 'onreadystatechange') {
        xhr.onreadystatechange = (...args) => {
          if (this.readyState === 4) {
            const { requestId, url } = this._requestInfo
            const storageData = _getStorage()
            const urlHandled = url.split('?')[0]
            const mockData = storageData[urlHandled]
            if (mockData) {
              this.responseText = mockData
              this.response = mockData
            }
            chrome.runtime.sendMessage(ID, { type: 'update',
              data: {
                response: this.response,
                requestId,
                status: this.status,
                isUseMock: !!mockData
              } })
            this.onreadystatechange && this.onreadystatechange.apply(this, args)
          }
        }
        continue
      } else if (key === 'onload') {
        xhr.onload = (...args) => {
          const { requestId, url } = this._requestInfo
          const storageData = _getStorage()
          const urlHandled = url.split('?')[0]
          const mockData = storageData[urlHandled]
          if (mockData) {
            this.responseText = mockData
            this.response = mockData
          }
          chrome.runtime.sendMessage(ID, { type: 'update',
            data: {
              response: this.response,
              requestId: requestId,
              status: this.status,
              isUseMock: !!mockData
            } })
          this.onload && this.onload.apply(this, args)
        }
        continue
      } else if (key === 'send') {
        this.send = (...args) => {
          const data = this._requestInfo
          chrome.runtime.sendMessage(ID, { type: 'push', data })
          xhr.send(...args)
        }
        continue
      } else if (key === 'open') {
        this.open = (method, url, ...args) => {
          const requestId = new Date().getTime()
          this._requestInfo = { method, url, requestId }
          xhr.open(method, url, ...args)
        }
        continue
      }
      if (typeof xhr[key] === 'function') {
        this[key] = xhr[key].bind(xhr)
      } else {
        if (key === 'responseText' || key === 'response') {
          Object.defineProperty(this, key, {
            get: () => this[`_${key}`] ? this[`_${key}`] : xhr[key],
            set: val => this[`_${key}`] = val,
            enumerable: true
          })
        } else {
          Object.defineProperty(this, key, {
            get: () => xhr[key],
            set: (val) => xhr[key] = val,
            enumerable: true
          })
        }
      }
    }
  }
  window.XMLHttpRequest = CustomXMLHttpRequest
}
const setCustomFetch = () => {
  const customFetch = async function (url, options = {}, ...args) {
    const requestId = new Date().getTime()
    const { method = 'GET' } = options
    const data = { method, url, requestId }
    chrome.runtime.sendMessage(ID,  { type: 'push', data })
    try {
      const response = await window.RealFetch(url, options, ...args)
      let txt = void 0
      const mockData = _getStorage()
      const urlHandled = url.split('?')[0]
      if (mockData[urlHandled]) {
        txt = JSON.parse(mockData[urlHandled])
      }
      if(!response.ok) {
        chrome.runtime.sendMessage(ID, {
          type: 'update',
          data: {
            response: response.statusText,
            requestId,
            status: response.status,
            isUseMock: false
          }
        })
        return response
      }
      if (!txt) {
        txt = await response.json()
      }
      chrome.runtime.sendMessage(ID, {
        type: 'update',
        data: {
          response: txt,
          requestId,
          status: response.status,
          isUseMock: !!mockData[urlHandled]
        }
      })
      const stream = new ReadableStream({
        start(controller) {
          const bufView = new Uint8Array(new ArrayBuffer(txt.length));
          for (var i = 0; i < txt.length; i++) {
            bufView[i] = txt.charCodeAt(i);
          }
          controller.enqueue(bufView);
          controller.close();
        }
      });
      const newResponse = new Response(stream, {
        headers: response.headers,
        status: response.status,
        statusText: response.statusText,
      });
      const proxy = new Proxy(newResponse, {
        get: function(target, name){
          switch(name) {
            case 'ok':
            case 'redirected':
            case 'type':
            case 'url':
            case 'useFinalURL':
            case 'body':
            case 'bodyUsed':
              return response[name];
          }
          return target[name];
        }
      });
      for (let key in proxy) {
        if (typeof proxy[key] === 'function') {
          proxy[key] = proxy[key].bind(newResponse);
        }
      }
      proxy.json = () => {
        return txt
      }
      return proxy
    } catch(error) {
      console.log(error)
    }
  }
  window.fetch = customFetch
}

setCustomXMLHttpRequest()
setCustomFetch()