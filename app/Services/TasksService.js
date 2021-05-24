import { ProxyState } from "../AppState.js"
import Task from "../Models/Task.js"



class TasksService {


  addTask(newTask) {
    console.log('task at service', newTask)
    ProxyState.tasks = [...ProxyState.tasks, new Task(newTask)]
    console.log('all the tasks', ProxyState.tasks)

  }

  removeTask(taskName) {
    ProxyState.tasks = ProxyState.tasks.filter(t => t.name != taskName)
    console.log("task removed")
  }


}

export const tasksService = new TasksService()