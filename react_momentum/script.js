// ①titleのreact化
// ReactDOM.render(
//   // React.DOM.p(null,"Good afternoon, Takkiii"),
//   <p>Good afternoon, Takkiii</p>, // 最初はJSXを使わない
//   document.getElementById('react_title')
// )

// // ②timeのreact化
// ReactDOM.render(
//   // React.DOM.p(null,"Good afternoon, Takkiii"),
//   <div className="time">13:00</div>, // 最初はJSXを使わない
//   document.getElementById('react_time')
// )

// ③ ①、②のclass化
class Clock extends React.Component {

  constructor() {
    super()
    this.state = {
      time: Date.now(),
    }
  }

  // ⑥ タイマーをセットし、1秒ごとにstateを更新する
  componentDidMount() {
    this.interval = setInterval(() => {this.updateTime()}, 1000)
  }

  componentWillUnMount() {
    clearInterval(this.interval)
  }

  updateTime() {
    // ⑦ console.log()で1秒ごとにupdateTime()が実行されていることを確認する
    console.log('updateTime!!')
    this.setState({time: Date.now()})
  }

  // ⑧ 時刻によって表示するテキストを変更する(このあたりで学習コース１を締めるのが良さそう)
  getClockText(date) {
    if (4 < date.getHours() && date.getHours() < 12) {
      return `Good morning, ${this.props.name}`
    } else if (12 <= date.getHours() && date.getHours() < 17) {
      return `Good afternoon, ${this.props.name}`
    } else {
      return `Good evening, ${this.props.name}`
    }
  }

  // ☆ これは実装させるか迷う。目的と結果だけ告げて、クリップボードにするとかが良いかも。
  toDoubleDigits(num) {
    num += ""
    if (num.length === 1) {
      num = "0" + num
    }
    return num
  }

  render() {
    // ⑤ 現在の時刻をstateで管理し、表示する
    const date = new Date(this.state.time)
    const hour = date.getHours()
    const minute = date.getMinutes()
    const time = `${this.toDoubleDigits(hour)}:${this.toDoubleDigits(minute)}`
    return (
      <div className="clock-container">
        <div className="time">{time}</div>
        <p>{this.getClockText(date)}</p>
      </div>
    )
  }
}

// ④formのclass化
class TodoForm extends React.Component {

  constructor() {
    super()
    this.state = {
      value: '',
      saving: false,
      todo: {
        isCompleted: false,
        text: '',
      }
    }
  }

  onChangeInput(e) {
    this.setState({value: e.target.value})
  }

  onKeyDown(e) {
    if (e.key === 'Enter') {
      const value = e.target.value
      this.handleSubmit(value)
    }
  }

  onChangeCheckbox() {
    const {todo} = this.state
    if (todo.isCompleted === false) {
      this.setState({
        todo: {
          text: todo.text,
          isCompleted: true
        }
      })
    } else {
      this.setState({
        todo: {
          text: todo.text,
          isCompleted: false
        }
      })
    }
  }

  handleSubmit(value) {
    this.setState({saving: true})
    setTimeout(() => {
      this.setState({
        value: '',
        saving: false,
        todo: {
          isCompleted: false,
          text: value
        }
      })},
      1000
    )
  }

  resetTodoHandler() {
    this.setState({
      todo: {
        isCompleted: false,
        text: '',
      }
    })
  }

  render() {
    const {todo} = this.state
    // ☆ 新しいファイルを作成し、コンポーネントを分ける演習を入れる
    if (todo.text) {
      return (
        <div className="todo-container">
          <h3 className="todo-title">TODAY</h3>
          <input
            type="checkbox"
            checked={todo.isCompleted}
            onClick={this.onChangeCheckbox.bind(this)}
            className="is-completed"
          />
          <label className={`todo-text ${todo.isCompleted && 'completed'}`}>{todo.text}</label>
          {todo.isCompleted ? (
            <span
              onClick={this.resetTodoHandler.bind(this)}
              className="reset-btn"
            >
              <i>+</i>
            </span>
          ) : (
            <span
              onClick={this.resetTodoHandler.bind(this)}
              className="reset-btn"
            >
              <i>×</i>
            </span>
          )}
        </div>
      )
    } else {
      return (
        <div className="todo-form-container">
          <p className="todo-form-text">What is your main focus today?</p>
          <input
            value={this.state.value}
            onChange={this.onChangeInput.bind(this)}
            onKeyDown={this.onKeyDown.bind(this)}
            className="todo-form"
          />
          {this.state.saving && <p className='saving'>saving...</p>}
        </div>
      )
    }
  }
}

// ④と同時に1つの仮想DOMとしてrenderする
ReactDOM.render(
  <div className="center">
    <Clock name='Takkiii'/>
    <TodoForm />
  </div>,
  document.getElementById('app')
)