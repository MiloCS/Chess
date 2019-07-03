const express = require('express');
const port = 80;

const dirname = "C:\\Users\\Milo Cason-Snow\\Programming\\Chess";
const app = express();

app.use(express.static(dirname));

//Basic GET route for the page
app.get('/', (req, res) => res.sendFile(dirname + "\\" + "chess.html"));

//POST route to validate/make a move
// app.post('/makemove' (req, res) => {
// 	req.setTimeout(100);
// 	source = req.body.source;
// 	dest = req.body.dest;
// });

app.listen(port, () => {
	console.log(`listening on port ${port}`)
})