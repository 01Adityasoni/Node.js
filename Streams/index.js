const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const status = require('express-status-monitor');
const zlib = require('zlib');

app.use(status());


fs.createReadStream("./sample.txt").pipe(
    zlib.createGzip().pipe(fs.createWriteStream("./sample.zip"))
);

app.get("/", (req, res) => {
    const stream = fs.createReadStream("sample.txt", "utf-8");
    stream.on("data", (chunk) => {
        res.write(chunk);
    });
    stream.on("end", () => {
        res.end();
    });
    stream.on("error", (err) => {
        console.error(err);
        res.status(500).send("Error reading file");
    }
    );
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});