const isMsgValid = request => request && request.msgId && request.msgId.indexOf('foleonDevTools') === 0;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (isMsgValid(request)) {
    switch (request.msgId) {
      case 'foleonDevTools.request':
        const ls = request.data.reduce((acc, key) => {
          acc[key] = localStorage.getItem(key);
          return acc;
        }, {});
        sendResponse(ls);
        break;
      case 'foleonDevTools.set':
        Object.keys(request.data).forEach((lsKey) => {
          console.log(request.data);
          const value = request.data[lsKey];
          if (value) {
            localStorage.setItem(lsKey, value);
          } else {
            localStorage.removeItem(lsKey);
          }
        });
        sendResponse();
        break;
    }
  }
})
