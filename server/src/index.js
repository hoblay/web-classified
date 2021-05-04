const {server, port } = require('./app');


server.listen(port, () => {
	console.log(`App listening on port ${port}!`);
});
