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
    index: 0, // current cursor position
    speed: 2, // speed of the Typer
    file: "", // file, must be set
    timer: null, // stores the typing timer
    finish: false,
    
    init: function() { // initialize Hacker Typer
        const xhr = new XMLHttpRequest();
        xhr.open("GET", Typer.file);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                Typer.text = xhr.response;
            }
        };
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

    displayFullText: function() {
        if (Typer.text) {
            // Display the full text instantly
            Typer.index = Typer.text.length;
            let fullText = Typer.text;
            const rtn = new RegExp("\n", "g");
            document.getElementById("console").innerHTML = fullText.replace(rtn, "<br/>");
            clearInterval(Typer.timer); // Stop the typing interval
        }
    }
};

Typer.speed = 2;
Typer.file = "data.bio";
Typer.init();

// Start the typing effect with a timer
Typer.timer = setInterval(function() { Typer.addText(); }, 30);

// Listen for the "Enter" key press to display all content at once
document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        Typer.displayFullText(); // Display full text when Enter is pressed
    }
});

