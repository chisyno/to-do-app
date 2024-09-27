const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const completedCounter = document.getElementById("completed-counter");

// Add event listener to the "Add" button
document.getElementById("input-button").addEventListener("click", addTask);

function addTask() {
  const task = inputBox.value.trim();
  if (!task) {
    alert("Please write down a task");
    return;
  }

  const li = document.createElement("li");
  li.innerHTML = `
    <label>
      <input type="checkbox">
      <span>${task}</span>
    </label>
    <span class="edit-btn">Edit</span>
    <span class="delete-btn">Delete</span>
  `;

  listContainer.appendChild(li);
  inputBox.value = ""; // Clear the input box

  const checkbox = li.querySelector("input");
  const editBtn = li.querySelector(".edit-btn");
  const taskSpan = li.querySelector("span:nth-child(2)");
  const deleteBtn = li.querySelector(".delete-btn");

  checkbox.addEventListener("click", function () {
    li.classList.toggle("completed", checkbox.checked);
    updateCounters();
  });

  editBtn.addEventListener("click", function () {
    const update = prompt("Edit task:", taskSpan.textContent);
    if (update !== null) {
      taskSpan.textContent = update;
      li.classList.remove("completed");
      checkbox.checked = false;
      updateCounters();
    }
  });

  const updateCounters = () => {
    const completedTasks = document.querySelectorAll(".completed").length;
    completedCounter.textContent = completedTasks;
  };

  updateCounters();

  deleteBtn.addEventListener("click", function () {
    if (confirm("Are you sure you want to delete this task?")) {
      li.remove();
      updateCounters();
    }
  });
}