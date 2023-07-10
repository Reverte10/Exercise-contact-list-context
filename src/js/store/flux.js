const getState = ({ getStore, setStore, getActions }) => {
	return {
		store: {
			//Your data structures, A.K.A Entities
			contacts: [],
			contactInfo: []
		},
		actions: {
			getContacts: () => {
				fetch("https://assets.breatheco.de/apis/fake/contact/agenda/sergioreverteagenda", {
					method: "GET"
				})
					.then(response => response.json())
					.then(data => setStore({ contacts: data }))
					.catch(error => console.log(error));
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
						agenda_slug: "sergioreverteagenda",
						address: address,
						phone: phone
					})
				})
					.then(response => {
						if (response.status === 200) getActions().getContacts();
						return response.JSON;
					})
					.then(data => console.log(data))
					.catch(error => console.log(error));
			},
			//5. Eliminar contacto
			deleteContact: id => {
				fetch(`https://assets.breatheco.de/apis/fake/contact/${id}`, {
					method: "DELETE"
				})
					.then(response => response.json())
					.then(data => {
						if (data.msg === "ok") getActions().getContacts();
					})
					.catch(error => console.log(error));
			},

			//4) Get One Particular Contact
			oneParticularContact: id => {
				fetch(`https://assets.breatheco.de/apis/fake/contact/${id}`, {
					method: "GET"
				})
					.then(response => response.json())
					.then(data => {
						setStore({ contactInfo: data });
						console.log(data);
					})
					.catch(error => console.log(error));
			}
		}
	};
};

export default getState;
