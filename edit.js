
(() => {
    'use strict';
     kintone.events.on('app.record.edit.show', (event) => {
        const memoButton = createUpdateButton("memos_button");
        memoButton.addEventListener('click',async () => singleUpdate(['memo']));

        const addressButton = createUpdateButton("address_button");
        addressButton.addEventListener('click',async () => singleUpdate(['postcode','address_address','address_roomnumber','address_name','address_recipient_Change']));
        
        const emergencyButton = createUpdateButton("emergency_button");
        emergencyButton.addEventListener('click',async () => singleUpdate(['emergency_stop']));

        const reissueAppFormButton = createUpdateButton("reissue_applicationform_button");
        reissueAppFormButton.addEventListener('click',async () => singleUpdate(['reissue_applicationform']));
       })

    // 更新ボタンの作成
     function createUpdateButton (spaceId) {
       const memoSpace = document.getElementById(`user-js-${spaceId}`);
       const updateButton = document.createElement('button');
       updateButton.innerText = "更新";
       updateButton.classList.add("update-button") ;
       memoSpace.replaceWith(updateButton);
       return updateButton;
     }

    //  単一更新機能
     async function singleUpdate(fieldCodes) {
        const requestParam = {
            "app":kintone.app.getId(),
            "id": kintone.app.record.getId(),
            "record": {
            }
        }
        const record = await kintone.app.record.get().record;
        fieldCodes.forEach(async (fieldCode) => {
          const value = {
            value: record[fieldCode].value
          }
          requestParam.record[fieldCode] = value; 
        })
        kintone.api(kintone.api.url('/k/v1/record.json',true),'PUT',requestParam);
        document.querySelector('.gaia-ui-actionmenu-cancel').click();
        location.reload();
     }
})();