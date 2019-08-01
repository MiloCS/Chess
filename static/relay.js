$( "#submitcommand" ).click(function () {
	let commandbox = $( "#commandbox" );
	let command = commandbox.val();
	commandbox.val('');
	$("#waiting").show();
	$("#interpretedcommand").hide();
	setTimeout(() => {
		$("#waiting").hide();
		$("#interpretedcommand").show();
		//actual logic call
		$( "table" ).append(`<tr><td>${command}</td><td></td></tr>`)
		let outputbox = $( "#interpretedcommand" );
		outputbox.html(returnStringCommand(command));
	}, 1000);
});

let promotionStart = null;
let promotionEnd = null;


$( "#hider" ).click(function () {
	$( "#gamelog-sidebar" ).hide();
	$( "#shower" ).show();
});

$( "#shower" ).click(function () {
	$( "#gamelog-sidebar" ).show();
	$( "#shower" ).hide();
});

let modal = document.getElementById('myModal');
let modalClose = document.getElementsByClassName("close")[0]

$("#myBtn").click(function() {
  modal.style.display = "block";
});

function closeModal() {
	modal.style.display = "none";
	promotionStart = null;
	promotionEnd = null;
}

modalClose.onclick = function() {
  closeModal();
}

window.onclick = function(event) {
  if (event.target == modal) {
    closeModal();
  }
}

//castling dialog box
function promotionChoice(start, end) {
	promotionStart = start;
	promotionEnd = end;
	modal.style.display = "block";
}

function promote(num) {
	if (promotionStart !== null && promotionEnd !== null) {
		let pawnBeingPromoted = positions[promotionStart.x][promotionStart.y];
		let sign = pawnBeingPromoted; //sign(pawnBeingPromoted);
		positions[promotionStart.x][promotionStart.y] = 0;
		positions[promotionEnd.x][promotionEnd.y] = num * sign;
		changedPositions.push(promotionStart);
		changedPositions.push(promotionEnd);
		minimalRedraw();
	}
	closeModal();
}

$("#queenpromote").click(function () {
	promote(5);
});

$("#bishoppromote").click(function () {
	promote(4);
});

$("#rookpromote").click(function () {
	promote(2);
});

$("#knightpromote").click(function () {
	promote(3);
});