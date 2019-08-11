// General
const igHome = 'https://www.instagram.com/';
const igInboxUrl = 'https://www.instagram.com/direct/inbox/';
const checkTimeout = 500;

// Div ID/classes
const chatIconId = 'instagram-chat';
const chatBoxId = 'chat-window';
const chatHeaderIds = ['b5itu', 'Z_FEn'];
const sendMessageIds = ['frMpI', 'X3a-9'];
const iconsClassName = '_47KiJ';

// Chat iframe
const chat = `
    <div style="margin-left: 19px;" class="mXkkY KDuQp" id="${chatIconId}">
        <a class="xWeGp" href="javascript:window.sharedObj.showOrHideChat('${chatBoxId}');">
            <span class="glyphsSpriteDirect__outline__24__grey_9 u-__7" aria-label="Direct"></span>
        </a>
    </div>
`;

// Create and hide chat-box
createChat();
createSharedObjects();

// Start loop
loop();

function createChat() {
    var chatIframe = document.createElement("iframe");
    chatIframe.setAttribute("src", igInboxUrl);
    chatIframe.setAttribute("id", chatBoxId);
    chatIframe.style.width = "320px";
    chatIframe.style.height = "480px";
    chatIframe.style.bottom = "0px";
    chatIframe.style.right = "50px";
    chatIframe.style.position = "fixed";
    chatIframe.style.boxShadow = "0 0 5px #999999";
    chatIframe.style.backgroundColor = "white";
    chatIframe.frameBorder = "0";
    chatIframe.style.display = "none"; 
    chatIframe.allowTransparency = "false";
    document.body.appendChild(chatIframe);
}

function createSharedObjects() {
    // Create shared objects
    var sharedObj = {
        showOrHideChat: function(chatBoxId) {
            var chatBox = document.getElementById(chatBoxId);
            if (chatBox.style.display == "none") {
                chatBox.style.display = "inline";
            } else {
                chatBox.style.display = "none";
            }
        }
    };
    window.wrappedJSObject.sharedObj = cloneInto(
        sharedObj,
        window,
        {cloneFunctions: true}
    );
}

// Main loop
function loop() {
    // Add chat icon to page
    try {
        if (!document.getElementById(chatIconId)) {
            var icons = document.getElementsByClassName(iconsClassName)[0];
            icons.append()
            icons.innerHTML = icons.innerHTML + chat;
        }
    } catch(ex) {}

    // Chat style tweaks
    var chatBox = document.getElementById(chatBoxId);
    try {
        var firstHeader = chatBox.contentDocument.getElementsByClassName(chatHeaderIds[0])[0];
        firstHeader.style.zIndex = 99;
    } catch(ex) {}
    try {
        var secondHeader = chatBox.contentDocument.getElementsByClassName(chatHeaderIds[1])[0];
        secondHeader.style.zIndex = 99;
    } catch(ex) {}
    try {
        var messagesContainer = chatBox.contentDocument.getElementsByClassName(sendMessageIds[0])[0];
        messagesContainer.style.paddingBottom = '30px';
    } catch(ex) {}
    try {
        var messageBox = chatBox.contentDocument.getElementsByClassName(sendMessageIds[1])[0];
        messageBox.style.background = 'white';
        messageBox.style.zIndex = 99;
        messageBox.style.position = 'fixed';
        messageBox.style.bottom = '0px';
        messageBox.style.width = '275px';
        messageBox.style.marginBottom = '15px';
        messageBox.style.marginTop = '15px';
    } catch(ex) {}

    // Block link back to instagram from chat
    try {
        var firstLink = chatBox.contentDocument.getElementsByTagName("a")[0];
        if (firstLink.href == igHome) {
            firstLink.style.display = "none";
        }
    } catch(ex) {}

    setTimeout(loop, checkTimeout);
}