"use strict";

let count = 0;
let compCount = 0;

const selectItem = document.querySelectorAll(".item");
const container = document.querySelector(".container");
let selections = document.querySelector(".chosen");
let choices = document.querySelector(".choices");
let output = document.querySelector(".results");
let playerPoints = document.querySelector(".playerPoints");
let compPoints = document.querySelector(".compPoints");
let playAgain = document.querySelector(".playagain");
let btn = [...document.getElementsByTagName("button")];

//Player vars
const h2Player = document.createElement("h2");
const h2Comp = document.createElement("h2");

//Results per round vars
const resultsWin = document.createElement("h2");
const resultsLose = document.createElement("h2");
const resultsTie = document.createElement("h2");
const pointsPlayer = document.createElement("h3");
const pointsComp = document.createElement("h3");

function outPutChoices(el, userChoice, user) {
	el.textContent = `${user} chose ${userChoice}`;
	selections.appendChild(el);
}
function outPutResults(output, text, style) {
	output.textContent = text;
	if (output.className !== style) output.className = "";

	output.classList.add(style);
	//output.appendChild(h2);
}
function outPutPoints(el, count, userPoints) {
	el.textContent = count;
	if (count === 5) el.classList.add("pWin");
	if (count < 5) el.classList.remove("pWin");
	userPoints.appendChild(el);
}
function play() {
	count = 0;
	compCount = 0;

	//Initialize player scores to 0 and output
	outPutPoints(pointsPlayer, count, playerPoints);
	outPutPoints(pointsComp, compCount, compPoints);

	btn.forEach((el) => (el.style.pointerEvents = "auto"));


	selections.textContent = "";
	output.textContent = "";
	choices.lastElementChild.classList.remove("tie", "win", "lose");

	selectItem.forEach((item) => item.addEventListener("click", playRound));
}
function reset() {
	selectItem.forEach((item) => item.removeEventListener("click", playRound));

	btn.forEach((el) => (el.style.pointerEvents = "none"));
}

const computerPlay = function () {
	// Will randomly return Rock, paper, scissors
	let num = Math.floor(Math.random() * 3);
	const choices = ["Rock", "Paper", "Scissor"];
	let randChoice = choices[num];
	let rand = randChoice.toLowerCase();
	outPutChoices(h2Comp, rand, "Computer");

	return rand;
};

const playRound = function (e) {
	const playerChoice = e.target.id;
	let selection = document.createElement("div");
	selection.classList.add("chosen");

	outPutChoices(h2Player, playerChoice, "You");
	const compChoice = computerPlay();
	compChoice.toLowerCase();

	function resultColor(el) {
		output.appendChild(el);
	}

	// Logic where choices happen
	if (playerChoice === compChoice) {
		outPutResults(output, "Tie. No points awarded. Try again.", "tie");
		//resultColor(resultsTie);
	} else if (
		(playerChoice === "rock" && compChoice === "scissor") ||
		(playerChoice === "scissor" && compChoice === "paper") ||
		(playerChoice === "paper" && compChoice === "rock")
	) {
		outPutResults(
			output,
			`You Win!, ${playerChoice} beats ${compChoice}`,
			"win"
		);
		count++;
		//output count each time
		outPutPoints(pointsPlayer, count, playerPoints);
	} else {
		outPutResults(
			output,
			`You Lose ${compChoice} beats ${playerChoice}`,
			"lose"
		);
		compCount++;

		//output count each time
		outPutPoints(pointsComp, compCount, compPoints);
	}

	if (count === 5) {
		//player Wins
		outPutPoints(pointsPlayer, "PLAYER WINS", playerPoints);
		reset();
	}
	if (compCount === 5) {
		outPutPoints(pointsComp, "COMPUTER WINS", compPoints);
		reset();
	}
};
play();
playAgain.addEventListener("click", play);
