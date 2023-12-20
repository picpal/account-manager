chrome.runtime.onMessage.addListener(function (
    request,
    callback,
    sendResponse
  ) {
    console.log(request.message)
  });