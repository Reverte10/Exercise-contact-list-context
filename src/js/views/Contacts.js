import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { ContactCard } from "../component/ContactCard.js";
import { Modal } from "../component/Modal";
import { Context } from "../store/appContext.js";
import { ModalUpdate } from "../component/ModalUpdate.js";

export const Contacts = () => {
	const [state, setState] = useState({
		showModal: false,
		id: null
	});

	const [stateUpdate, setStateUpdate] = useState({
		showModal: false,
		id: null
	});

	const { store, actions } = useContext(Context);
	const [contacts] = useState(store.contacts);

	console.log(contacts);

	useEffect(() => {
		actions.getContacts();
	}, []);

	return (
		<div className="container">
			<div>
				<p className="text-right my-3">
					<Link className="btn btn-success" to="/add">
						Add new contact
					</Link>
				</p>
				<div id="contacts" className="panel-collapse collapse show" aria-expanded="true">
					<ul className="list-group pull-down" id="contact-list">
						{store.contacts.length > 0 ? (
							store.contacts.map(item => (
								<ContactCard
									id={item.id}
									key={item.id}
									full_name={item.full_name}
									address={item.address}
									phone={item.phone}
									email={item.email}
									onDelete={() => setState({ showModal: true, id: item.id })}
									onUpdate={() => setStateUpdate({ showModal: true })}
								/>
							))
						) : (
							<p className="fs-1 fw-bold text-center">
								No tienes contactos todavía. Añade un contacto clickando a Add new contact
							</p>
						)}
					</ul>
				</div>
			</div>
			<Modal show={state.showModal} onClose={() => setState({ showModal: false })} id={state.id} />
			<ModalUpdate show={stateUpdate.showModal} onClose={() => setStateUpdate({ showModal: false })} />
		</div>
	);
};
