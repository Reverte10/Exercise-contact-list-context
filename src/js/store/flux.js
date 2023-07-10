const getState = ({ getStore, setStore, getActions }) => {
	return {
		store: {
			//Your data structures, A.K.A Entities
			contacts: [],
			contactInfo: []
		},
		actions: {
			//(Arrow) Functions that update the Store
			// Remember to use the scope: scope.state.store & scope.setState()
			//1.Get All available agendas right now
			getContacts: () => {
				fetch("https://assets.breatheco.de/apis/fake/contact/agenda/agendabertablancpastor", {
					method: "GET"
				})
					.then(response => response.json())
					// .then(data => console.log(data))
					.then(data => setStore({ contacts: data })) // => guardo el json en un espacio de memoria
					.catch(error => console.log(error)); // => te aviso si algo sale mal
			},
			//8.Update one contact
			updateContact: (id, full_name, email, address, phone) => {
				console.log(id);
				fetch(`https://assets.breatheco.de/apis/fake/contact/${id}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						full_name: full_name,
						email: email,
						agenda_slug: "agendabertablancpastor",
						address: address,
						phone: phone
					}) // body data type must match "Content-Type" header
				}) //busca informacion a la url dada con el metodo especificado
					.then(response => {
						if (response.status === 200) getActions().getContacts();
						return response.JSON;
					}) // => convierto la respuesta buscada en un json => {"info":{},"results":[]} "hola"
					.then(data => console.log(data)) // => guardo el json en un espacio de memoria
					.catch(error => console.log(error)); // => te aviso si algo sale mal
			},
			//5. Eliminar contacto
			deleteContact: id => {
				fetch(`https://assets.breatheco.de/apis/fake/contact/${id}`, {
					method: "DELETE"
				}) //busca informacion a la url dada con el metodo especificado
					.then(response => response.json()) // => convierto la respuesta buscada en un json => {"info":{},"results":[]} "hola"
					.then(
						data => {
							if (data.msg === "ok") getActions().getContacts();
						}
						// if(console.log(data) === "ok")
					) // => guardo el json en un espacio de memoria
					.catch(error => console.log(error)); // => te aviso si algo sale mal
			},

			//4) Get One Particular Contact
			oneParticularContact: id => {
				// console.log(id);
				fetch(`https://assets.breatheco.de/apis/fake/contact/${id}`, {
					method: "GET"
				})
					.then(response => response.json())
					// .then(data => console.log(data))
					.then(data => {
						setStore({ contactInfo: data });
						console.log(data);
					}) // => guardo el json en un espacio de memoria
					.catch(error => console.log(error)); // => te aviso si algo sale mal
			}
		}
	};
};

export default getState;
