(function() {

	// Object literal
	var App = {

		// Objecten hebben properties (name) en values ('Jarno').
		name: 'Jarno',
		age: 26,
		// Methodes are defining functions to an object
		init: function() {
			console.log(this.name);
		}
	};

	// Actieveer methode in het object myModule
	App.init()
	// routes.init()
	// sections.toggle(route)

})();