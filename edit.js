
(() => {
    'use strict';
     kintone.events.on('app.record.edit.show', (event) => {
    //    const memoSpace = document.getElementById('user-js-memos_button');
    //    const updateButton = document.createElement('button');
    //    updateButton.innerText = "更新";
    //    updateButton.classList.add("update-button") 

    //    updateButton.addEventListener('click',async () => {
    //     // const dataUrl = kintone.api.url('/k/v1/record.json', true) + '?app=' + kintone.app.getId()  + '&id=' + kintone.app.record.getId();
        // const memoTextBox = document.getElementsByClassName('textarea-cybozu')[0];
    //     const memoValue = memoTextBox.value
    //     const requestParam = {
    //         "app":kintone.app.getId(),
    //         "id": kintone.app.record.getId(),
    //         "record": {
    //             "memo": {
    //                 "value":memoValue
    //             }
    //         }
    //     }

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
        // kintone.api(kintone.api.url('/k/v1/record.json',true),'PUT',requestParam);
        // console.log(location.origin + location.pathname + '#record=' + kintone.app.record.getId());
        // location.replace(location.origin + location.pathname + '#record=' + kintone.app.record.getId());
        // document.querySelector('.gaia-ui-actionmenu-cancel').click();
        // location.reload();
        const memoButton = createUpdateButton("memos_button");
        memoButton.addEventListener('click',async () => singleUpdate(['memo']));

        const addressButton = createUpdateButton("address_button");
        addressButton.addEventListener('click',async () => singleUpdate(['postcode','address_address','address_roomnumber','address_name','address_recipient_Change']));
    
       })

     function createUpdateButton (spaceId) {
       const memoSpace = document.getElementById(`user-js-${spaceId}`);
       const updateButton = document.createElement('button');
       updateButton.innerText = "更新";
       updateButton.classList.add("update-button") ;
       memoSpace.replaceWith(updateButton);
       return updateButton;
     }

     async function singleUpdate(fieldCodes) {
        const requestParam = {
            "app":kintone.app.getId(),
            "id": kintone.app.record.getId(),
            "record": {
            }
        }
        const record = await kintone.app.record.get().record;
        console.log(record);
        fieldCodes.forEach(async (fieldCode) => {
          console.log("値のセットスタート");
          const value = {
            value: record[fieldCode].value
          }
          requestParam.record[fieldCode] = value; 
          console.log("値のセット終了");
        })
        kintone.api(kintone.api.url('/k/v1/record.json',true),'PUT',requestParam);
        console.log("値の更新");
        // console.log(location.origin + location.pathname + '#record=' + kintone.app.record.getId());
        // location.replace(location.origin + location.pathname + '#record=' + kintone.app.record.getId());
        document.querySelector('.gaia-ui-actionmenu-cancel').click();
        location.reload();
     }
})();