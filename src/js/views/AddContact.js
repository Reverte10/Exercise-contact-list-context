import React, { useState } from "react";
import { Link } from "react-router-dom";

export const AddContact = () => {
	const [contact, setContact] = useState({
		full_name: "",
		email: "",
		agenda_slug: "sergioreverteagenda",
		address: "",
		phone: ""
	});

	// const navigate = useNavigate();

	//Crear contacto
	const createContact = event => {
		event.preventDefault();
		console.log(contact);
		fetch("https://assets.breatheco.de/apis/fake/contact/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(contact) // body data type must match "Content-Type" header
		}) //busca informacion a la url dada con el metodo especificado
			.then(response => response.json()) // => convierto la respuesta buscada en un json => {"info":{},"results":[]} "hola"
			.then(data => console.log(data)) // => guardo el json en un espacio de memoria
			// .then(response => navigate("/"))
			.catch(error => console.log(error)); // => te aviso si algo sale mal
	};

	const handleChange = event => {
		setContact({ ...contact, [event.target.name]: event.target.value });
	};

	return (
		<div className="container">
			<div>
				<h1 className="text-center mt-5">Add a new contact</h1>
				<form onSubmit={createContact}>
					<div className="form-group">
						<label>Full Name</label>
						<input
							type="text"
							onChange={handleChange}
							className="form-control"
							placeholder="Full Name"
							name="full_name"
						/>
					</div>
					<div className="form-group">
						<label>Email</label>
						<input
							type="email"
							onChange={handleChange}
							className="form-control"
							placeholder="Enter email"
							name="email"
						/>
					</div>
					<div className="form-group">
						<label>Phone</label>
						<input
							type="phone"
							onChange={handleChange}
							className="form-control"
							placeholder="Enter phone"
							name="phone"
						/>
					</div>
					<div className="form-group">
						<label>Address</label>
						<input
							type="text"
							onChange={handleChange}
							className="form-control"
							placeholder="Enter address"
							name="address"
						/>
					</div>
					<button type="submit" className="btn btn-primary form-control">
						Save
					</button>
					<Link className="mt-3 w-100 text-center" to="/">
						or get back to contacts
					</Link>
				</form>
			</div>
		</div>
	);
};
