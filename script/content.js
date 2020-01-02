// 在页面上插入代码
const script = document.createElement('script')
script.setAttribute('type', 'text/javascript')
script.setAttribute('src', chrome.extension.getURL('script/pageScript.js'))
document.documentElement.appendChild(script)

chrome.runtime.onMessage.addListener(request => { postMessage(request) });