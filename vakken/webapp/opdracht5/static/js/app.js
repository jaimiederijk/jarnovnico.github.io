(function() {

	var launcher = {

		// Methodes are defining functions to an object.
		init: function() {
			console.log("launch app");
			routes.init();
		}
	};

	var routes = {
		
		init: function() {
			console.log("init routes");

			// :name is the current hash
			routie(':name', function(name) {
				// Fire the toggle() methode where first section gets to be "#home"
				sections.toggle(name);
			});

		}
	};

	var sections = {

		toggle: function(route) {
			console.log("toggle sections");

			// there is now always a route 
			var id = route;

			// querySelectorAll gives a array and then with a for loop, go through all sections and hide them
			for (var i = 0; i < document.querySelectorAll("section").length; i++) {
				document.querySelectorAll("section")[i].classList.add("hide");
			};

			// Get the current hash and remove the class "hide". That will make it display block
			document.querySelector(id).classList.remove("hide");



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



			// var sectionHome = document.getElementById("home"),
			// 	sectionOther = document.getElementById("other-section");

			// if (sectionOther.classList == "hide") {
			// 	sectionHome.classList.remove("hide");
			// } else {
			// 	sectionOther.classList.remove("hide");
			// 	sectionHome.classList.add("hide");
			// }



			// var section = document.querySelectorAll(".section-content");

			// section.onclick = function() {
			// 	console.log("click");
			// }
		}
	};

	// Activate app.
	launcher.init()

})();

// Bronnen:

// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener

// https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onhashchange

// https://developer.mozilla.org/en-US/docs/Web/API/Window/location
