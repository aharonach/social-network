import express, { json, urlencoded } from 'express';
import { load_posts } from './functions/posts.js';
import { load_users } from './functions/users.js';
import admin_router from './routes/admin.js';
import users_router from './routes/users.js';
import posts_router from './routes/posts.js';

const app = express();
const port = 2718;

function get_content_type_from_ext(url) {
	const match = url.match( /\.([a-z]+)/i );
	
	if ( ! match ) {
		if ( url === '/' ) {
			return 'text/html';
		}

		return 'application/json';
	}

	const ext = match[1].toLowerCase();

	switch( ext ) {
		case 'js': 
			return 'text/javascript';
		case 'css': 
			return 'text/css';
		case 'html': 
			return 'text/html';
	}

	return 'text/plain';
}

// General app settings
app.use(json()); // to support JSON-encoded bodies
app.use(urlencoded({ extended: true })); // to support URL-encoded bodies
app.use((req, res, next) => {
	const content_type = '/api' === req.baseUrl ? 'application/json; charset=utf-8' : get_content_type_from_ext(req.url);
	res.contentType(content_type);
	next();
});

app.use(express.static('ui'));

app.use('/api', admin_router);
app.use('/api', users_router);
app.use('/api', posts_router);

app.listen(port, () => {
	load_posts();
	load_users();
	console.log(`Listening on port ${port}...`);
});
