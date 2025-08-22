(() => {
  'use strict'

  const APP_ID = kintone.app.getId(); //「進捗閲覧システム」のアプリID
  const userInfo = kintone.getLoginUser();
  const userCode = userInfo.code; // ユーザーコード
  const url =  kintone.api.url('/v1/user/organizations.json',true) + '?code=' + encodeURIComponent(userCode);

  kintone.events.on('app.record.edit.show',
    async (event) => {
      const record = event.record
      // 編集時に対象の項目を入力不可にする
      record["control_no"].disabled = true; 
      record["date_benefit"].disabled = true; 
      record["status_name"].disabled = true; 
      record["date_received"].disabled = true; 
      record["date_examination"].disabled = true; 
      record["date_approval"].disabled = true; 
      record["date_application_shipping"].disabled = true; 
      record["date_deficiency_shipping"].disabled = true; 
      record["date_deficiency_return"].disabled = true; 
      record["name"].disabled = true; 
      record["date_birth"].disabled = true; 
      record["household_no"].disabled = true; 
      record["name_kana"].disabled = true; 
      record["date_birth_japanese"].disabled = true; 
      record["date_gender"].disabled = true; 
      record["ac_bank_name"].disabled = true; 
      record["ac_bank_code"].disabled = true; 
      record["ac_type_name"].disabled = true; 
      record["jpb_code_no"].disabled = true; 
      record["ac_branch_name"].disabled = true; 
      record["ac_branch_code"].disabled = true; 
      record["ac_no"].disabled = true; 
      record["jpb_ac_no"].disabled = true; 
      record["ac_name_kana"].disabled = true;
      console.log("test1")

      // 「開発者」「Toppan管理者」のユーザーがログインし
      return new kintone.Promise((resolve,reject) => {
        kintone.api(url, 'GET', {}).then((resp) => {
          const userOrganizations = resp.organizationTitles.map(org => org.organization.name); // 所属組織名の配列
          const targetOrganization = ["開発者","Toppan管理者"];
          let isTargetOrg = false;
          isTargetOrg = targetOrganization.some(org => userOrganizations.includes(org))
          targetOrganization.forEach((org) => {
          if (!isTargetOrg) {
            isTargetOrg = userOrganizations.includes(org);
          }
        })
         record["application_form"].disabled = !isTargetOrg;
         console.log("test2")
         resolve(event)
        })
      })
  })  
  
  kintone.events.on([
    "app.record.create.show",
    "app.record.edit.show"
  ],(event) => {
    // 「年齢」項目は常に入力不可 
     const record = event.record
     record["age"].disabled = true; 
     return event;
    })
 
    kintone.events.on([
      "app.record.create.change.date_birth",
      "app.record.edit.change.date_birth",
    ],(event) => {
      // 「生年月日（西暦）」項目の入力値が変化したら、「年齢」項目を入れなおす
      const record = event.record;
      if (record["date_birth"].value != undefined ) {
        record["age"].value = calculation_age (record);
      } 
      else {
        record["age"].value = ""
      }
      return event;
    })
    
    // 詳細画面表示時、新規作成画面表示時、編集画面表示時
    kintone.events.on([
      "app.record.create.show",
      "app.record.edit.show",
      "app.record.detail.show",
    ],(event) => {
         const resp = kintone.api(url, 'GET', {})
            .then(function(resp) {
              const userOrganizations = resp.organizationTitles.map(org => org.organization.name); // 所属組織名の配列

              console.log("所属組織:", userOrganizations); // 確認用
 
            // 特定の組織に属しているかチェック
              const targetOrganization = ["開発者","Toppan管理者"];
              let isTargetOrg = false
              targetOrganization.forEach((org) => {
                if (!isTargetOrg) {
                  isTargetOrg = userOrganizations.includes(org);
                }
              })
 
            // 「非表示」グループにある項目を非表示にする
              kintone.app.record.setFieldShown("hidden_group",isTargetOrg)
           })
           .catch(function (error) {
              console.error("組織情報の取得に失敗:", error);
            })
            return event
          })

    // 詳細画面表示時
    kintone.events.on([
      "app.record.detail.show",
    ],(event) => {
    // 「生年月日（西暦）」項目に値があり、「年齢」項目の値が空欄の時に年齢を計算する処理
    const record = event.record;
    const RECORD_ID = kintone.app.record.getId(); // 更新したいレコードのID
    if ((record.date_birth.value != null && record.date_birth.value != "") && record.age.value == "") {
     const recordData = {
       age: {
           value: calculation_age(record)
       }
     };
      // kintone APIでレコードを更新
     kintone.api(kintone.api.url("/k/v1/record", true), "PUT", {
       app: APP_ID,
       id: RECORD_ID,
       record: recordData
     }).then(function(resp) {
        console.log("レコードが更新されました", resp);
     }).catch(function(error) {
        console.error("レコード更新エラー", error);
     }) 

    //  画面を1度だけ更新する
     window.name = ""
     if (window.name != "any") {
      window.location.href = window.location.pathname + "?nocache=" + new Date().getTime();
      location.reload();
      window.name = "any";
    } else {
      window.name = "";
    }
   }
  })
})()

// 年齢計算の際に利用し、指定の日付データを「yyyymmdd」に変換する処理
function dateToString(date, format) {

  format = format.replace(/YYYY/, date.getFullYear());
  format = format.replace(/MM/, ("0" + (date.getMonth() + 1)).slice(-2));
  format = format.replace(/DD/, ("0" + date.getDate()).slice(-2));

  return format;
}

// 「生年月日(西暦)」項目から年齢を計算する処理
function calculation_age (record) {
  const today = Number(dateToString(new Date(), "YYYYMMDD"));
  const dateOfBirth =  Number(record["date_birth"].value?.replaceAll("-",""));
  return Math.floor((today - dateOfBirth) / 10000);
}
