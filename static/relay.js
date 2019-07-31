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


$( "#hider" ).click(function () {
	$( "#gamelog-sidebar" ).hide();
	$( "#shower" ).show();
});

$( "#shower" ).click(function () {
	$( "#gamelog-sidebar" ).show();
	$( "#shower" ).hide();
});


$("div#dialog").dialog ({
  autoOpen : false
});

//castling dialog box
async function castleChoose() {
	let selected = 0;
	$('#dialog').dialog('open');
	return selected;
}
