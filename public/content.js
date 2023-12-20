chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "fillInput") {
        // 특정 입력 필드에 값을 할당
        document.querySelector('input#mgrId').value = request.value;
    }
});
