import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { ContactCard } from "../component/ContactCard.js";
import { Modal } from "../component/Modal";
import { Context } from "../store/appContext";

export const Contacts = () => {
	const { store, actions } = useContext(Context);
	const [state, setState] = useState({
		showModal: false,
		id: ""
	});
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
						{store.contacts.map((contact, i) => {
							return (
								<ContactCard
									key={i}
									contact={contact}
									index={i}
									onDelete={() => setState({ showModal: true, id: contact.id })}
								/>
							);
						})}
					</ul>
				</div>
			</div>
			<Modal show={state.showModal} id={state.id} onClose={() => setState({ showModal: false })} />
		</div>
	);
};

/* We can use the following for understanding how to use useEffect hook & const
	const [count, setCount] = useState(0);
	useEffect(() => {
		console.log("hello");
    }, [count]);
    // if we leave the array empty we will only see the console once because we are not using the count function
    // if we use count inside the array, eveyr time we click the button we will have execute the useState to get our count.
    
    HTML...
    <button onClick={() => setCount(count + 1)}></button>
*/
