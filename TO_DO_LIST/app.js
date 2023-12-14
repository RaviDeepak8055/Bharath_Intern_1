document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");
    const messageContainer = document.getElementById("message-container");

    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === '') {
            showMessage("Please enter a task!");
            return;
        }

        hideMessage();

        const li = document.createElement("li");
        li.innerHTML = `
            <span>${taskText}</span>
            <button class="complete-btn">Complete</button>
            <button class="remove-btn">Remove</button>
        `;

        taskList.appendChild(li);
        taskInput.value = '';
    }

    function completeTask(li) {
        li.classList.toggle("completed");

        // Add the completed-animation class for the animation
        li.classList.add("completed-animation");

        // Remove the completed-animation class after the animation duration
        setTimeout(() => {
            li.classList.remove("completed-animation");
        }, 300); // Adjust the duration to match your CSS transition duration
    }

    function removeTask(li) {
        li.classList.add("remove-animation");

        // Remove the task element after the animation duration
        setTimeout(() => {
            li.remove();
        }, 300); // Adjust the duration to match your CSS transition duration
    }

    function showMessage(message) {
        messageContainer.textContent = message;
        messageContainer.style.display = 'block';

        // Set a timeout to hide the message after 1 second (1000 milliseconds)
        setTimeout(() => {
            hideMessage();
        }, 1000);
    }

    function hideMessage() {
        messageContainer.textContent = '';
        messageContainer.style.display = 'none';
    }

    document.getElementById("task-input").addEventListener("keypress", function (e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    document.getElementById("add-task-btn").addEventListener("click", addTask);

    // Event delegation for dynamically added buttons
    taskList.addEventListener("click", function (e) {
        const target = e.target;

        if (target.classList.contains("complete-btn")) {
            completeTask(target.parentElement);
        } else if (target.classList.contains("remove-btn")) {
            removeTask(target.parentElement);
        }
    });
});
