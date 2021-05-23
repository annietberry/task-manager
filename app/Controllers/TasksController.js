import { tasksService } from "../Services/TasksService.js"

export default class TasksController {
  constructor() {
    console.log("drawing your tasks")

  }

  addTask(event, list) {
    event.preventDefault()
    console.log("create task is hitting")
    let form = event.target
    let newTask = {
      name: form.name.value,
      list: list
    }
    tasksService.addTask(newTask)
  }
}