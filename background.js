chrome.action.onClicked.addListener(async (tab) => {

    chrome.storage.sync.get(
        ["sourceUrl", "isJSON", "jsonField", "toClipboard"],
        (items) => {
            chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
                let response;
                let result;
                if (items.isJSON) {
                    response = await fetch(items.sourceUrl, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        },
                        credentials: 'include',
                    });

                    let json = await response.json();
                    result = json[items.jsonField]

                }
                else {

                    response = await fetch(items.sourceUrl, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/text;charset=utf-8'
                        },
                        credentials: 'include',
                    });

                    result = await response.text();
                }
                chrome.tabs.sendMessage(tabs[0].id,
                    {
                        message: items.toClipboard ? "copyText" : "directText",
                        url: items.sourceUrl,
                        isJSON: items.isJSON,
                        toClipboard: items.toClipboard,
                        jsonField: items.jsonField,
                        reponse: response.status,
                        textToCopy: result
                    }, function (response) { })
            })

        }
    );
});
