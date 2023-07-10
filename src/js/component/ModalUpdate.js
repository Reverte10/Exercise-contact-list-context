import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
// import { useNavigate } from "react-router-dom";

export const ModalUpdate = props => {
	// const [state, setState] = useState({
	// 	//initialize state here
	// });
	const { actions, store } = useContext(Context);
	//Declarar el useNavigate
	// const navigate = useNavigate();

	const contactInfo = store.contactInfo;

	const [contact, setContact] = useState({
		full_name: contactInfo.full_name,
		email: contactInfo.email,
		agenda_slug: "agendabertablancpastor",
		address: contactInfo.address,
		phone: contactInfo.phone
	});

	const handleUpdate = e => {
		e.preventDefault();
		actions.updateContact(contactInfo.id, contact.full_name, contact.email, contact.address, contact.phone);
		props.onClose();

		// navigate("/"); //En la versión actual de REACT se deberia usar el navigate("/"). Se declara fuera de la función con una constante.
	};

	const handleChange = event => {
		setContact({ ...contact, [event.target.name]: event.target.value });
	};

	useEffect(() => {
		//condicion ? true : false
		props.id ? actions.oneParticularContact(props.id) : null;
	}, []);

	return (
		<div className="modal" tabIndex="-1" role="dialog" style={{ display: props.show ? "inline-block" : "none" }}>
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Are you sure?</h5>
						{props.onClose ? (
							<button
								onClick={() => props.onClose()}
								type="button"
								className="close"
								data-dismiss="modal"
								aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						) : (
							""
						)}
					</div>
					<div className="modal-body">
						{/* //Form */}
						<form onSubmit={e => handleUpdate(e)}>
							<div className="form-group">
								<label>Full Name</label>
								<input
									type="text"
									onChange={handleChange}
									className="form-control"
									defaultValue={contactInfo.full_name}
									name="full_name"
								/>
							</div>
							<div className="form-group">
								<label>Email</label>
								<input
									type="email"
									onChange={handleChange}
									className="form-control"
									defaultValue={contactInfo.email}
									name="email"
								/>
							</div>
							<div className="form-group">
								<label>Phone</label>
								<input
									type="phone"
									onChange={handleChange}
									className="form-control"
									defaultValue={contactInfo.phone}
									name="phone"
								/>
							</div>
							<div className="form-group">
								<label>Address</label>
								<input
									type="text"
									onChange={handleChange}
									className="form-control"
									defaultValue={contactInfo.address}
									name="address"
								/>
							</div>
							<div className="modal-footer">
								{props.onClose ? (
									<input
										onClick={() => props.onClose()}
										type="button"
										className="btn btn-primary"
										data-dismiss="modal"
										value="On no!"
									/>
								) : (
									""
								)}
								<input
									type="submit"
									className="btn btn-secondary"
									data-dismiss="modal"
									value="Update it!"
								/>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
/**
 * Define the data-types for
 * your component's properties
 **/
ModalUpdate.propTypes = {
	history: PropTypes.object,
	onClose: PropTypes.func,
	show: PropTypes.bool,
	id: PropTypes.string
};

/**
 * Define the default values for
 * your component's properties
 **/
ModalUpdate.defaultProps = {
	show: false,
	onClose: null
};
