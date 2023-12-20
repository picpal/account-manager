chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "fillInput") {
    request.value.forEach((account) => {
      const tagName = account.tag.find((name) =>
        document.querySelector(`input[name="${name}"]`)
      );
      const $tag = tagName
        ? document.querySelector(`input[name="${tagName}"]`)
        : null;

      if ($tag) $tag.value = account.value;
    });
  }
});
