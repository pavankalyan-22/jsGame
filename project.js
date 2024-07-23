const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const Synbols_Counts = {
	A: 2,
	B: 4,
	C: 6,
	D: 8,
};
const Symbols_values = {
	A: 5,
	B: 4,
	C: 3,
	D: 2,
};

const deposit = () => {
	while (true) {
		const depositamount = prompt("Enter the deposit money: ");
		const numberdeposit = parseFloat(depositamount);
		if (isNaN(numberdeposit) || depositamount <= 0) {
			console.log("Invalid try to play again");
		} else {
			return numberdeposit;
		}
	}
};

const getNumberOfLines = () => {
	while (true) {
		const lines = prompt("Enter the number of lines you want to bet on: ");
		const numberlines = parseInt(lines);
		if (isNaN(numberlines) || lines <= 0 || numberlines > 3) {
			console.log("Invalid try to play again");
		} else {
			return numberlines;
		}
	}
};

const getbal = (balance, lines) => {
	while (true) {
		const bet = prompt("Enter the bet amount per line: ");
		const numberbet = parseFloat(bet);
		if (isNaN(numberbet) || numberbet < 0 || numberbet >= balance / lines) {
			console.log("Invalid try to play again");
		} else {
			return numberbet;
		}
	}
};

const spin = () => {
	const symbolsreels = [];
	for (const [symbol, count] of Object.entries(Synbols_Counts)) {
		symbolsreels.push(symbol);
	}
	const spinwheel = [];
	for (let i = 0; i < ROWS; i++) {
		spinwheel.push([]);
		const tempwheel = [...symbolsreels];
		for (let j = 0; j < COLS; j++) {
			const randomIndx = Math.floor(Math.random() * tempwheel.length);
			const selected = tempwheel[randomIndx];
			spinwheel[i].push(selected);
			tempwheel.splice(randomIndx, 1);
		}
	}
	return spinwheel;
};

const tranpose = (reels) => {
	rows = [];
	for (let i = 0; i < ROWS; i++) {
		rows.push([]);
		for (let j = 0; j < COLS; j++) {
			rows[i].push(reels[j][i]);
		}
	}
	return rows;
};

const printtype = (invert) => {
	for (const print of invert) {
		let str = "";
		for (const [i, symbols] of print.entries()) {
			str += symbols;
			if (i != print.length - 1) {
				str += " | ";
			}
		}
		console.log(str);
	}
};

const getwinning = (rows, bet, lines) => {
	let winning = 0;
	for (let row = 0; row < lines; row++) {
		allSame = true;
		const symbols = rows[row];
		for (let i = 0; i < symbols.length; i++) {
			if (symbols[i] != symbols[0]) {
				allSame = false;
				break;
			}
		}
		if (allSame) {
			winning += bet * Symbols_values[symbols[0]];
		}
	}
	return winning;
};

const game = () => {
	let balance = deposit();
	while (true) {
		console.log("you have balance $" + balance);
		const numberOfLines = getNumberOfLines();
		const betAmount = getbal(balance, numberOfLines);
		balance -= betAmount * numberOfLines;
		const reels = spin();
		const invert = tranpose(reels);
		printtype(invert);
		const winning = getwinning(invert, betAmount, numberOfLines);
		balance += winning;
		console.log("you have win....$", winning);

		const playagain = prompt("do you want to play again (y/n)");

		if (balance <= 0) break;
		if (playagain != "y") break;
	}
};

game();
