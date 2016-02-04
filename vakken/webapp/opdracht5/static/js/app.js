(function() {

	var app = {

		// Methodes are defining functions to an object.
		init: function() {
			console.log("init app");
			routes.init();
		}
	};

	var routes = {
		
		init: function() {
			console.log("init routes");
			sections.toggle();
		}
	};

	var sections = {

		toggle: function() {
			console.log("toggle sections");
		}
	}

	// Actieveer methode in het object myModule
	app.init()

})();