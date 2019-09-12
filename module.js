{
	const form = document.querySelector(".createTaskForm");

	form.addEventListener("submit", e => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const task = formData.get("task");
		addTask(task);
		form.reset();
	});

	const getUpdateTemplate = task => `
	 	<div class="content">
		<button class="checkbox"></button>
			<input type="text" disabled value="${task}" class="taskInput" />
		</div>
		<div class="actions">
			<button class="star"></button>
			<button class="edit"></button>
			<button class="remove"></button>
		</div>`;

	const addRemoveHandler = taskDom => {
		const removeDom = taskDom.querySelector(".remove");
		removeDom.addEventListener("click", () => taskDom.remove())
	};

	const addEditHandler = taskDom => {
		const editDom = taskDom.querySelector(".edit");
		editDom.addEventListener("click", () => {
			const input = taskDom.querySelector(".taskInput");
			const isDisabled = input.getAttribute("disabled") === null;
			if (isDisabled) {
				input.setAttribute("disabled", true);
			} else {
				input.removeAttribute("disabled");
			}
		})
	};

	const addFavoriteHandler = taskDom => {
		const starDom = taskDom.querySelector(".star");
		starDom.addEventListener("click", () => starDom.classList.toggle("selected"))
	};

	const addCompletedHandler = taskDom => {
		const checkboxDom = taskDom.querySelector(".checkbox");
		checkboxDom.addEventListener("click", () => {
			checkboxDom.classList.toggle("selected");
			taskDom.classList.toggle("completed");
		})
	};

	const addCompletedAllHandler = () => {
		const selectAllDom = document.querySelector(".selectAll");
		selectAllDom.addEventListener("click", () => {
			const tasks = document.querySelectorAll(".tasks li");
			tasks.forEach(task => {
				task.classList.add("completed");
				task.querySelector(".checkbox").classList.add("selected");
			});

			selectAllDom.classList.add("selected");
		});
	};

	const addTask = task => {
		const tasksDom = document.querySelector(".tasks");
		const taskDom = document.createElement("li");
		taskDom.innerHTML = getUpdateTemplate(task);
		tasksDom.prepend(taskDom);
		addRemoveHandler(taskDom);
		addEditHandler(taskDom);
		addFavoriteHandler(taskDom);
		addCompletedHandler(taskDom)
	};

	addCompletedAllHandler();
}
