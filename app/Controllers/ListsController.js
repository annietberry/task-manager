import { ProxyState } from '../AppState.js'
import { listsService } from '../Services/ListsService.js'
import { loadState } from '../Utils/LocalStorage.js'


function _draw() {
  console.log('drawing your lists')
  let lists = ProxyState.lists
  let listElm = document.getElementById('lists')
  let template = ''

  lists.forEach(list => {
    let tasks = ProxyState.tasks.filter(task => task.list == list.id)
    template += ` <div class="col-3 m-3 bg-success px-0 shadow p-3 mb-5 bg-white rounded">
      <div class="bg-primary text-dark">
          ${list.name}
          <span>completed</span>
          <span>/</span>
          <span>total</span>
          <button class="btn btn-primary"><i class="fa fa-times" aria-hidden="true"></i></button>
      </div>
      <div class="row justify-content-center py-1 card-body">
          <b class="col-12">Tasks:</b>
          <ul class="col-12">`



    tasks.forEach(task => {
      template += ` <li class="row align-items-center justify-content-between p-2">
        <input type="checkbox" id=task1>
        <label for="task1">
            <div class="col d-flex ">${task.name}
            </div>
        </label>
        <button class="btn btn-primary"><i class="fa fa-trash" aria-hidden="true"></i></button>
        <br>
    </li>`
    })

    template += `</ul>

      <form onsubmit="app.tasksController.addTask(event, '${list.id}')">
          <label for="name"></label>
          <input required minlength="3" maxlength="50" type="text" name="name" id="" class="form-control"
              placeholder="" aria-describedby="helpId">
          <button class="btn btn-primary btn-block text-dark mt-1"
              "> Add task</button>
      </form>
  </div>
  </div>
  `


  })
  listElm.innerHTML = template
}



export default class ListsController {
  constructor() {
    ProxyState.on('lists', _draw)
    ProxyState.on('tasks', _draw)
    loadState()
  }

  createList(event) {
    event.preventDefault()
    let form = event.target
    let newList = {
      name: form.name.value,
      color: form.color.value,
    }
    listsService.createList(newList)

  }

  completeTask(listId) {
    console.log('task completed', listId)
    listsService.completeTask(listId)
  }

}