import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
// import { useNavigate } from "react-router-dom";

export const Modal = props => {
	// const [state, setState] = useState({
	// 	//initialize state here
	// });
	const { actions } = useContext(Context);
	//Declarar el useNavigate
	// const navigate = useNavigate();

	const handleDelete = () => {
		actions.deleteContact(props.id);
		props.onClose();
		// navigate("/"); //En la versión actual de REACT se deberia usar el navigate("/"). Se declara fuera de la función con una constante.
	};

	// console.log(props.id);

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
						<p>Warning: unknown consequences after this point... Kidding!</p>
					</div>
					<div className="modal-footer">
						{props.onClose ? (
							<button
								onClick={() => props.onClose()}
								type="button"
								className="btn btn-primary"
								data-dismiss="modal">
								Oh no!
							</button>
						) : (
							""
						)}

						<button
							onClick={() => handleDelete()}
							type="button"
							className="btn btn-secondary"
							data-dismiss="modal">
							Do it!
						</button>
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
Modal.propTypes = {
	history: PropTypes.object,
	onClose: PropTypes.func,
	show: PropTypes.bool,
	id: PropTypes.string
};

/**
 * Define the default values for
 * your component's properties
 **/
Modal.defaultProps = {
	show: false,
	onClose: null
};
