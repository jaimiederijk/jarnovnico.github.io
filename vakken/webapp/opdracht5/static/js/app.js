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
			
			// The hashchange event fires when a window's hash changes.
			window.addEventListener("hashchange", function(event) {

				// The window.location read-only property returns a Location object with information about the current location of the document.
				sections.toggle(window.location.hash);
			});
		}
	};

	var sections = {

		toggle: function() {
			console.log("toggle sections");
		}
	};

	// Activate app.
	app.init()

})();