(function() {

	"use strict";

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

			// sections.toggle(window.location.hash);
		}
	};

	var sections = {

		toggle: function() {
			console.log("toggle sections");

			// var section = document.getElementById("section-navigatie");

			// section.onclick = function() {
			// 	console.log("click");
			// }
		}
	};

	// Activate app.
	app.init()

})();

// Bronnen:

// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener

// https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onhashchange

// https://developer.mozilla.org/en-US/docs/Web/API/Window/location