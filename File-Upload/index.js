const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const port = process.env.PORT || 3000;

const uploadsDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadsDir)) {
	fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
	destination: (req, file, cb) => cb(null, uploadsDir),
	filename: (req, file, cb) => {
		const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
		cb(null, `${uniqueSuffix}-${file.originalname}`);
	},
});

const upload = multer({ storage });

app.get('/', (req, res) => {
	res.send(`
		<h1>File Upload</h1>
		<form action="/upload" method="POST" enctype="multipart/form-data">
			<input type="file" name="file" />
			<button type="submit">Upload</button>
		</form>
	`);
});

app.post('/upload', upload.single('file'), (req, res) => {
	if (!req.file) {
		return res.status(400).send('No file uploaded');
	}

	res.send(`File uploaded successfully: ${req.file.filename}`);
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
