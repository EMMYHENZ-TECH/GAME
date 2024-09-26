const readline = require("readline");

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

let usedWords = [];
let currentLetter = "";

function startGame() {
	console.log("Welcome to Word Chain!");
	console.log("Enter a word to start the game.");

	rl.question("> ", answer => {
		usedWords.push(answer.toLowerCase());
		currentLetter = answer.slice(-1).toLowerCase();
		nextTurn();
	});
}

function nextTurn() {
	console.log(`\nThe next word must start with the letter '${currentLetter.toUpperCase()}'`);
	rl.question("> ", answer => {
		const word = answer.toLowerCase();

		if (word === "quit") {
			endGame();
			return;
		}

		if (isValidWord(word)) {
			usedWords.push(word);
			currentLetter = word.slice(-1);
			nextTurn();
		} else {
			console.log("Invalid word. Try again!");
			nextTurn();
		}
	});
}

function isValidWord(word) {
	if (word.length < 2) {
		console.log("Word must be at least 2 letters long.");
		return false;
	}

	if (word[0].toLowerCase() !== currentLetter) {
		console.log(`Word must start with the letter '${currentLetter.toUpperCase()}'`);
		return false;
	}

	if (usedWords.includes(word)) {
		console.log("Word has already been used.");
		return false;
	}

	return true;
}

function endGame() {
	console.log("\nGame Over!");
	console.log(`You used ${usedWords.length} words:`);
	console.log(usedWords.join(", "));
	rl.close();
}

startGame();
