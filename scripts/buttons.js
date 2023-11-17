
// Add a new task
document.getElementById('addButton').addEventListener('click', function () {
    let taskInput = document.getElementById('taskInput');
    let newTask = { name: taskInput.value, completed: false };
    activeTasks.push(newTask);
    localStorage.setItem('activeTasks', JSON.stringify(activeTasks));
    displayTasks();
    taskInput.value = '';
});

// Import tasks from a file
document.getElementById('importButton').addEventListener('click', function () {
    fileInput.click();
});

// Export tasks to a file
document.getElementById('exportButton').addEventListener('click', function () {
    let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ activeTasks, completedTasks }));
    let downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "tasks.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
});

// Theme switcher
document.getElementById('checkbox').addEventListener('change', function () {
    document.body.classList.toggle('dark-mode');
});
