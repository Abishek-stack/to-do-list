let btn=document.querySelector("#addbtn");
let ul=document.querySelector("#tasklist");
let input=document.querySelector("#taskInput");
let emptyMessage = document.querySelector("#emptyMessage");


btn.addEventListener("click", function () {
    if(input.value.trim() === ""){
        alert("Please enter a task!");
        return;
    }

    let item = document.createElement("li");

    let check = document.createElement("input");
    check.type = "checkbox";
    check.classList.add("check");

    let text = document.createElement("span");
  text.innerText = input.value.trim();

    let delBtn = document.createElement("button");
   delBtn.innerText = "Delete";
    delBtn.classList.add("delete");

    item.appendChild(check);
    item.appendChild(text);
    item.appendChild(delBtn);

    ul.appendChild(item);
    saveTasks();
    updateEmptyMessage();

    input.value = "";
    input.focus();
});

input.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        event.preventDefault();
        btn.click();
    }

});

ul.addEventListener("change", function(event){

    if(event.target.classList.contains("check")){
        let task = event.target.nextElementSibling;
        task.classList.toggle("completed");
        saveTasks();
    }

});

ul.addEventListener("click", function(event){

    if(event.target.classList.contains("delete")){
        let listItem = event.target.parentElement;
        listItem.remove();
        saveTasks();
        updateEmptyMessage();
    }

});

let themeBtn = document.querySelector("#themeBtn");


if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark-mode");
    themeBtn.innerText = "☀️ Light Mode";
}

themeBtn.addEventListener("click", function(){

    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){
        themeBtn.innerText = "☀️ Light Mode";
        localStorage.setItem("theme", "dark");
    }else{
        themeBtn.innerText = "🌙 Dark Mode";
        localStorage.setItem("theme", "light");
    }

});

function saveTasks(){

    let checks = document.querySelectorAll(".check");

    checks.forEach(function(check){
        if(check.checked){
            check.setAttribute("checked", "checked");
        }else{
            check.removeAttribute("checked");
        }
    });

    localStorage.setItem("tasks", ul.innerHTML);
}

if(localStorage.getItem("tasks")){
    ul.innerHTML = localStorage.getItem("tasks");
}

updateEmptyMessage();

function updateEmptyMessage(){
    if(ul.children.length === 0){
        emptyMessage.style.display = "block";
    }else{
        emptyMessage.style.display = "none";
    }
}