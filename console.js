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
    text: "", // Entire text content from data.bio file
    paragraphs: [], // Array to hold paragraphs split by newlines
    currentParagraphIndex: 0, // Index to track the current paragraph
    currentCharIndex: 0, // Index to track the current character within a paragraph
    speed: 50, // Typing speed (milliseconds)
    isTyping: false, // Track whether typing is happening
    cursorBlinkInterval: null, // For cursor blinking

    init: function () {
        this.loadText(); // Load the text from the file
        this.cursorBlink(); // Start the blinking cursor
        this.handleKeyPress(); // Add event listener for "Enter" key
    },

    loadText: function () {
        // Load the text from the data.bio file (simulating an external file)
        const xhr = new XMLHttpRequest();
        xhr.open("GET", Typer.file, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                Typer.text = xhr.response;
                Typer.paragraphs = Typer.text.split("\n\n"); // Split text into paragraphs (assuming two newlines)
                Typer.displayNextParagraph(); // Start displaying the first paragraph
            }
        };
        xhr.send();
    },

    displayNextParagraph: function () {
        if (this.currentParagraphIndex < this.paragraphs.length) {
            const consoleDiv = document.getElementById("console");
            const paragraph = this.paragraphs[this.currentParagraphIndex];
            this.isTyping = true;
            this.currentCharIndex = 0;
            consoleDiv.innerHTML += `<br/><br/>`; // Add space before the next paragraph
            this.typeParagraph(paragraph);
        } else {
            this.isTyping = false;
        }
    },

    typeParagraph: function (paragraph) {
        const consoleDiv = document.getElementById("console");

        if (this.currentCharIndex < paragraph.length) {
            consoleDiv.innerHTML += paragraph.charAt(this.currentCharIndex);
            this.currentCharIndex++;
            setTimeout(() => this.typeParagraph(paragraph), this.speed);
        } else {
            this.isTyping = false;
            this.currentParagraphIndex++;
        }
    },

    skipCurrentParagraph: function () {
        const consoleDiv = document.getElementById("console");

        // If typing is in progress, immediately display the rest of the paragraph
        if (this.isTyping) {
            const paragraph = this.paragraphs[this.currentParagraphIndex];
            consoleDiv.innerHTML += paragraph.slice(this.currentCharIndex); // Display the remaining part
            this.isTyping = false;
            this.currentParagraphIndex++;
        }

        this.displayNextParagraph(); // Move to the next paragraph
    },

    cursorBlink: function () {
        this.cursorBlinkInterval = setInterval(() => {
            const cursor = document.getElementById("cursor");
            cursor.classList.toggle("vis");
        }, 500); // blinking every 500 milliseconds
    },

    handleKeyPress: function () {
        document.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                Typer.skipCurrentParagraph(); // Skip current paragraph on Enter press
            }
        });
    }
};

Typer.file = "data.bio"; // Path to the file
window.onload = function () {
    Typer.init(); // Initialize when page loads
};

