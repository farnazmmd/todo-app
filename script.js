const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
let todos = JSON.parse(localStorage.getItem("todos")) || [];
function renderTodos(){
    list.innerHTML = "";
    todos.forEach((todo, index) => {
        const li = document.createElement("li");
        li.textContent = todo.text;
        if(todo.done)
            li.classList.add("done");

        li.addEventListener("click", () => {
            todos[index].done = !
            todos[index].done;
            saveAndRender();
        });
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.addEventListener("click", (e) =>{
            e.stopPropagation();
            todos.splice(index,1);
            saveAndRender();
        });
        li.appendChild(deleteBtn);
        list.appendChild(li);
    });
    }
    function saveAndRender(){
        localStorage.setItem("todos",JSON.stringify(todos));
        renderTodos();
    }
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const newTodo = input.value.trim();
        if(newTodo !== ""){
            todos.push({ text: newTodo, done: false});
            saveAndRender();
            input.value = "";
        }
    });
    renderTodos();
