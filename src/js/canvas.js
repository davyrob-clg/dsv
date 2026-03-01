import { getInputValue, randomIntFromRange } from './utils'
import { selectMethod } from './formulas'
import { explanationMap } from './explanations'
import "../css/styles.css"

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

// = explanations.explanationMap["welcome_msg"];

let explain = explanationMap["welcome_msg"];



const HEIGHT = 300
let WIDTH = innerWidth



var img = document.createElement("img");
//img.src = "http://www.google.com/intl/en_com/images/logo_plain.png";
//img.src = "/src/img/logo.png";
//var src = document.getElementById("logo");
//src.appendChild(img);

//console.log("Setting explained message to: " + explain);
// set initla explain message thus when the page loads
document.getElementById('explain-message').value = explanationMap["welcome_msg"];

var selectEncodeOptions = document.getElementById('options');

selectEncodeOptions.addEventListener('change', selectOptions, false);

let BINARY = "";
let method;
canvas.width = WIDTH
canvas.height = HEIGHT

function selectExplainMessage(method) {


  // Map through the explanationMap to find the matching key and set the explain message

  console.log("Setting explain message to: " + method);

  document.getElementById('explain-message').value = explanationMap["welcome_msg"];
  Object.entries(explanationMap).forEach(([key, value]) => {


    if (key === method) {
      document.getElementById('explain-message').value = value;
      console.log("Setting explain message to: " + value);
    }
  });


}


function selectOptions() {


  selectExplainMessage(this.value);

  console.log('option: ' + this.value + ' selected');
  switch (this.value) {
    case '1':
      console.log('option 1 selected');
      break;
    case '2':
      alert('option 2 selected');
      break;
    case '3':
      confirm('You chose option 3, didn\'t you?');
      break;
  }
}

// 4B to 5B Encoding 

/**
 * Converts a binary string to 4B5B encoding.
 * @param {string} binaryStr - A string of '0's and '1's.
 * @returns {string} The 5B encoded binary string.
 */
function encode4B5B(binaryStr) {
  // Standard 4B/5B Mapping Table (Data Symbols 0-F)
  const map4B5B = {
    "0000": "11110", "0001": "01001", "0010": "10100", "0011": "10101",
    "0100": "01010", "0101": "01011", "0110": "01110", "0111": "01111",
    "1000": "10010", "1001": "10011", "1010": "10110", "1011": "10111",
    "1100": "11010", "1101": "11011", "1110": "11100", "1111": "11101"
  };

  let encoded = "";

  // Pad string to be a multiple of 4 if necessary
  const paddedStr = binaryStr.padEnd(Math.ceil(binaryStr.length / 4) * 4, '0');

  for (let i = 0; i < paddedStr.length; i += 4) {
    const nibble = paddedStr.substring(i, i + 4);
    encoded += map4B5B[nibble];
  }

  return encoded;
}





const mouse = {
  x: WIDTH / 2,
  y: HEIGHT / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = WIDTH
  canvas.height = HEIGHT

  init()
})

function launchASK() {
  // Change the current page URL
   console.log("ASK clicked")
  window.location.href = 'src/ask.html';
  // Alternatively, you can use window.location.assign('new_page.html');
}


// Event listner for encode button
document.getElementById('buttonAsk').onclick = () => {

  console.log("ASK clicked")
  window.location.href = 'src/ask.html';
  // Alternatively, you can use window.location.assign('new_page.html');


};

const coll = document.getElementsByClassName("collapsible");


console.log("Starting JS load functions")

coll[0].addEventListener("click", function () {
  this.classList.toggle("active");
  let content = this.nextElementSibling;
  if (content.style.maxHeight) {
    content.style.maxHeight = null;
  } else {
    content.style.maxHeight = content.scrollHeight + "px";
  }
  document.getElementById('arrow').classList.toggle("fa-rotate-90")
});

// Example usage for 4B5B encoder:
const input = "00001111"; // Two nibbles: 0000 and 1111
console.log("4B5B Conversion text")
console.log(encode4B5B(input)); // Output: "1111011101"

