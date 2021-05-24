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

  removeTask(taskName) {
    console.log("task was removed")
    tasksService.removeTask(taskName)
  }


  // checkBoxes() {
  //   var inputElems = document.getElementById("input")

  //   for (var i = 0; i < inputElems.length; i++) {
  //     if (inputElems[i].type == "checkbox" && inputElems[i].checked == true) {
  //       count
  //       count++;
  //     }
  //   }
  // }

  checkBoxes() {
    if (document.getElementById('input').checked == true) {
      var checkCount = checkCount++
    }
  }
}