// document.addEventListener("DOMContentLoaded", () => {
//     const labelTitle = getElement("p","○○給付金　申請状況参照サービス");
//     labelTitle.classList.add("label-title");
//     console.log(labelTitle);

//     const labelAppNum = getElement("p","申請書番号：");
//     labelAppNum.classList.add("label-app-number");
//     console.log(labelAppNum);

//     const textConfirmation = getElement("p","確認書の");
//     textConfirmation.classList.add("text-confirmation");
//     console.log(textConfirmation);
    
// })

// function getElement(serachEle,searchText) {
//     let xpath = `//${serachEle}[text()=\'${searchText}\']`;
//     let resultType = XPathResult.FIRST_ORDERED_NODE_TYPE;
//     let element = document.evaluate(xpath, document, null, resultType, null).singleNodeValue;
//     return element;
// }

// 正解
const before = "C会社";
const after = "D会社";

// 問題文（空欄にして表示）
console.log(`__は__に名前を変えて、もう一度登録されて、__の子会社になりました。`);

// 正解（必要なら表示）
console.log("正解:", before, after, after);