
(()=> {
  'use strict';
  const APP_ID = kintone.app.getId(); //「進捗閲覧システム」のアプリID
  kintone.events.on('app.record.index.show',async(event) => {

    const targetElement = document.getElementById("target");

    const client = new KintoneRestAPIClient();
    const records = await client.record.getAllRecords({app: kintone.app.getId()});
    
    const taskIndex = createElementWithClass("div",['task-index']);
    

    records.forEach((record) => {
      const taskName = createElementWithClass("p",['task-name'],record.task.value);
      const taskItem1 = createElementWithClass("div",['task-item1']);
      taskItem1.appendChild(taskName);

      const dueTask = createElementWithClass("p",['due-task'],record.term.value);
      const taskCheck = createElementWithClass("input",['task-check']);
      taskCheck.type = "checkbox";
      const taskStatus = createElementWithClass("p",['task-status'],record.is_completed.value);

      const taskItem2 = createElementWithClass("div",['task-item2']);
      taskItem2.appendChild(dueTask);
      taskItem2.appendChild(taskCheck);
      taskItem2.appendChild(taskStatus);
      

      const task = createElementWithClass("div",['task']);
      task.appendChild(taskItem1);
      task.appendChild(taskItem2);
      
      taskIndex.appendChild(task);
    })

    const titleContent = createElementWithClass("div",['title-content']);
    const title = createElementWithClass("h1",['title']);
    titleContent.appendChild(title);

    const taskContent = createElementWithClass("div",['task-content']);
    taskContent.appendChild(taskIndex);

    const replaceElement = createElementWithClass("div",['main']);

    replaceElement.appendChild(titleContent);
    replaceElement.appendChild(taskContent);

    targetElement.replaceWith(replaceElement);
  })



function createElementWithClass(element,cls,text) {
  const createElement = document.createElement(element);
  createElement.classList.add(...cls);
  if (text) {
    createElement.innerHTML = text;
  }
  return createElement;
  }
})()