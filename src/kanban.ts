import { bound } from './decorator/bindThis.js'

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
    this.element = document.querySelector('#task-form')! // 非 null アサーション

    // input要素を取得
    this.titleInputEl = document.querySelector('#form-title')!
    this.descriptionInputEl = document.querySelector('#form-description')!

    this.bindEvents()
  }

  private clearInputs(): void {
    this.titleInputEl.value = ''
    this.descriptionInputEl.value = ''
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
    this.element.addEventListener('submit', this.submitHandler)

    this.clearInputs()
  }

  private makeNewTask(): Task {
    return {
      title: this.titleInputEl.value,
      description: this.descriptionInputEl.value,
    }
  }
}

new TaskForm()

// 配列とインデックスアクセス型を使用したユニオン型の作成
const TASK_STATUS = ['todo', 'working', 'done'] as const
type TaskStatus = (typeof TASK_STATUS)[number] // インデックスアクセス型

class TaskList {
  templagteEl: HTMLTemplateElement
  element: HTMLDivElement
  private taskStatus: TaskStatus

  constructor(templateId: string, _taskStatus: TaskStatus) {
    // ターゲットのtemplate要素を取得
    this.templateEl = document.querySelector(templateId)!

    // template要素のコンテンツ（子要素）を複製。trueを渡すことですべての階層でクローンする。
    const clone = this.templagteEl.content.cloneNode(true) as DocumentFragment

    // クローンした子要素から、1つ目を取得
    this.element = clone.firstElementChild as HTMLDivElement

    // taskStatusプロパティを初期化
    this.taskStatus = _taskStatus

    this.setup()
  }

  // クローンした要素に情報を追加
  setup() {
    // カラムに表示する、タスクの進捗状況を示すラベルを設定
    this.element.querySelector('h2')!.textContent = `${this.taskStatus}`
    // ul要素にid属性を設定
    this.element.querySelector('ul')!.id = `${this.taskStatus}`
  }

  mount(selector: string) {
    const targetEl = document.querySelector(selector)!
    targetEl.insertAdjacentElement('beforeend', this.element)
  }
}

TASK_STATUS.forEach((status) => {
  const list = new TaskList('#task-list-template', status)
  list.mount('#container')
})
