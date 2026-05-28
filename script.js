const input = document.querySelector("#input");
const add = document.querySelector("#add");
const list = document.querySelector("#list");

let todos = [];

const savedData = localStorage.getItem("todos");

if (savedData) {
  todos = JSON.parse(savedData);
  showTodos();
}

add.onclick = function () {
  addTodo();
};

input.addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    addTodo();
  }
});

function addTodo() {
  const text = input.value.trim(); 
  if (text === "") {
    return;
  }
  
  todos.push({ text: text, completed: false });
  saveToLocalStorage(); 
  showTodos();
  input.value = "";
}
function showTodos() {
  list.innerHTML = "";
  
  for (let i = 0; i < todos.length; i++) {
    const div = document.createElement("div");
    div.className = "todo";
    
    if (todos[i].completed) {
      div.classList.add("completed");
    }

    // 1. 할 일 텍스트 생성
    const span = document.createElement("span");
    span.innerText = todos[i].text;
    div.append(span);

    // 2. 버튼들을 담을 그룹 생성
    const btnGroup = document.createElement("div");
    btnGroup.className = "btn-group";

    const completeBtn = document.createElement("button");
    completeBtn.innerText = "완료";
    completeBtn.onclick = function() {
      todos[i].completed = !todos[i].completed; 
      saveToLocalStorage();
      showTodos();
    };

    const editBtn = document.createElement("button");
    editBtn.innerText = "수정";
    editBtn.onclick = function() {
      const newText = prompt("수정 내용", todos[i].text);
      if (newText !== null && newText.trim() !== "") {
        todos[i].text = newText;
        saveToLocalStorage();
        showTodos();
      }
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "삭제";
    deleteBtn.onclick = function() {
      todos.splice(i, 1);
      saveToLocalStorage();
      showTodos();
    };

    // 버튼 그룹에 버튼 3개 집어넣기
    btnGroup.append(completeBtn);
    btnGroup.append(editBtn);
    btnGroup.append(deleteBtn);

    // 전체 상자(div)에 버튼 그룹 추가 (텍스트 아래로 들어감)
    div.append(btnGroup);

    list.append(div);
  }
}

function saveToLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}