import { ProxyState } from "../AppState.js"
import List from "../Models/List.js"
import { saveState } from "../Utils/LocalStorage.js"

class ListsService {
  constructor() {
    ProxyState.on('lists', saveState)
    ProxyState.on('tasks', saveState)
  }

  removeList(listId) {
    ProxyState.lists = ProxyState.lists.filter(l => l.id != listId)
    console.log(ProxyState.lists)
  }

  createList(newList) {
    ProxyState.lists = [...ProxyState.lists, new List(newList)]
    console.log("all your lists", ProxyState.lists)
  }



}

export const listsService = new ListsService()