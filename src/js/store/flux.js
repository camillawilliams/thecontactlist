const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: []
			//Your data structures, A.K.A Entities
		},
		actions: {
			addContact: newContact => {
				const tempStore = getStore();
				fetch("https://assets.breatheco.de/apis/fake/contact/", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(newContact)
				}) // getActions gives you access to line 7, with a dot you get to access
					.then(() => getActions().initialData());
			},
			//(Arrow) Functions that update the Store
			// Remember to use the scope: scope.state.store & scope.setState()
			initialData: () => {
				fetch("https://assets.breatheco.de/apis/fake/contact/agenda/rolando_scarfullery")
					.then(function(response) {
						if (!response.ok) {
							// if the response is good, it will avoid showing the error. If the response is NOT okay it will show up.
							throw Error(response.statusText);
						}
						// Read the response as json.
						return response.json();
					})
					.then(function(responseAsJson) {
						// Do stuff with the JSON

						setStore({ contacts: responseAsJson });
					})
					.catch(function(error) {
						console.log("Looks like there was a problem: \n", error);
					});
			}
		}
	};
};

export default getState;
