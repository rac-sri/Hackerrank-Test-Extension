
    chrome.webRequest.onBeforeRequest.addListener(
        function(details) {
            return {cancel:true };
        },
        {
            urls: [
                "https://*/*"
            ],
            types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
        },
        ["blocking"]
    );
// currently blocks all https sites