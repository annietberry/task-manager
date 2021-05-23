import { tasksService } from "../Services/TasksService.js"

export default class TasksController {
  constructor() {
    console.log("drawing your tasks")

  }

  createTask(event, list) {
    event.preventDefault()
    console.log("create task is hitting")
    let form = event.target
    let newTask = {
      name: form.name.value,
      list: list
    }
    tasksService.createTask(newTask)
  }
}