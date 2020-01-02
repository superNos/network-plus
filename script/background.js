chrome.runtime.onConnect.addListener(port => {
  const extensionListener = message => {
    chrome.tabs.query({active: true}, tabs => {
      chrome.tabs.sendMessage(tabs[0].id, message);
    });
  }
  port.onMessage.addListener(extensionListener);
  chrome.runtime.onMessageExternal.addListener(request => {
    port.postMessage(request)
    return true;
  });
})