// Event listner for encode button
document.getElementById('button').onclick = () => {

  console.log("encode clicked")

  BINARY = getInputValue()
  //document.getElementById('title').innerHTML = document.getElementById("options").options[document.getElementById("options").selectedIndex].text;
  method = document.getElementById("options").value
  console.log("Select the option: " + method)
  console.log(BINARY)

  if (method === "4B5B") {
    console.log("Converting binary to 4B5B encoding and then use NRZI to visualize")
    BINARY = encode4B5B(BINARY)
    //method = "NRZI"
  }
  if ((/^[0-1]/.test(BINARY))) {
    if (((50 * BINARY.length) + 50) > WIDTH) {
      WIDTH = (50 * BINARY.length) + 100
    }
    else
      WIDTH = innerWidth
    init()

  }
  else {
    document.getElementById('binary').value = null
    document.getElementById('binary').placeholder = "Enter A Valid Binary"
    c.clearRect(0, 0, canvas.width, canvas.height)
    drawBoard()
  }

};

function convertToBinaryUsingCharacterCodes(input) {
  let binaryResult = '';

  for (let i = 0; i < input.length; i++) {
    const charCode = input.charCodeAt(i);
    let binaryValue = '';

    for (let j = 7; j >= 0; j--) {
      binaryValue += (charCode >> j) & 1;
    }

    binaryResult += binaryValue;
  }

  return binaryResult.trim();
}

console.log("Binary conversion");
const inputString = "GFG";
const binaryRepresentation =
  convertToBinaryUsingCharacterCodes(inputString);
console.log(binaryRepresentation);

// Binary input checker for validating if the input is binary or not and also clear the canvas if the input is invalid

const binaryInput = document.getElementById('binary');

binaryInput.addEventListener('input', function (e) {
  // This regex replaces any character that is NOT 0 or 1 with an empty string
  this.value = this.value.replace(/[^01]/g, '');
});

const asciiInput = document.getElementById('textascii');

asciiInput.addEventListener('input', function (e) {
  // This regex replaces any character that is NOT a printable ASCII character with an empty string
  var binaryValue = document.getElementById('binary');
  this.value = this.value.replace(/[^ -~]/g, '');

  var binaryResult = convertToBinaryUsingCharacterCodes(this.value);
  binaryInput.value = binaryResult;

  this.value = binaryResult ? this.value : '';

});



/* All functions related to drawing the signal on the canvas are below */

function drawBoard() {
  //outer box
  c.clearRect(0, 0, canvas.width, canvas.height)
  c.beginPath();
  c.moveTo(5, 5);
  c.lineTo(WIDTH - 5, 5)
  c.lineTo(WIDTH - 5, HEIGHT - 5)
  c.lineTo(WIDTH - 5, HEIGHT - 5)
  c.lineTo(5, HEIGHT - 5)
  c.lineTo(5, 5)
  c.stroke();
  c.closePath()

  //oV line
  c.beginPath();
  c.moveTo(50, HEIGHT / 2)
  c.lineTo(WIDTH - 5, HEIGHT / 2)
  c.setLineDash([10, 5])
  c.lineWidth = 2
  c.stroke();
  c.closePath()

  //Horizontal lines
  for (let i = 50, j = 0; i <= (50 * BINARY.length) + 50; i += 50, j++) {
    c.beginPath();
    c.lineWidth = .5
    c.setLineDash([0, 0])
    c.moveTo(i, 5);
    c.lineTo(i, HEIGHT - 5);
    c.stroke();
    c.closePath()
    drawNumbers(i, j)
  }
  //-v line
  c.beginPath();
  c.moveTo(50, (HEIGHT / 2) + 50)
  c.lineTo(WIDTH - 5, (HEIGHT / 2) + 50)
  c.setLineDash([10, 5])
  c.lineWidth = 2
  c.stroke();
  c.closePath()

  //+v line
  c.beginPath();
  c.moveTo(50, (HEIGHT / 2) - 50)
  c.lineTo(WIDTH - 5, (HEIGHT / 2) - 50)
  c.setLineDash([10, 5])
  c.lineWidth = 2
  c.stroke();
  c.closePath()


  c.fillText('+v', 25, (HEIGHT / 2) - 50)
  c.fillText('-v', 25, (HEIGHT / 2) + 50)
  c.fillText('0', 25, (HEIGHT / 2) + 5)
}

function drawNumbers(i, j) {
  c.font = 'bold 20px sans-serif';
  if (j < BINARY.length)
    c.fillText(BINARY.charAt(j) + "", i + 25, 30)
}

function init() {
  canvas.width = WIDTH
  drawBoard()
  selectMethod(method, c, BINARY, HEIGHT, WIDTH)
  selectExplainMessage(method);

}
init()
