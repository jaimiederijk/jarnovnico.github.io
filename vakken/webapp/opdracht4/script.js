/***
* cmdaan.js
*   Bevat functies voor CMDAan stijl geolocatie welke uitgelegd
*   zijn tijdens het techniek college in week 5.
*
*   Author: J.P. Sturkenboom <j.p.sturkenboom@hva.nl>
*   Credit: Dive into html5, geo.js, Nicholas C. Zakas
*
*   Copyleft 2012, all wrongs reversed.
*/

// Immediately-Invoked Function Expression. It executes immediately after it’s created.
// Turns the code within (in this case, a function) into an expression.
(function() {

	'Use Strict';

	var constants = {
		SANDBOX: 'SANDBOX',
		LINEAIR = "LINEAIR",
		GPS_AVAILABLE = 'GPS_AVAILABLE',
		GPS_UNAVAILABLE = 'GPS_UNAVAILABLE',
		POSITION_UPDATED = 'POSITION_UPDATED'
		// More constant vars?
	};
	
	// Deze heb ik er buiten geplaatst constant variabelen worden aangegeven met alleen hoofdletters
	// Daarnaast gebruik Engelse namen ipv. Nederlandse namen dit is handig als er andere developers aan jouw code moeten gaan werken.
	var debugId = false;
	var customDebugging = false;
        var locations = [];
        var markers = [];

	// Debugging functions
	var debugging = {}; 
	
	// Probeer underscores te vermijden alleen bij private variabelen.
	debugging.errorHandler = function(code, message) {
	    debug_message('geo.js error '+code+': '+message);
	}
	
	debugging.message = function(message) {
	    (constants.customDebugging && constants.debugId)?document.getElementById(constants.debugId).innerHTML:console.log(message);
	}
	
 	debugging.customDebugging = function(debugId){
	    constants.debugId = this.constants.debugId;
	    constants.customDebugging = true;
	}

	function Map(options) {
		
		var _this = this;
		var _defaults = {
			refreshRate = 1000,
            currentPosition = currentPositionMarker = map = interval = intervalCounter = updateMap = false;
			// More options?
		};

		_this.options = options || defaults;

	}

    // Test of GPS beschikbaar is (via geo.js) en vuur een event af
	Map.init = function() {
        debugging.debug_message("Controleer of GPS beschikbaar is...");
		ET.addListener(constants.GPS_AVAILABLE, this.start_interval());
        ET.addListener(constants.GPS_UNAVAILABLE, function(){debugging.debug_message('GPS is niet beschikbaar.')});
        (geo_position_js.init())?ET.fire(constants.GPS_AVAILABLE):ET.fire(constants.GPS_UNAVAILABLE);
	}

    // Start een interval welke op basis van REFRESH_RATE de positie updated
	Map._start_interval = function(event) {
        debugging.debug_message("GPS is beschikbaar, vraag positie.");
        _defaults.map._update_position();
        _defaults.interval = self.setInterval(_defaults.map._update_position, _defaults.REFRESH_RATE);
        ET.addListener(constants.POSITION_UPDATED, _defaults.map._check_locations);
}
	}

    // Vraag de huidige positie aan geo.js, stel een callback in voor het resultaat
    Map.updatePosition = function() {
        _defaults.intervalCounter++;
        geo_position_js.getCurrentPosition(_defaults.map._set_position, _geo_error_handler, {enableHighAccuracy:true});
    }

    // Callback functie voor het instellen van de huidige positie, vuurt een event af
    Map._set_position = function(position) {
        _defaults.currentPosition = position;
        ET.fire("POSITION_UPDATED");
        debugging.debug_message(_defaults.intervalCounter+" positie lat:"+position.coords.latitude+" long:"+position.coords.longitude);
    }

    // Controleer de locaties en verwijs naar een andere pagina als we op een locatie zijn
    Map._check_locations = function(event) {
        
        // Liefst buiten google maps om... maar helaas, ze hebben alle coole functies
        for (var i = 0; i < locaties.length; i++) {
            var locatie = {coords:{latitude: locaties[i][3],longitude: locaties[i][4]}};

            if(_defaults.map._calculate_distance(locatie, _defaults.currentPosition)<locaties[i][2]){

                // Controle of we NU op die locatie zijn, zo niet gaan we naar de betreffende page
                if(window.location!=locaties[i][1] && localStorage[locaties[i][0]]=="false"){
                    // Probeer local storage, als die bestaat incrementeer de locatie
                    try {
                        (localStorage[locaties[i][0]]=="false")?localStorage[locaties[i][0]]=1:localStorage[locaties[i][0]]++;
                    } catch(error) {
                        debugging.debug_message("Localstorage kan niet aangesproken worden: "+error);
                    }

                    window.location = locaties[i][1];
                    debugging.debug_message("Speler is binnen een straal van "+ locaties[i][2] +" meter van "+locaties[i][0]);
                }
            }
        }
    }

    // Bereken het verchil in meters tussen twee punten
    Map._calculate_distance = function(p1, p2) {
        var pos1 = new google.maps.LatLng(p1.coords.latitude, p1.coords.longitude);
        var pos2 = new google.maps.LatLng(p2.coords.latitude, p2.coords.longitude);
        return Math.round(google.maps.geometry.spherical.computeDistanceBetween(pos1, pos2), 0);
    }

    Map.generate_map = function(myOptions, canvasId) {
        debugging.debug_message("Genereer een Google Maps kaart en toon deze in #"+canvasId)
        map = new google.maps.Map(document.getElementById(canvasId), myOptions);

        var routeList = [];
        // Voeg de markers toe aan de map afhankelijk van het tourtype
        debugging.debug_message("Locaties intekenen, tourtype is: "+tourType);
        for (var i = 0; i < locaties.length; i++) {

            // Met kudos aan Tomas Harkema, probeer local storage, als het bestaat, voeg de locaties toe
            try {
                (localStorage.visited==undefined||isNumber(localStorage.visited))?localStorage[locaties[i][0]]=false:null;
            } catch (error) {
                debugging.debug_message("Localstorage kan niet aangesproken worden: "+error);
            }

            var markerLatLng = new google.maps.LatLng(locaties[i][3], locaties[i][4]);
            routeList.push(markerLatLng);

            constants.markerRij[i] = {};
            for (var attr in locatieMarker) {
                constants.markerRij[i][attr] = locatieMarker[attr];
            }
            constants.markerRij[i].scale = locaties[i][2]/3;

            var marker = new google.maps.Marker({
                position: markerLatLng,
                map: map,
                icon: markerRij[i],
                title: locaties[i][0]
            });
        }

        if(tourType == LINEAIR){
            // Trek lijnen tussen de punten
            debugging.debug_message("Route intekenen");
            var route = new google.maps.Polyline({
                clickable: false,
                map: map,
                path: routeList,
                strokeColor: 'Black',
                strokeOpacity: .6,
                strokeWeight: 3
            });

        }

        // Voeg de locatie van de persoon door
        _defaults.currentPositionMarker = new google.maps.Marker({
            position: kaartOpties.center,
            map: map,
            icon: positieMarker,
            title: 'U bevindt zich hier'
        });

        // Zorg dat de kaart geupdated wordt als het POSITION_UPDATED event afgevuurd wordt
        ET.addListener(constants.POSITION_UPDATED, _defaults.map.update_positie);
    }
    
    // Was geen functie, was beschreven als een method uit een object maar zonder object er omheen :)
    var isNumber = function(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }

	var map = new Map();

	map.init();

})();
// Calls the function that results from that evaluated expression.
