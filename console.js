/*
Copyright (c) 2021 Rushikesh Joshi <rushij.me@gmail.com> <github.com/rushij-me>
 
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
    paragraphs: [], // Array to store paragraphs
    currentParagraphIndex: 0, // Index of the current paragraph
    currentParagraphText: "",
    currentCharIndex: 0, // Current character index within the paragraph
    speed: 2, // Speed of the Typer
    file: "", // File, must be set
    finish: false,

    init: function () { // Initialize Typer
        const xhr = new XMLHttpRequest();
        xhr.open("GET", Typer.file);
        xhr.onreadystatechange = function (data) {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                Typer.text = xhr.response;
                Typer.paragraphs = Typer.text.split(/\n\n+/); // Split text into paragraphs
                Typer.displayNextParagraph(); // Display the first paragraph
            }
        }
        xhr.send();
    },

    displayNextParagraph: function () {
        if (Typer.currentParagraphIndex < Typer.paragraphs.length) {
            Typer.currentParagraphText = Typer.paragraphs[Typer.currentParagraphIndex];
            Typer.currentCharIndex = 0;
            Typer.type();
        }
    },

    type: function () {
        if (Typer.currentCharIndex < Typer.currentParagraphText.length) {
            let char = Typer.currentParagraphText.charAt(Typer.currentCharIndex);
            document.getElementById("console").innerHTML += char === "\n" ? "<br/>" : char;
            Typer.currentCharIndex++;
            setTimeout(Typer.type, Typer.speed);
        } else {
            Typer.currentParagraphIndex++;
            document.getElementById("console").innerHTML += "<br/><br/>";
        }
    },

    handleKeydown: function (event) { // Handle any key press
        if (Typer.currentCharIndex >= Typer.currentParagraphText.length) {
            Typer.displayNextParagraph();
        }
    },

    blink: function () {
        var cursor = document.getElementById("cursor");
        cursor.classList.toggle("vis");
    }
};

Typer.speed = 30; // Speed of typing in milliseconds
Typer.file = "data.bio";
Typer.init();

document.addEventListener("keydown", Typer.handleKeydown); // Event listener for any key press

var cursorBlinking = setInterval(Typer.blink, 500);
