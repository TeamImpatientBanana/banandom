newSeed = function(seed) {

	//seed = require('crypto').createHash('md5').update(seed).digest("hex");

	//ANDREW, PUT THE THING THAT SHA 256s THINGS HERE SO I CAN MODIFY IT

	var splitSeed = seed.split("");
	console.log("splitSeed first split = "+splitSeed);

	// let's make that array of md5 crap to an array of numbers we can add
	lengthOfArray = splitSeed.length;

	for (i = 0; i < lengthOfArray; i++) {
		splitSeed[i] = md5ArrayToRandomAssNumberArray(splitSeed[i]);
		console.log("splitSeed after md5ArrayToRandomAssNumberArray = "+splitSeed);
	}

	console.log("We made it past randomizing the array");

	for (i = 0; i < lengthOfArray; i++) {
		splitSeed[i] = toNumber(splitSeed[i]);
		console.log("splitSeed after toNumber = "+splitSeed);
	}
	
	score = addEverythingInTheArrayTogether(splitSeed);

	score = score * multipliers(splitSeed);

	//score = possiblyReverseScore(score);

	return score;
};

function md5ArrayToRandomAssNumberArray (splitSeed){
	switch(splitSeed) {
		case "0":
			return "143";
		case "1":
			return "342";
		case "2":
			return "34";
		case "3":
			return "42";
		case "4":
			return "243";
		case "5":
			return "64";
		case "6":
			return "453";
		case "7":
			return "84";
		case "8":
			return "9";
		case "9":
			return "104";
		case "a":
			return "110";
		case "b":
			return "112";
		case "c":
			return "13";
		case "d":
			return "154";
		case "e":
			return "145";
		case "f":
			return "193";
	}
}

function addEverythingInTheArrayTogether(array) {
	console.log("Made it into addEverythingInTheArrayTogether");
	var total = array.reduce(function(a, b) {
		console.log("running reduction");
		return a + b;
	});
	console.log("total made inside addEverythingInTheArrayTogether = "+total);
	return total;
}

function multipliers(arrayPiece) {
	console.log("made it into multipliers function");
	
	var multiplier = Math.floor((Math.random() * 100) + 1);

	console.log("The multiplier is = "+multiplier);

	return multiplier;
}

function possiblyReverseScore(score) {
	var time = (new Date()).getTime();
	leftovers = time % 2;
	if (leftovers == 1) {
		score = toString(score);
		score = score.split("");
		score = score.reverse();
		score = score.join("");
		score = toNumber(score);
		return score;
	}
	return score;
}

function toString(number) {
	return number.toString();
}

function toNumber(string) {
	return parseInt(string, 10);
}