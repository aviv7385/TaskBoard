//validate the user input and save to local storage
function validateAndSave() {
    //take DOM objects
    const taskBox = document.getElementById("taskBox");
    const dateBox = document.getElementById("dateBox");
    const timeBox = document.getElementById("timeBox");

    //take values
    const myTask = taskBox.value;
    const byDate = dateBox.value;
    const byTime = timeBox.value;

    //trim all the spaces from the text - to check if the text has only white spaces (in which case - it's not valid)
    const textLength = myTask.trim().length;

    //validate inputs
    //check if a text was entered or if the text entered has only white spaces
    if (myTask == "" || textLength < 1) {
        alert("Must enter a task");
        return;
    }

    if (byDate == "") {
        alert("Must enter a date");
        return;
    }

    //call a function that saves and displays the tasks
    saveTask();
}

//save tasks to local storage
function saveTask() {
    //take DOM objects
    const taskBox = document.getElementById("taskBox");
    const dateBox = document.getElementById("dateBox");
    const timeBox = document.getElementById("timeBox");

    //take values
    const myTask = taskBox.value;
    const byDate = dateBox.value;
    const byTime = timeBox.value;

    //create task object
    const task = { myTask, byDate, byTime };

    //loading all tasks from local storage
    let allTasks = [];
    let allTasksJsonString = localStorage.getItem("allTasks");
    if (allTasksJsonString != null) {
        allTasks = JSON.parse(allTasksJsonString);
    }

    // Add the new task to the array:
    allTasks.push(task);

    // Save the new array back to local storage: 
    allTasksJsonString = JSON.stringify(allTasks);
    localStorage.setItem("allTasks", allTasksJsonString);

    //call a function that displays the tasks
    displayAllTasks();

    // Clear all text boxes: 
    taskBox.value = "";
    dateBox.value = "";
    timeBox.value = "";
    taskBox.focus();
}

//display all saved tasks when loading the page
function displayAllTasks() {

    // Get container DOM object: 
    const container = document.getElementById("container");

    //loading all tasks from local storage
    let allTasks = [];
    let allTasksJsonString = localStorage.getItem("allTasks");
    if (allTasksJsonString != null) {
        allTasks = JSON.parse(allTasksJsonString);
    }

    // Clear previous data: 
    container.innerHTML = "";

    //display all saved tasks when loading the page
    let index = 0;
    for (const task of allTasks) {

        // Create new div - that will be the yellow note
        const noteContainer = document.createElement("div");

        // Set class, id and events: 
        noteContainer.setAttribute("class", "note");
        noteContainer.setAttribute("id", "noteContainer"); // <div class="note" id="noteContainer">
        noteContainer.setAttribute("onmouseover", "showClearButton(this)"); //create a mouse event that will call a function that will show the "clear" button
        noteContainer.setAttribute("onmouseout", "hideClearButton(this)");  //create a mouse event that will call a function that will hide the "clear" button
        container.appendChild(noteContainer); //add this div (noteContainer) to the main div (container)

        // create a new div inside the note that will wrap only the task text (without the date/time)
        const textDiv = document.createElement("div");
        textDiv.setAttribute("class", "taskTextCont");
        textDiv.setAttribute("id", "taskText");
        noteContainer.appendChild(textDiv); //add the textDiv to the noteContainer div
        //set the task data
        textDiv.innerHTML = task.myTask;

        // create a new div inside the note that will wrap only the date and time text (without the task)
        const dateTimeDiv = document.createElement("div");
        dateTimeDiv.setAttribute("class", "dateTimeTextCont");
        dateTimeDiv.setAttribute("id", "dateTimeText");
        noteContainer.appendChild(dateTimeDiv); //add the timeDiv to the noteContainer div
        //set the date/time data
        dateTimeDiv.innerHTML = task.byDate + "<br>" + task.byTime;

        //create a button inside the note div
        const clearButton = document.createElement("button");
        clearButton.setAttribute("type", "button");
        clearButton.setAttribute("id", "clearButton");
        clearButton.setAttribute("onclick", "deleteTask(this)"); //create a mouse event that will call a function that will delete the specific task from the board and from the local storage
        //clearButton.setAttribute("num", index.toString()) // convert number to string
        clearButton.style.visibility = "none"; //hide the button (i want to show it only when the mouse is over the note)

        //create a glyphicon bootstrap element
        const glyphicon = document.createElement("span");
        glyphicon.setAttribute("class", "glyphicon glyphicon-remove");
        glyphicon.setAttribute("id", "clear"); // <span class="glyphicon glyphicon-remove" id="clear"></span>

        clearButton.appendChild(glyphicon); //append the glyphicon to the button 
        noteContainer.appendChild(clearButton); //append the button to the note so it will be displayed on each note

        index++;
    }
}

//function to show the "clear" button
function showClearButton(note) {
    note.querySelector("#clearButton").style.visibility = "visible";
}

//function to hide the "clear" button
function hideClearButton(note) {
    note.querySelector("#clearButton").style.visibility = "hidden";
}

//function to delete the task from screen and from Local storage
function deleteTask(note) {
    note.parentElement.remove();
    //get the element chosen by the user to be deleted
    const task = note.parentElement.querySelector("#taskText").textContent;
    const allTasks = JSON.parse(localStorage.getItem("allTasks"))
    //iterate the array of tasks and check if a task is the one the user chose to delete - if yes - remove it from the array
    for (i = 0; i < allTasks.length; i++) {
        if (allTasks[i].myTask == task) {
            allTasks.splice(i, 1);
        }
    }
    
    //save the tasks to local storage (after removing a task)
    localStorage.setItem("allTasks", JSON.stringify(allTasks));
    displayAllTasks();
}


displayAllTasks();

