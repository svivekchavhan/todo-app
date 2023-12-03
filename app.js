const todoList = document.getElementById("todoList");

function addTask() {
  const newTaskInput = document.getElementById("newTask");
  const taskText = newTaskInput.value.trim();

  if (taskText !== "") {
    const taskCard = document.createElement("div");
    taskCard.className =
      "bg-gray-100 p-4 rounded shadow-md flex items-center justify-between";
    taskCard.innerHTML = `
            <div class="flex items-center">
                <input type="checkbox" onchange="toggleComplete(this)">
                <span class="ml-2 ${
                  Math.random() > 0.5
                    ? "text-blue-500 text-lg capitalize"
                    : "text-green-500 text-lg capitalize "
                }">${taskText}</span>
            </div>
            <div class="flex space-x-2">
                <button id = "deletetask" class="text-white border px-6 py-2 bg-red-500 rounded-md" onclick="confirmDelete(this)">Delete</button>
                <button class="text-white bg-blue-500 border px-6 py-2 rounded-md " onclick="editTask(this)">Edit</button>
            </div>
        `;

    todoList.appendChild(taskCard);
    newTaskInput.value = "";
  }
}

function confirmDelete(button) {
  const taskCard = button.parentNode.parentNode;
  const taskText = taskCard.querySelector("span").innerText;

  const confirmation = window.confirm(
    `Are you sure you want to delete the task: "${taskText}"?`
  );

  if (confirmation) {
    deleteTask(taskCard);
  }
}

function deleteTask(taskCard) {
  todoList.removeChild(taskCard);
}

function editTask(button) {
  const taskCard = button.parentNode.parentNode;
  const taskTextElement = taskCard.querySelector("span");
  const taskText = taskTextElement.innerText;

  // Create an input field for editing
  const inputField = document.createElement("input");
  inputField.type = "text";
  inputField.value = taskText;
  inputField.className = "border rounded p-1";

  // Replace the task text with the input field
  taskTextElement.replaceWith(inputField);

  // Focus on the input field
  inputField.focus();

  // Set up an event listener for handling editing
  inputField.addEventListener("blur", () => {
    // When the input field loses focus, update the task text
    const newTaskText = inputField.value.trim();
    taskTextElement.innerText = newTaskText;
    // Remove the input field and show the updated task text
    inputField.replaceWith(taskTextElement);
  });
}

function toggleComplete(checkbox) {
  const taskCard = checkbox.parentNode.parentNode;
  taskCard.classList.toggle("completed ", checkbox.checked);
}

function printTasks() {
  const printWindow = window.open("", "_blank");
  printWindow.document.write(
    "<html><head><title>Todo App Tasks</title></head><body>"
  );
  printWindow.document.write("<h1>Todo App Tasks</h1>");
  printWindow.document.write(
    '<table border="1" cellpadding="10"><tr><th>Task</th></tr>'
  );

  const tasks = document.querySelectorAll(".bg-gray-100 span");
  tasks.forEach((task) => {
    printWindow.document.write(`<tr><td>${task.innerText}</td></tr>`);
  });

  printWindow.document.write("</table ></body></html>");
  printWindow.document.close();
  printWindow.print();
}

// toast notification

document.addEventListener("DOMContentLoaded", function () {
  const toast = document.getElementById("toast");
  const showNotificationBtn = document.getElementById("showNotification");
//   const deletetask = document.getElementById("deletetask");

  function showToast(message, type = "success") {
    toast.textContent = message;
    toast.classList.remove("bg-green-500", "bg-red-500", "bg-blue-500");

    switch (type) {
      case "success":
        toast.classList.add("bg-green-500");
        break;
      case "error":
        toast.classList.add("bg-red-500");
        break;
      case "info":
        toast.classList.add("bg-blue-500");
        break;
      default:
        break;
    }

    toast.style.display = "block";

    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => {
        toast.style.display = "none";
        toast.style.opacity = "1";
      }, 500); // Ensure the transition is complete before hiding
    }, 2000); // Hide the toast after 3 seconds
  }

  // Example: Show a success toast
  // showToast('Operation successful', 'success');

  // Example: Show an error toast
  // showToast('Operation failed', 'error');

  // Example: Show an info toast
  // showToast('Information message', 'info');

  if(showNotificationBtn.click){
    showNotificationBtn.addEventListener("click", function () {
        showToast("Task added successfully", "success");
      });
  }

  
});
