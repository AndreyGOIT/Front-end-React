import React, { Component } from "react";
import TodoForm from "./TodoForm";

class FormPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showForm: false, // Изначально форма скрыта
    };
  }

  // Функция для переключения видимости формы
  toggleForm = () => {
    this.setState((prevState) => ({
      showForm: !prevState.showForm,
    }));
  };

  render() {
    return (
      <div>
        <h1>Form Page</h1>
        <button className="btn btn-primary" onClick={this.toggleForm}>
          Add a new todo
        </button>
        {this.state.showForm && <TodoForm />}{" "}
        {/* Рендерим компонент формы, если showForm === true */}
      </div>
    );
  }
}

export default FormPage;
