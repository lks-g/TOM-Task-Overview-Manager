let activeTasks = JSON.parse(localStorage.getItem('activeTasks')) || [];
let completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];

window.onload = function () {
    displayTasks();
}

// Create a hidden file input element
var fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.style.display = 'none';
document.body.appendChild(fileInput);

// Read the file and add the tasks to the tables when a file is selected
fileInput.addEventListener('change', function () {
    var fr = new FileReader();
    fr.onload = function () {
        var tasks = JSON.parse(this.result);
        activeTasks = tasks.activeTasks;
        completedTasks = tasks.completedTasks;
        localStorage.setItem('activeTasks', JSON.stringify(activeTasks));
        localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
        displayTasks();
    }
    fr.readAsText(this.files[0]);
});

function displayTasks() {
    document.getElementById('activeTasks').innerHTML = '';
    document.getElementById('completedTasks').innerHTML = '';

    // Display the active tasks
    for (let i = 0; i < activeTasks.length; i++) {
        let row = document.createElement('tr');
        let cell = document.createElement('td');
        cell.textContent = activeTasks[i].name;
        row.appendChild(cell);

        let deleteButton = document.createElement('button');
        deleteButton.textContent = '❌';
        deleteButton.addEventListener('click', function () {
            activeTasks.splice(i, 1);
            localStorage.setItem('activeTasks', JSON.stringify(activeTasks));
            displayTasks();
        });
        row.appendChild(deleteButton);

        let editButton = document.createElement('button');
        editButton.textContent = '✒️';
        editButton.addEventListener('click', function () {
            let newName = prompt('Enter the new name for the task');
            activeTasks[i].name = newName;
            localStorage.setItem('activeTasks', JSON.stringify(activeTasks));
            displayTasks();
        });
        row.appendChild(editButton);

        let completeButton = document.createElement('button');
        completeButton.textContent = '✅';
        completeButton.addEventListener('click', function () {
            let task = activeTasks.splice(i, 1)[0];
            task.completedDate = new Date();
            completedTasks.push(task);
            localStorage.setItem('activeTasks', JSON.stringify(activeTasks));
            localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
            displayTasks();
        });

        row.appendChild(completeButton);
        document.getElementById('activeTasks').appendChild(row);
    }

    // Display the completed tasks
    for (let i = 0; i < completedTasks.length; i++) {
        let row = document.createElement('tr');
        let cell = document.createElement('td');
        cell.textContent = completedTasks[i].name;
        cell.title = `Completed on: ${new Date(completedTasks[i].completedDate).toLocaleDateString()}`;
        row.appendChild(cell);
        let deleteButton = document.createElement('button');
        deleteButton.textContent = '❌';
        deleteButton.addEventListener('click', function () {
            completedTasks.splice(i, 1);
            localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
            displayTasks();
        });
        row.appendChild(deleteButton);

        let reactivateButton = document.createElement('button');
        reactivateButton.textContent = '⏪';
        reactivateButton.addEventListener('click', function () {
            activeTasks.push(completedTasks.splice(i, 1)[0]);
            localStorage.setItem('activeTasks', JSON.stringify(activeTasks));
            localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
            displayTasks();
        });
        row.appendChild(reactivateButton);

        document.getElementById('completedTasks').appendChild(row);
    }
}