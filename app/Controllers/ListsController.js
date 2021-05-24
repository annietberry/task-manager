import { ProxyState } from '../AppState.js'
import { listsService } from '../Services/ListsService.js'
import { loadState } from '../Utils/LocalStorage.js'
import TasksController from "./TasksController.js"


function _draw() {
  console.log('drawing your lists')
  let lists = ProxyState.lists
  let listElm = document.getElementById('lists')
  let template = ''

  lists.forEach(list => {
    let tasks = ProxyState.tasks.filter(task => task.list == list.id)
    template += ` <div class="col-3 m-3 bg-success px-0 shadow p-3 mb-5 bg-white rounded" >
      <div class="bg-success text-dark" style=' background-color: ${list.color} !important'>
          ${list.name}
          <span>0</span>
          <span>/</span>
          <span>${tasks.length}</span>
          
          <button onclick="app.listsController.clickSweet('${list.id}')" class="btn btn-primary"><i class="fa fa-times" aria-hidden="true"></i></button>
      </div>
      <div class="row justify-content-center py-1 card-body">
          <b class="col-12">Tasks:</b>
          <ul class="col-12">`



    tasks.forEach(task => {
      template += ` <li class="row align-items-center justify-content-between p-2">
        <input onclick="app.tasksController.checkBoxes()" type="checkbox" id="input">
        <label for="task1">
            <div class="col d-flex ">${task.name}
            </div>
        </label>
        <button onclick="app.listsController.clickSweetTask('${task.name}')" class="btn btn-primary"><i class="fa fa-trash" aria-hidden="true"></i></button>
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

  removeList(listId) {
    console.log("list removed")
    listsService.removeList(listId)
  }

  clickSweet(listId) {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this list!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          swal("Poof! Your list has been deleted!", {
            icon: "success",
          });
          console.log("this is your lists id, " + listId)
          app.listsController.removeList(listId)
        } else {
          swal("Your list is safe!");
        }
      });
  }

  clickSweetTask(taskName) {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this task!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          swal("Poof! Your task has been deleted!", {
            icon: "success",
          });
          console.log("this is your tasks name, " + taskName)
          app.tasksController.removeTask(taskName)
        } else {
          swal("Your list is safe!");
        }
      });

  }

  // checkBoxes() {
  //   // var inputElems = document.getElementById("input")
  //   count

  //   for (var i = 0; i < lists.length; i++) {
  //     if (inputElems[i].type == "checkbox" && inputElems[i].checked == true) {
  //       count++;
  //       alert(count);
  //     }

  //   }
  // }

  // checkBoxes() {
  //   if (document.getElementById('input').checked == true) {
  //     var checkCount = checkCount++
  //   }

  // }

}