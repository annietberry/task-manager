import { ProxyState } from "../AppState.js"
import Task from "../Models/Task.js"



class TasksService {


  addTask(newTask) {
    console.log('task at service', newTask)
    ProxyState.tasks = [...ProxyState.tasks, new Task(newTask)]
    console.log('all the tasks', ProxyState.tasks)

  }
}

export const tasksService = new TasksService()