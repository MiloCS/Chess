$( document ).ready(function () {
	$( "#submitcommand" ).click(function () {
		let commandbox = $( "#commandbox" );
		let command = commandbox.val();
		commandbox.val('');
		//actual logic call
		$( "table" ).append(`<tr><td>${command}</td><td></td></tr>`)
		let outputbox = $( "#interpretedcommand" );
		outputbox.html(returnStringCommand(command));
	});
});

$( "#hider" ).click(function () {
	$( "#gamelog-sidebar" ).hide();
});