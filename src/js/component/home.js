import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
export function Home() {
    const [task, setTask] = useState("");
    const [check, setCheck] = useState(false);

    const [list, setList] = useState([]);

    

    //crear funciones consumen API
    //var data = { username: 'example' };
    var url = 'https://assets.breatheco.de/apis/fake/todos/user/ipince';

    const loadTodo= ()=>{
        fetch(url, {
            method: 'GET',             
            headers: {'Content-Type': 'application/json'}
        }).then(res =>res.json())
          .then(data=>{setList(data)})//cargando la info
          .catch(error => console.error('Error:', error))
          .then(response => console.log('Success:', response));
    }
    const newTodo= ()=>{
        let array= [];
        fetch(url, {
            method: 'POST',             
            body:JSON.stringify(array),//se envia un arreglo vacio
            headers: {'Content-Type': 'application/json'}
        }).then(res =>res.json())
          .then(data=>{
              //console.log("newToDo", data);
              loadTodo();
            })//cargando la
          .catch(error => console.error('Error:', error))
          .then(response => console.log('Success:', response));
    }
    const updateTodo= (lista)=>{
        fetch(url, {
            method: 'PUT',             
            body:JSON.stringify(lista),//se envia lista todo 
            headers: {'Content-Type': 'application/json'}
        }).then(res =>res.json())
          .then(data=>{
              //console.log("updateTodo", data);
              loadTodo();
            })//cargando la
          .catch(error => console.error('Error:', error))
          .then(response => console.log('Success:', response));
    }
    const deleteTodo= ()=>{
        fetch(url, {
            method: 'DELETE',             
            headers: {'Content-Type': 'application/json'}
        }).then(res =>res.json())
          .then(data=>{
              //console.log("updateTodo", data);
              newTodo();
            })//cargando la
          .catch(error => console.error('Error:', error))
          .then(response => console.log('Success:', response));
    }

	return (
		<div className="container mt-5 text-center">
			<div className="row d-flex justify-content-center">
				<div className="col-md-8">
					<div className="card">
						<div className="card-body text-primary">
							<h1 className="display-5">To Do List</h1>
							<div className="d-flex">
                                <input
								className="form-control"
								type="text"
								value={task}
								onChange={e => {
									setTask(e.target.value.toUpperCase());
								}}
								// onKeyPress={e => {
								// 	if (e.key === "Enter") {
								// 		if (task != "") {
								// 			setList(
								// 				list.concat(task.toUpperCase())
								// 			);
								// 			setTask("");
								// 			console.log({ list });
								// 		} else {
								// 			alert("Ingrese una actividad");
								// 		}
								// 	}
								// }}
							    />
                                <input type="checkbox" className="form-control" checked={check} onChange={(e)=>setCheck(e.target.checked)}/>
                                <button type="button" className="form-control btn btn-primary" onClick={()=>{
                                        if (task != "") {
                                            let obj={
                                                label:task.toUpperCase(),
                                                done:check
                                            }
											setList(
												list.concat(obj)
											);
											setTask("");
											console.log({ list });
										} else {
											alert("Ingrese una actividad");
										}

                                }} >Add List</button>
                            </div>
							{!list
								? "loading..."
								: list.map((item, index) => {
										return (
											<label
												className="form-control text-primary list-group-item list-group-item-action"
												key={index}
												onDoubleClick={() => {
													setList(
														list.filter(
															(itemf, indexf) =>
																indexf !== index
														)
													);
												}}>
												{item}
											</label>
										);
								  })}
						</div>
					</div>
				</div>
			</div>
            <div className="row d-flex justify-content-center">
                <button type="button" class="btn btn-outline-primary">New</button>
                <button type="button" class="btn btn-outline-success">Update</button>
                <button type="button" class="btn btn-outline-danger">Delete</button>
            </div>
		</div>
	);
}
