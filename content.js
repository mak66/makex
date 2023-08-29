chrome.runtime.onMessage.addListener( // this is the message listener
    function (request, sender, sendResponse) {
        console.log('request', request)
        if (request.message === "directText") {
            insertToCurrentElement(request.textToCopy);
        }
        else if (request.message === "copyText") {
            copyToTheClipboard(request.textToCopy);
        }
        sendResponse();
    }
);

async function copyToTheClipboard(textToCopy) {
    // keep the current element so we can return focus
    const current = document.activeElement;
    const el = document.createElement('textarea');
    el.value = textToCopy;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    // return focus to current element
    document.getElementById(current.id).focus();
}

function insertToCurrentElement(textToCopy) {
    // keep the current element so we can return focus
    const currentElement = document.activeElement;
    const newValue = currentElement.value + textToCopy;
    // return focus to current element
    currentElement.value = newValue;
}