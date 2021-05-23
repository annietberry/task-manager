import { generateId } from "../Utils/GenerateId.js"

export default class List {
  constructor({ name, color, id }) {
    this.name = name
    this.color = color
    this.id = id || generateId()
  }
}