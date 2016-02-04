# Uittreksel van: Lea Verou. 'CSS Secrets'. iBooks. 

## Intro:

> World Wide Web Consortium) does not “make” standards
> uitleg hoe w3c css working group te werk gaat en wie dat allemaal zijn

### geschiedenis css

css1 uit 1996
css2 1998
css3 naar modules, want werd te lang voor 1 file: 	
	- syntax
	- cascading and inheritance
	- color
	- selectors
	- backgrounds & borders
	- values and units
	- text
	- text decoration
	- fonts
	- basic user interface

new modules:
	- transforms
	- composition and blending
	- filter effects
	- flexible box layout
	- grid layout

idea to let all browsers experimental stuff with vendor prefixes.
	-moz- firefox
	-ms- IE
	-o- Opera
	-webkit- Safari and Chrome

Op een gegeven moment stond je css vol met prefixes. Dus gingen mensen apps maken om deze toe te voegen zoals autoprefixers.

Toen waren er config flags ipv prefixes.

## CSS TIPS:

> one big component of maintainable code is minimizing the amount of edits necessary to make a change

> several issues with the maintainability of this code that we can fix
	'padding: 6px 16px;
	border: 1px solid #446d88;
	background: #58a linear-gradient(#77a0bb, #58a);
	border-radius: 4px;
	box-shadow: 0 1px 5px gray;
	color: white;
	text-shadow: 0 -1px 1px #335166;
	font-size: 20px;
	line-height: 30px;'

Font-size en line-heigat hebben een relatie met elkaar. Als je de size verandert moet je ook de line-height nog eens veranderen.

> When values depend on each other, try to reflect their relationship in the code

Je moet uitrekenen van de line hoogte is ten relatie op font grote. In dit geval is dat 150%.

Dit is beter maintainable:
	'font-size: 20px;
	line-height: 1.5;'

Maar dat schaalt niet goed met de padding en grote van de knop
dan moeten we ook andere waardes veranderen zoals:
	‘padding: .3em .8em;
	border-radius: .2em;
	box-shadow: 0 .05em .25em gray;
	text-shadow: 0 -.05em .05em #335166;
	font-size: 125%;
	line-height: 1.5;'

> Relativity is an important feature in CSS, but you do have to think about what things should be relative to

Niet alleen de grote is lastig te veranderen ook de kleur kan lastig zijn vooral met gradients en shadows.
	'padding: .3em .8em;
	border: 1px solid rgba(0,0,0,.1);
	background: #58a linear-gradient(hsla(0,0%,100%,.2), transparent);
	border-radius: .2em;
	box-shadow: 0 .05em .25em rgba(0,0,0,.5);
	color: white;
	text-shadow: 0 -.05em .05em rgba(0,0,0,.5);
	font-size: 125%;
	line-height: 1.5;'

Nu hoeven we alleen de background color te veranderen!
	'button.cancel {
    		background-color: #c00;
	}

	button.ok {
    		background-color: #6b0;
	}'

Zo hou je je CSS droog

### Maintainability vs brevity
De vorige oplossing was wel meer code, maar maintainable. Dus hoe kan dat beter? Ga je voor meer code maar makkelijker aan te passen of ga je voor weinig code maar lastig aan te passen?
'border-width: 10px 10px 10px 0;' 
	vs 
'border-width: 10px;
border-left-width: 0;'

Color
New keyword van SVG ‘currentColor’
> all of the horizontal separators (all <hr> elements) to automatically have the same color as the text
	'hr {
    		height: .5em;
    		background: currentColor;
	}'

### Inheritance
> to give form elements the same font as the rest of the page, you don’t need to re-specify it, just use inherit:
	'input, select, button { font: inherit; }'

Het kan ook met de border color en background
	'background: inherit;
    border: inherit;'

### Trust your eyes
> optical illusions are very common in any form of visual design

Rondjes lijken altijd kleiner dan vierkantjes ook al zijn ze even groot.

> common example is padding in containers with text

### On responsive web design
> The more media queries you add, the more fragile your CSS code becomes.
> media query thresholds should not be dictated by specific devices.

	- Gebruik dan em ipv pixels in de media queries!
	- Gebruik % ipv fixen widths.
	- En anders viewport-relative units (vw, vh, vmin, vmax)
	- Fixed widths voor grote resolutie (max-width not width)