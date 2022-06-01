"use strict";

// Remember to break problem down into subproblems
// Remember to Restate probl, list contraints, list & gen operations, use new thoughts to discover new solutions

// Next, step to REFACTOR, Needs some reworking

function computerPlay() {
	// General descriptoin. Will randomly return Rock, paper, scissors
	let num = Math.floor(Math.random() * 3);
	const choices = ["Rock", "Paper", "Scissor"];
	const randChoice = choices[num];
	return randChoice;
}

function playRound(playerSelection, computerSelection) {
	// Plays a single round of RPS, returns a string declaring winner "You Lose!" Paper beats Rock
	const player = playerSelection.toLowerCase();
	const comp = computerSelection.toLowerCase();

	const choices = ["rock", "paper", "scissor"];

	let playerWins =
		(player === "rock" && comp === "scissor") ||
		(player === "scissor" && comp === "paper") ||
		(player === "paper" && comp === "rock")
			? `You Win!, ${player} beats ${comp}`
			: player === comp
			? "Tie, try again"
			: `You lose!, ${comp} beats ${player}`;

	if (choices.indexOf(player) === -1) {
		playerWins = "Wrong Answer, No Scores Given. Please try again";
	}

	return playerWins;
}

function gameRounds() {
	let playerScore = 0;
	let compScore = 0;
	let message;
	const playerSelection = [""];
	const computerSelection = [];
	let gameOutput;

	for (let i = 0; i < 5; i++) {
		playerSelection[i] = prompt("Choose Rock, Paper, or Scissors");
		computerSelection[i] = computerPlay();

		if (playerSelection[i]) {
			game();
			message = gameOutput.includes("Win")
				? (playerScore += 1)
				: gameOutput.includes("Tie")
				? (playerScore += 0)
				: gameOutput.includes("Wrong")
				? (compScore += 0)
				: (compScore += 1);

			console.log(playerScore);
			console.log(compScore);
		} else {
			alert("Wrong Answer");
			game();
		}
		function game() {
			if (playerSelection[i] === null)
				return console.log("Game Cancelled");
			gameOutput = playRound(playerSelection[i], computerSelection[i]);
			console.log(gameOutput);
		}
	}

	if (playerScore > compScore) {
		console.log(`Congrats player, you beat the computer`);
	} else if (playerScore === compScore) {
		console.log("It's a Tie!");
	} else console.log(`Computer Wins!`);
}
gameRounds();
