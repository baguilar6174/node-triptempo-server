import { readFileSync } from 'fs';
import http from 'http';

const server = http.createServer((req, res) => {
	// res.writeHead(200, { 'Content-Type': 'text/html' });
	// res.write('<h1>Hello</h1>');
	// res.end();

	if (req.url === '/') {
		const htmlFile = readFileSync('./public/index.html', 'utf-8');
		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.end(htmlFile);
		return;
	}

	if (req.url?.endsWith('.js') ?? false) {
		res.writeHead(200, { 'Content-Type': 'application/javascript' });
	} else if (req.url?.endsWith('.css') ?? false) {
		res.writeHead(200, { 'Content-Type': 'text/css' });
	}

	const contentResponse = readFileSync(`./public/${req.url}`, 'utf-8');
	res.end(contentResponse);
});

server.listen(3000, () => {
	console.log('Server running on port 3000');
});
