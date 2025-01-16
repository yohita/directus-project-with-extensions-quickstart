const express = require('express');
const path = require('path');

export default ({ init, filter, action }) => {

	init("app.before", ({ app }) => {
		
		// Get the current working directory
		const root = process.cwd();

		// Serve static files from the /home route
		app.use('/app', express.static(path.join(root, 'angular-ionic-dist', 'www')));
		app.use('/', express.static(path.join(root, 'landing')));

		app.get('/', (req, res, next) => {
			res.sendFile(path.join(root, 'landing', 'index.html'));
		});
		// Custom middleware to handle /home/* routes
		app.get('/app/*', (req, res, next) => {
		const ext = path.extname(req.path);
		if (ext !== '') {
			// If it's a static file that wasn't found, pass to the next middleware (which will likely result in a 404)
			next();
		} else {
			// If it's not a static file, serve index.html from the /home directory
			res.sendFile(path.join(root, 'angular-ionic-dist', 'www', 'index.html'));
		}
		});

	});

	filter('items.create', () => {
		console.log('Creating Item!');
	});

	action('items.create', () => {
		console.log('Item created!');
	});
};
