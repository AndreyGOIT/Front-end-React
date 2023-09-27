import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Импорт стилей
import "bootstrap/dist/js/bootstrap.bundle.min"; // Импорт JavaScript

class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Title",
      deadline: "Deadline",
      status: "",
    };
  }

  componentDidUpdate(prevProps) {
    // Если получен индекс для редактирования, устанваливаем начальное значение
    if (this.props.editIndex !== prevProps.editIndex) {
      const { editIndex, todos } = this.props;
      if (editIndex !== null && todos[editIndex]) {
        const { title, deadline, status } = todos[editIndex];
        this.setState({ title, deadline, status });
      }
    }
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
              {this.props.editIndex !== null ? "Update" : "Add"}{" "}
              {/* Заменяем текст на кнопке */}
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

// modal window
class EditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editedTitle: props.todo.title,
      editedDeadline: props.todo.deadline,
      editedStatus: props.todo.status,
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSave = () => {
    const { editedTitle, editedDeadline, editedStatus } = this.state;
    const { todoIndex, onSave } = this.props;

    onSave(todoIndex, editedTitle, editedDeadline, editedStatus);
  };

  render() {
    return (
      // Модальное окно с формой для редактирования
      // <!-- The Modal -->
      <div className="modal" id="myModal">
        <div className="modal-dialog">
          <div className="modal-content">
            {/* <!-- Modal Header --> */}
            <div className="modal-header">
              <h4 className="modal-title">Edit todo item</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            {/* <!-- Modal body --> */}
            <div className="modal-body">
              <form className="container" onSubmit={this.handleSave}>
                <div className="mt-3">
                  <input
                    type="text"
                    id="title"
                    name="editedTitle"
                    value={this.state.editedTitle}
                    onChange={this.handleInputChange}
                    style={{ width: "100%" }}
                    required
                  />
                </div>

                <div className="mt-3">
                  <input
                    type="text"
                    id="deadline"
                    name="editedDeadline"
                    value={this.state.editedDeadline}
                    onChange={this.handleInputChange}
                    style={{ width: "100%" }}
                    required
                  />
                </div>

                <div className="mt-3 mb-3 ">
                  <select
                    id="status"
                    name="editedStatus"
                    value={this.state.editedStatus}
                    onChange={this.handleInputChange}
                    style={{ width: "100%", height: "30px" }}
                  >
                    {/* <option value="">Select Status</option> */}
                    <option value="not started">Not started</option>
                    <option value="in progress">In progress</option>
                    <option value="done">Done</option>
                  </select>
                </div>
                <div className="d-flex justify-content-end ">
                  <button
                    className="btn btn-secondary"
                    type="button"
                    style={{ marginRight: "10px" }}
                    // onClick={this.props.onCancel}
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary"
                    type="submit"
                    data-bs-dismiss="modal"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>

            {/* <!-- Modal footer --> */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
class FormPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showForm: false, // Изначально форма скрыта
      todos: [], // array of tasks
      editIndex: null, // index of element you need to edit
      isEditModalOpen: false,
      editingTodoIndex: null,
    };
  }

  handleEdit = (index) => {
    // Ваш обработчик клика на кнопке "Edit"
    // document
    //   .getElementById("editButton")
    //   .addEventListener("click", function () {
    //     var myModal = new bootstrap.Modal(document.getElementById("myModal"));
    //     myModal.show();
    //   });
    // Открываем модальное окно для редактирования
    this.setState({
      isEditModalOpen: true,
      editingTodoIndex: index,
    });
  };

  handleSaveEdit = (index, editedTitle, editedDeadline, editedStatus) => {
    // Обновляем элемент массива todos с новыми данными
    const updatedTodos = [...this.state.todos];
    updatedTodos[index] = {
      title: editedTitle,
      deadline: editedDeadline,
      status: editedStatus,
    };

    this.setState({
      isEditModalOpen: false,
      editingTodoIndex: null,
      todos: updatedTodos,
    });
  };

  handleClick = (index) => {
    // Обработчик события клика по элементу списка
    console.log(`Clicked on item ${index}`);
  };

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
            editIndex={this.state.editIndex} // Передаем индекс для редактирования
            todos={this.state.todos} // Передаем список задач
          />
        )}{" "}
        {/* Отображаем список задач и передаем функцию для редактирования */}
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
              <li
                key={index}
                onClick={() => this.handleEdit(index)}
                style={{ marginBottom: "10px", cursor: "pointer" }}
              >
                <div
                  className="container bg-light py-2"
                  onClick={() => this.handleClick(index)}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    // flexDirection: "column",
                    alignItems: "center",
                    width: "400px",
                    borderLeft: getStatusColor(todo.status),
                    margin: "0px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
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

                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#myModal"
                    onClick={() => this.handleEdit(index)} // Обработчик клика
                    style={{
                      height: "30px",
                      display: "flex", // Устанавливаем flex-контейнер
                      justifyContent: "center", // Горизонтальное выравнивание по центру
                      alignItems: "center", // Вертикальное выравнивание по центру
                    }}
                  >
                    Edit
                  </button>
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
        <div>
          {/* Модальное окно для редактирования */}
          {this.state.isEditModalOpen && (
            <EditModal
              todo={this.state.todos[this.state.editingTodoIndex]}
              todoIndex={this.state.editingTodoIndex}
              onSave={this.handleSaveEdit}
            />
          )}
        </div>
      </div>
    );
  }
}

export default FormPage;
