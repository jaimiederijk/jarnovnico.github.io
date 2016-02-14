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
				sections.toggle();
			});

			// sections.toggle(window.location.hash);
		}
	};

	var sections = {

		toggle: function() {
			console.log("toggle sections");

			// var a = document.querySelectorAll(".section-content");

			// if (a.style.display == "block") {
			// 	a.style.display = "none";
			// } else {
			// 	a.style.display = "block";
			// }



			// var elems = document.getElementById(id);
				
			// for (var i = 0; i < elems.length; i += 1) {
			// 	elems[i].style.display = "block";
			// }



			// var el = document.getElementById(id);

			// if (el.style.display != "none") {
			// 	el.style.display = "none";
			// } else {
			// 	el.style.display = "";
			// }



			var a = document.getElementById("section-lijstje"),
				b = document.getElementById("section-startscherm");

			if (a.style.display == "block") {
				a.style.display = "none";
				b.style.display = "block";
			} else {
				a.style.display = "block";
				b.style.display = "none";
			}



			// var section = document.querySelectorAll(".section-content");

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