const inputAdd = document.querySelector("input[type='text']");
const addButton = document.querySelector(".button_add");
const box = document.querySelector(".cell_list");

let itemList = [];

if(localStorage.getItem('todo')){
  itemList = JSON.parse(localStorage.getItem('todo'));
  addCells();
  if(itemList.length>9) {
    box.style.overflowY="scroll";
  }
}

addButton.addEventListener("click", () => {
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
  itemList.forEach(function(item, i){
    elem += `<div class="cell">
    <input type="checkbox" id="elem_${i}"${item.checked ? "checked" : ''}>
    <label for="elem_${i}" style="font-family:Courier;font-size:16px;">${item.todo}</label></div>`;
    //class="${item.important ? "important" : ''}
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
      
    }
  })
})

// box.addEventListener('contextmenu', function(event){
//   event.preventDefault();
//   itemList.forEach(function(item, i){
//     if(item.todo === event.target.innerHTML){
//       itemList.splice(i, 1);
//       item.important = !item.important;
//       addCells();
//       localStorage.setItem('todo', JSON.stringify(itemList));
//     }
//   })
// })