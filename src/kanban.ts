import { bound } from "./decorator/bindThis.js"

interface Task {
  title: string
  description?: string
}

class TaskForm {
  element: HTMLFormElement
  titleInputEl: HTMLInputElement
  descriptionInputEl: HTMLTextAreaElement

  constructor() {
    // form要素を取得
    this.element = document.querySelector("#task-form")! // 非 null アサーション

    // input要素を取得
    this.titleInputEl = document.querySelector("#form-title")!
    this.descriptionInputEl = document.querySelector("#form-description")!

    this.bindEvents()
  }

  private clearInputs(): void {
    this.titleInputEl.value = ""
    this.descriptionInputEl.value = ""
  }

  @bound
  private submitHandler(event: Event) {
    event.preventDefault() // ブラウザのデフォルトの動作をキャンセル

    // Taskオブジェクトの生成
    const task = this.makeNewTask()
    console.log(task)

    // 確認用の処理
    console.log(this.titleInputEl.value)
    console.log(this.descriptionInputEl.value)

    // フォームをクリア
    this.clearInputs()
  }

  private bindEvents() {
    this.element.addEventListener("submit", this.submitHandler)

    this.clearInputs()
  }

  private makeNewTask():Task {
    return {
      title: this.titleInputEl.value,
      description: this.descriptionInputEl.value
    }
  }
}

new TaskForm()