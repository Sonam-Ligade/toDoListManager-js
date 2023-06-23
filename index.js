const addForm = document.querySelector(".add");
const tasks = document.querySelector(".tasks");
const clearAll = document.querySelector(".clear");
const searchForm = document.querySelector(".search");

function updateMessage(){
    const pendingTasksCount = tasks.childElementCount;
    clearAll.parentElement.firstChild.textContent = `You have ${pendingTasksCount} pending tasks.`
}

updateMessage();
addForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = addForm.task.value.trim();
    if(value.length){
        tasks.innerHTML += `<li>
                    <span>${value}</span>
                    <i class="bi bi-trash-fill delete"></i>
                    </li>`;
        addForm.reset();
        updateMessage();
    }
});

tasks.addEventListener("click",(event) => {
    if(event.target.classList.contains("delete")){
       event.target.parentElement.remove();
       updateMessage();
    }

});

clearAll.addEventListener("click", (event) =>{
    const taskList = tasks.querySelectorAll("li");
    taskList.forEach((task) => {
        task.remove();
    });
});

function filterTask(searchText){
    const list = Array.from(tasks.children).filter(task => {
        return !task.textContent.toLowerCase().includes(searchText);
    });
    console.log(list);
    
    list.forEach(item => {
        item.classList.add("hide");
    });

    Array.from(tasks.children).filter(task => {
        return task.textContent.toLowerCase().includes(searchText);
    }).forEach(item => {
        item.classList.remove("hide");
    });

}

searchForm.addEventListener("keyup",(event) => {
    const searchText = searchForm.task.value.toLowerCase().trim();
    console.log(searchText);
    filterTask(searchText);
});


searchForm.addEventListener("click", (event) => {
    if(event.target.classList.contains('reset')){
        console.log("reset");
        searchForm.reset();
        const searchText = searchForm.textContent.toLowerCase().trim();
        filterTask(searchText);
    }
});