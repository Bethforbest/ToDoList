const inputAdd = document.querySelector("input[type='text']");
const addButton = document.querySelector(".button_add");
const box = document.querySelector(".cell_list");
const clearButton = document.getElementById("clearAll");
const btn = document.getElementById(".btnright");
const showUnchecked = document.getElementById("showUnchecked");

let itemList = [];

if(itemList.length === 0) {
  box.innerHTML = '<div style="font-family:Courier;font-size:20px;text-align:center;margin-top:100px;">Your ToDo List is empty;)</div>';
}

if(localStorage.getItem('todo')){
  itemList = JSON.parse(localStorage.getItem('todo'));
  addCells();
  if(itemList.length>9) {
    box.style.overflowY="scroll";
  }
}

addButton.addEventListener("click", () => {
  console.log(inputAdd.value, typeof inputAdd.value);
  if (!inputAdd.value.length || !inputAdd.value.trim().length) {
    return null;
  }

  let newTodo = {
    todo: inputAdd.value,
    checked: false,
    important: false
  };
  itemList.push(newTodo);
  addCells();
  localStorage.setItem('todo', JSON.stringify(itemList));
  inputAdd.value="";
  if(itemList.length>9) {
    box.style.overflowY="scroll";
  }
});

function addCells(){
  let elem = "";
  if(itemList.length === 0) {
    box.innerHTML = '<div style="font-family:Courier;font-size:20px;text-align:center;margin-top:100px;">Your ToDo List is empty;)</div>';
  }
  itemList.forEach(function(item, i){
    elem += `<div class="cell">
    <input type="checkbox" id="elem_${i}" ${item.checked ? "checked" : ''}>
    <label for="elem_${i}" style="font-family:Courier;font-size:16px;" 
    class=${item.checked ? "isChecked" : ''}>${item.todo}</label>
    <button id="elem_${i}" style="btnright">Delete</button></div>`;
    box.innerHTML = elem;
  })
}

box.addEventListener('change', function(event){
  let idInput = event.target.getAttribute('id');
  let forLabel = box.querySelector('[for=' + idInput + ']');
  console.log(forLabel);
  let valueLabel = forLabel.innerHTML;

  itemList.forEach(function(item) {
    if (item.todo === valueLabel) {
      item.checked = !item.checked;
      localStorage.setItem('todo', JSON.stringify(itemList));
      addCells();
      
    }
  })
  
showUnchecked.addEventListener('change', function(event){
  if (showUnchecked === checked) {
    item.checked.style.display="none";
  } else {
    item.checked.style.display="none";
}
});

btn.forEach(onclick = () => {
  itemList.forEach(function(item, i){
        itemList.splice(i, 1);
        addCells();
        localStorage.setItem('todo', JSON.stringify(itemList));
      })
})

// box.addEventListener('contextmenu', function(event){
//   event.preventDefault();
//   itemList.forEach(function(item, i){
//     if(item.todo === event.target.innerHTML){
//       itemList.splice(i, 1);
//     } else {
//       item.important = !item.important;
//     }
//     addCells();
//     localStorage.setItem('todo', JSON.stringify(itemList));
//   })
// })

clearButton.addEventListener("click", () => {
  itemList.splice(0, itemList.length);
  localStorage.removeItem('todo');
  addCells();
  localStorage.setItem('todo', JSON.stringify(itemList));
});