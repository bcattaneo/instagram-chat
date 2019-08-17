const mobileAgent = 'Mozilla/5.0 (iPhone; CPU OS 10_14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1.1 Mobile/14E304 Safari/605.1.15';
const chatUrl = "*://*.instagram.com/direct/inbox/*";

function rewriteUserAgentHeader(e) {
    e.requestHeaders.forEach(function(header) {
        if (header.name.toLowerCase() == "user-agent") {
            header.value = mobileAgent;
        }
    });
    return {requestHeaders: e.requestHeaders};
}

chrome.webRequest.onBeforeSendHeaders.addListener(
    rewriteUserAgentHeader,
    {urls: [chatUrl]},
    ["blocking", "requestHeaders", "extraHeaders"]
);