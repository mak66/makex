// Saves options to chrome.storage
const saveOptions = () => {
    const sourceUrl = document.getElementById('sourceUrl').value;
    const isJSON = document.getElementById('isJSON').checked;
    const toClipboard = document.getElementById('toClipboard').checked;
    const jsonField = document.getElementById('jsonField').value;

    chrome.storage.sync.set(
        { sourceUrl, isJSON, jsonField, toClipboard },
        () => {
            // Update status to let user know options were saved.
            const status = document.getElementById('status');
            status.textContent = 'Options saved.';
            setTimeout(() => {
                status.textContent = '';
            }, 750);
        }
    );
};

// Restores options stored in chrome.storage.
const restoreOptions = () => {
    chrome.storage.sync.get(
        ["sourceUrl", "isJSON", "jsonField", "toClipboard"],
        (items) => {
            document.getElementById('sourceUrl').value = items.sourceUrl;
            document.getElementById('isJSON').checked = items.isJSON;
            document.getElementById('toClipboard').checked = items.toClipboard;
            document.getElementById('jsonField').value = items.jsonField;
        }
    );
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);