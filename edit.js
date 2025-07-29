
(() => {
    'use strict';
     kintone.events.on('app.record.edit.show', (event) => {
       const memoSpace = document.getElementById('user-js-memos_button');
       const updateButton = document.createElement('button');
       updateButton.innerText = "更新";
       updateButton.classList.add("update-button") 

       updateButton.addEventListener('click',async () => {
        // const dataUrl = kintone.api.url('/k/v1/record.json', true) + '?app=' + kintone.app.getId()  + '&id=' + kintone.app.record.getId();
        const memoTextBox = document.getElementsByClassName('textarea-cybozu')[0];
        const memoValue = memoTextBox.value
        const requestParam = {
            "app":kintone.app.getId(),
            "id": kintone.app.record.getId(),
            "record": {
                "memo": {
                    "value":memoValue
                }
            }
        }

        // Object.defineProperty(window, 'onbeforeunload', {
        //  set(newValue) {
        //   if (typeof newValue === 'function') window.onbeforeunload = null;
        //  }
        // });
        // const requestParam = {
        //     "memo": {
        //             "value":memoValue
        //         }
        // }

        // kintone.app.record.set(requestParam, {"updater": true})
        kintone.api(kintone.api.url('/k/v1/record.json',true),'PUT',requestParam);
        // console.log(location.origin + location.pathname + '#record=' + kintone.app.record.getId());
        // location.replace(location.origin + location.pathname + '#record=' + kintone.app.record.getId());
        document.querySelector('.gaia-ui-actionmenu-cancel').click();
        location.reload();
       })
       memoSpace.replaceWith(updateButton);
     })
})();