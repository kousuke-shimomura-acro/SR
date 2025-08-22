
(() => {
    'use strict';
     kintone.events.on('app.record.edit.show', (event) => {
        const memoButton = createUpdateButton("memos_button","memo","更新");
        memoButton.addEventListener('click',async () => singleUpdate(['memo']));

        const addressButton = createUpdateButton("address_button","address","更新");
        addressButton.addEventListener('click',async () => singleUpdate(['postcode','address_address','address_roomnumber','address_name','address_recipient_Change']));
        
        const emergencyButton = createUpdateButton("emergency_button","emergency-button","更新");
        emergencyButton.addEventListener('click',async () => singleUpdate(['emergency_stop']));

        const reissueAppFormButton = createUpdateButton("reissue_applicationform_button","app-form-button","再発行依頼");
        reissueAppFormButton.addEventListener('click',async () => singleUpdate(['reissue_applicationform']));
       })

    // 更新ボタンの作成
     function createUpdateButton (spaceId,originalClass,text) {
       const memoSpace = document.getElementById(`user-js-${spaceId}`);
       const updateButton = document.createElement('button');
       updateButton.innerText = text;
       updateButton.classList.add("update-button",originalClass) ;
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