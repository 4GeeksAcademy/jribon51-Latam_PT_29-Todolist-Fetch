import React, { useState, useEffect } from "react";
import { renderToNodeStream } from "react-dom/server";
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faTrash } from '@fortawesome/free-solid-svg-icons';
//include images into your bundle


//create your first component
const Home = () => {
	const getTodosURL = "https://playground.4geeks.com/todo/users/jribon51"
	const postTodosURL = "https://playground.4geeks.com/todo/todos/jribon51"
	const eliminarURL = "https://playground.4geeks.com/todo/todos/"

	const [tareas, setTareas] = useState([]);
	const [inputValue, setInputValue] = useState('');



	const handleEnterPress = (event) => {
		if (event.key === 'Enter') {
			handleAddTodo();
		}

	};

	const handleInputChange = (event) => {
		setInputValue(event.target.value);

	};

	const handleAddTodo = () => {
		addTodo(inputValue);

	};

	const handleDeleteTodo = (idTodo) => {
		fetch(eliminarURL + idTodo, {
			method: "DELETE",
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(response => {
				if (response.status == 204) {
					getTodos();
				}


			})
			.catch(error => error)
	};






	function getTodos() {

		fetch(getTodosURL)
			.then(response => response.json())
			.then(data => {
				setTareas(data.todos)
			})
			.catch((error) => { error })

	}

	function addTodo(entrada) {
		const newTodo = {
			"label": entrada
		}
		fetch(postTodosURL, {
			method: "POST",
			body: JSON.stringify(newTodo),
			headers: {
				'Content-Type': 'application/json'
			}

		})
			.then(response => {
				response.json()
				getTodos();
			})
			.then(data => {
				console.log(data);


			})
			.catch(error => error)
	};

	useEffect(() => {
		getTodos()
	}, [])


	return (
		<div className="text-center mt-5 container">
			<h1>Todo</h1>
			<div>
				{/* <label htmlFor="todoInput" className="form-label">¡Creá tu lista de Tareas!</label> */}
				<input
					type="text"
					value={inputValue}
					onChange={handleInputChange}
					onKeyDown={handleEnterPress}
					placeholder="Ingresa una tarea"
					className="form-control"
				/>
			</div>
			<div>
				<ul className="list-group">

					{tareas.map((tarea) => (
						<li key={tarea.id} className="text-primary fs-3 px-5 list-group-item d-flex justify-content-between align-items-center">
							{tarea.label}
							<button onClick={() => handleDeleteTodo(tarea.id)} className="btn btn-danger boton">
								<i class="fas fa-trash-alt"></i>
							</button>
						</li>
					))}
				</ul>
			</div>
			<h1>Cantidad de tareas: {tareas.length}</h1>
		</div>
	);
};

export default Home;