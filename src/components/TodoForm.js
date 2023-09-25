// import React, { Component } from "react";

// class TodoForm extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       title: "Title",
//       deadline: "Deadline",
//       status: "",
//     };
//   }

//   handleInputChange = (event) => {
//     const { name, value } = event.target;
//     this.setState({ [name]: value });
//   };

//   handleSubmit = (event) => {
//     event.preventDefault();
//     if (this.state.status === "") {
//       alert("Please select a status."); // Проверка, что статус выбран
//     } else {
//       // Отправьте данные формы на сервер или выполните другие действия
//       console.log("Новая задача:", this.state);
//       // Очистите форму после отправки данных
//       this.setState({
//         title: "",
//         deadline: "",
//         status: "", // Сброс
//       });
//     }
//   };

//   // Функция для скрытия формы при нажатии "Cancel" в MyForm
//   handleCancel = () => {
//     this.setState({ showForm: false });
//   };

//   render() {
//     return (
//       <div className="container bg-light p-3 my-3 " style={{ width: "400px" }}>
//         <div className="container d-flex">
//           <p className="h6 text-body">Add new todo</p>
//         </div>

//         <form className="container" onSubmit={this.handleSubmit}>
//           <div className="mt-3">
//             <input
//               type="text"
//               id="title"
//               name="title"
//               value={this.state.title}
//               onChange={this.handleInputChange}
//               style={{ width: "100%" }}
//               required
//             />
//           </div>

//           <div className="mt-3">
//             <input
//               type="text"
//               id="deadline"
//               name="deadline"
//               value={this.state.deadline}
//               onChange={this.handleInputChange}
//               style={{ width: "100%" }}
//               required
//             />
//           </div>

//           <div className="mt-3 mb-3 ">
//             <select
//               id="status"
//               name="status"
//               value={this.state.status}
//               onChange={this.handleInputChange}
//               style={{ width: "100%", height: "30px" }}
//             >
//               <option value="">Select Status</option>
//               <option value="not started">Not started</option>
//               <option value="in progress">In progress</option>
//               <option value="done">Done</option>
//             </select>
//           </div>
//           <div className="d-flex justify-content-end ">
//             <button
//               className="btn btn-secondary"
//               type="submit"
//               style={{ marginRight: "10px" }}
//               onCancel={this.handleCancel}
//             >
//               Cancel
//             </button>
//             <button className="btn btn-primary" type="submit">
//               Add
//             </button>
//           </div>
//         </form>
//       </div>
//     );
//   }
// }

// export default TodoForm;
