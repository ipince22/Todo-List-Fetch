import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
export function Home() {
	const [task, setTask] = useState("");
	const [check, setCheck] = useState(false);

	const [list, setList] = useState([]);

	//crear funciones consumen API
	//var data = { username: 'example' };
	var url = "https://assets.breatheco.de/apis/fake/todos/user/ipince";

	const loadTodo = () => {
		fetch(url, {
			method: "GET",
			headers: { "Content-Type": "application/json" }
		})
			.then(res => res.json())
			.then(data => {
				setList(data);
				//console.log({ data });
			}) //cargando la info
			.catch(error => console.error("Error:", error.message));
	};
	const newTodo = () => {
		let array = [];
		fetch(url, {
			method: "POST",
			body: JSON.stringify(array), //se envia un arreglo vacio
			headers: { "Content-Type": "application/json" }
		})
			.then(res => res.json())
			.then(data => {
				//console.log("newToDo", data);
				loadTodo();
			}) //cargando la
			.catch(error => console.error("Error:", error.message));
	};
	const updateTodo = lista => {
		fetch(url, {
			method: "PUT",
			body: JSON.stringify(lista), //se envia lista todo
			headers: { "Content-Type": "application/json" }
		})
			.then(res => res.json())
			.then(data => {
				loadTodo();
				alert(data.result);
			}) //cargando la
			.catch(error => console.error("Error:", error.message));
	};
	const deleteTodo = () => {
		fetch(url, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" }
		})
			.then(res => res.json())
			.then(data => {
				//console.log("updateTodo", data);
				newTodo();
				alert(data.result);
			}) //cargando la
			.catch(error => console.error("Error:", error.message));
	};

	useEffect(() => {
		loadTodo();
	}, []);

	return (
		<div className="container mt-5 text-center">
			<div className="row d-flex justify-content-center">
				<div className="col-md-10">
					<div className="card">
						<h1 className="display-5 text-primary">To Do List</h1>
						<div className="card-header">
							<div className="row mt-4">
								<div className="col-sm-8 pb-3">
									<label>Task</label>
									<input
										className="form-control"
										type="text"
										value={task}
										onChange={e => {
											setTask(
												e.target.value.toUpperCase()
											);
										}}
									/>
								</div>
								<div className="col-sm-1 pb-3">
									<label>Done</label>
									<input
										type="checkbox"
										className="form-control"
										checked={check}
										onChange={e =>
											setCheck(e.target.checked)
										}
									/>
								</div>
								<div className="col-sm-3 pb-3 d-flex align-items-end">
									<button
										type="button"
										className="form-control btn btn-primary"
										onClick={() => {
											let obj = {
												label: task,
												done: check
											};
											setList(list.concat(obj));
											setCheck(false);
											setTask("");
											//console.log({ list });
										}}>
										Add List
									</button>
								</div>
							</div>
						</div>
						<div className="card-body text-primary">
							{!list
								? "loading..."
								: list.map((item, index) => {
										return (
											<label
												className="form-control text-left px-5"
												key={index}
												// onDoubleClick={() => {
												// 	setList(
												// 		list.filter(
												// 			(itemf, indexf) =>
												// 				indexf !== index
												// 		)
												// 	);
												// }}
											>
												<input
													type="checkbox"
													checked={item.done}
												/>
												{item.label}
											</label>
										);
								  })}
						</div>
					</div>
				</div>
			</div>
			<div className="row d-flex justify-content-center">
				<button
					type="button"
					className="btn btn-outline-success"
					onClick={() => {
						updateTodo(list);
					}}>
					Update
				</button>
				<button
					type="button"
					className="btn btn-outline-danger"
					onClick={() => {
						deleteTodo();
					}}>
					Delete
				</button>
			</div>
		</div>
	);
}
