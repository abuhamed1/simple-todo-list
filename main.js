function refreshTasksTable(tasks) {
      if (tasks == null) return;

      document.getElementById("tasks").innerHTML = "";
      var index = 0;
      for (task of tasks) {
        let content = `
            <div class="task ${task.isDone ? "done" : ""}" style="margin: 20px">
              <!-- Task Info -->
              <div style="width: 70%">
                <h2>${task.title}</h2>
                <div>
                  <span class="material-symbols-outlined">
                    calendar_month
                  </span>
                  <span>${task.date}</span>
                </div>
              </div>
              <!--// Task Info //-->
              <!-- Task Actions -->
              <div
                style="
                  width: 20%;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                "
              >
                <button
                  class="circular"
                  style="background-color: rgb(114, 0, 0); color: white"
                  onClick="deleteTask(${index})"
                >
                  <span class="material-symbols-outlined"> delete </span>
                </button>
                <button
                  class="circular"
                  style="${task.isDone ? "background-color: rgb(129, 51, 51)" : "background-color: rgb(0, 150, 30)"}; color: white"
                  onClick="toggleTaskCompletion(${index})"
                >
                  ${task.isDone ? '<span class="material-symbols-outlined"> close </span>' : '<span class="material-symbols-outlined"> done </span>'}
                </button>
                <button
                  class="circular"
                  style="
                    background-color: rgba(0, 16, 197, 0.692);
                    color: white;
                  "
                  onClick="updateTask(${index})"
                >
                  <span class="material-symbols-outlined"> edit </span>
                </button>
              </div>
              <!--// Task Actions //-->
            </div>`;
        document.getElementById("tasks").innerHTML += content;
        index++;
      }
    }
    function setTasksArrayBasedOnLocalStorage() {
      tasks = JSON.parse(localStorage.getItem("Tasks")) ?? [];
      refreshTasksTable(tasks);
    }
    function storeTasks() {
      var tasksString = JSON.stringify(tasks);
      localStorage.setItem("Tasks", tasksString);
    }
    let tasks = [];
    setTasksArrayBasedOnLocalStorage();

    refreshTasksTable(tasks);

    document.getElementById("add-btn").addEventListener("click", () => {
      let title = prompt("الرجاء إدخال عنوان مهمة جديدة:");
      if (title == null) return;

      let date = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`;

      let task = {
        title: title,
        date: date,
        isDone: false,
      };

      tasks.push(task);

      storeTasks();
      refreshTasksTable(tasks);
    });

    function deleteTask(index) {
      let isConfirmed = confirm(
        `هل أنت متأكد من حذف هذه المهمة: (${tasks[index].title})؟`,
      );
      if (isConfirmed == 0) return;

      tasks.splice(index, 1);
      storeTasks();
      refreshTasksTable(tasks);
    }

    function updateTask(index) {
      let title = prompt("ادخل الاسم الجديد:");
      if (title == null) return;

      tasks[index].title = title;

      let date = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`;
      tasks[index].date = date;
      storeTasks();
      refreshTasksTable(tasks);
    }

    function toggleTaskCompletion(index) {
      tasks[index].isDone = !tasks[index].isDone;
      storeTasks();
      refreshTasksTable(tasks);
    }