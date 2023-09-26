import React, { Component } from "react";
// import TodoForm from "./TodoForm";

class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Title",
      deadline: "Deadline",
      status: "",
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.status === "") {
      alert("Please select a status."); // Проверка, что статус выбран
    } else {
      const newTodo = {
        title: this.state.title,
        deadline: this.state.deadline,
        status: this.state.status,
      };

      // Вызываем функцию, переданную из родительского компонента
      this.props.onAddTodo(newTodo);

      // Очистите форму после отправки данных
      this.setState({
        title: "",
        deadline: "",
        status: "", // Сброс
      });
    }
  };

  render() {
    return (
      <div className="container bg-light p-3 my-3 " style={{ width: "400px" }}>
        <div className="container d-flex">
          <p className="h6 text-body">Add new todo</p>
        </div>

        <form className="container" onSubmit={this.handleSubmit}>
          <div className="mt-3">
            <input
              type="text"
              id="title"
              name="title"
              value={this.state.title}
              onChange={this.handleInputChange}
              style={{ width: "100%" }}
              required
            />
          </div>

          <div className="mt-3">
            <input
              type="text"
              id="deadline"
              name="deadline"
              value={this.state.deadline}
              onChange={this.handleInputChange}
              style={{ width: "100%" }}
              required
            />
          </div>

          <div className="mt-3 mb-3 ">
            <select
              id="status"
              name="status"
              value={this.state.status}
              onChange={this.handleInputChange}
              style={{ width: "100%", height: "30px" }}
            >
              <option value="">Select Status</option>
              <option value="not started">Not started</option>
              <option value="in progress">In progress</option>
              <option value="done">Done</option>
            </select>
          </div>
          <div className="d-flex justify-content-end ">
            <button
              className="btn btn-secondary"
              type="submit"
              style={{ marginRight: "10px" }}
              onClick={this.props.onCancel}
            >
              Cancel
            </button>
            <button className="btn btn-primary" type="submit">
              Add
            </button>
          </div>
        </form>
      </div>
    );
  }
}

function getStatusColor(status) {
  switch (status) {
    case "not started":
      return "10px solid red"; // Красная полоска для "not started"
    case "in progress":
      return "10px solid yellow"; // Желтая полоска для "in progress"
    case "done":
      return "10px solid green"; // Зеленая полоска для "done"
    default:
      return "10px solid black"; // По умолчанию чёрная полоска
  }
}

class FormPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showForm: false, // Изначально форма скрыта
      todos: [], // array of tasks
    };
  }

  // Функция для переключения видимости формы
  toggleForm = () => {
    this.setState((prevState) => ({
      showForm: !prevState.showForm,
    }));
  };

  // Функция для скрытия формы при нажатии "Cancel" в MyForm
  handleCancel = () => {
    this.setState({ showForm: false });
  };

  // Функция для добавления новой задачи в массив
  handleAddTodo = (newTodo) => {
    this.setState((prevState) => ({
      todos: [...prevState.todos, newTodo], // Добавляем новую задачу в конец массива
      showForm: false, // Скрываем форму после добавления
    }));
  };

  render() {
    return (
      <div>
        <h1>Form Page</h1>
        <button className="btn btn-primary" onClick={this.toggleForm}>
          Add a new todo
        </button>
        {/* Рендерим компонент формы, если showForm === true */}
        {this.state.showForm && (
          <TodoForm
            onAddTodo={this.handleAddTodo}
            onCancel={this.handleCancel}
          />
        )}{" "}
        {/* Отображаем список задач */}
        <div
          className="container p-3"
          style={{
            width: "400px",
          }}
        >
          <ul
            style={{
              listStyleType: "none",
              paddingLeft: "0",
            }}
          >
            {this.state.todos.map((todo, index) => (
              <li key={index}>
                <div
                  className="container bg-light py-2"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    width: "400px",
                    borderLeft: getStatusColor(todo.status),
                    margin: "0px",
                  }}
                >
                  <p style={{ marginBottom: "0px" }}>
                    <b>{todo.title}</b>
                  </p>
                  <p style={{ marginBottom: "0px" }}>
                    {" "}
                    <i>Deadline: {todo.deadline}</i>
                  </p>
                </div>
              </li>
            ))}
          </ul>
          {this.state.todos.length > 0 && (
            <div style={{ display: "flex", marginTop: "10px", width: "100%" }}>
              <div style={{ padding: "15px", borderLeft: "10px solid green" }}>
                Done
              </div>
              <div style={{ padding: "15px", borderLeft: "10px solid red" }}>
                Not started
              </div>
              <div style={{ padding: "15px", borderLeft: "10px solid yellow" }}>
                In progress
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default FormPage;
