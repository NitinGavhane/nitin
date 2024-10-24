/*
Copyright (c) 2024 Nitin Gavhane <gavhanenitin911@gmail.com> <github.com/NitinGavhane>
 
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
 
The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.
 
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
--> 

*/

/**
 * This code is a simplified and unjQuerified version of Typerjs by Sam Phippen, 
 * with the cursor modification by @nitin
 */
const Typer = {
    text: null,
	accessCountimer: null,
	index: 0, // current cursor position
	speed: 2, // speed of the Typer
	file: "", // file, must be set
	finish: false,
	paragraphs: [], // Store each paragraph separately
	currentParagraphIndex: 0, // Track the current paragraph being displayed

	init: function() { // initialize Hacker Typer
		const xhr = new XMLHttpRequest();
		xhr.open("GET", Typer.file);
		xhr.onreadystatechange = function(data) {
			if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
				// Split the content into paragraphs and store
				Typer.paragraphs = xhr.response.split('\n\n'); // Assuming paragraphs are separated by double newlines
				Typer.text = Typer.paragraphs[Typer.currentParagraphIndex]; // Start with the first paragraph
			}
		}
		xhr.send();
	},

	addText: function() {
		if (Typer.text) {
			Typer.index += Typer.speed;
			let text = Typer.text.substring(0, Typer.index);
			const rtn = new RegExp("\n", "g");
			document.getElementById("console").innerHTML = text.replace(rtn, "<br/>");
			window.scrollBy(0, 50);
		}
	},

	blink: function() {
		var cursor = document.getElementById("cursor");
		cursor.classList.toggle("vis");
	},

	// Function to move to the next paragraph when "Enter" is pressed
	nextParagraph: function() {
		if (Typer.currentParagraphIndex < Typer.paragraphs.length - 1) {
			// Move to the next paragraph
			Typer.currentParagraphIndex++;
			Typer.index = 0; // Reset the index
			Typer.text = Typer.paragraphs[Typer.currentParagraphIndex];
		} else {
			// All paragraphs finished
			clearInterval(timer);
			clearInterval(Typer.accessCountimer); // Stop cursor blinking
		}
	}
}

Typer.speed = 2;
Typer.file = "data.bio";
Typer.init();

var timer = setInterval(function() { t(); }, 30);
function t() {
	Typer.addText();
	if (Typer.text && Typer.index > Typer.text.length) {
		clearInterval(timer);
		Typer.accessCountimer = setInterval(function() { Typer.blink(); }, 500);
	}
}

// Listen for Enter key press to skip Typer effect and move to the next paragraph
document.addEventListener("keydown", function(event) {
	if (event.key === "Enter") {
		Typer.nextParagraph();
	}
});

