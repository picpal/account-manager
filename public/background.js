chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "navigateAndSend") {
        // 페이지 이동 요청
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.update(tabs[0].id, {url: request.url}, function() {
                // 페이지 로딩 완료 시 값을 전달하기 위한 리스너 설정
                chrome.tabs.onUpdated.addListener(function onUpdated(tabId, changeInfo) {
                    if (tabId === tabs[0].id && changeInfo.status === 'complete') {
                        // 페이지 로딩 완료되면 값 전달
                        chrome.tabs.sendMessage(tabId, {action: "fillInput", value: request.value});
                        // 리스너 제거
                        chrome.tabs.onUpdated.removeListener(onUpdated);
                    }
                });
            });
        });
    }
});

