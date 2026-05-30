const cluster = require('cluster');
const os = require('os');
const express = require('express');


const totalCPUs = os.cpus().length;

console.log(`Total CPUs: ${totalCPUs}`);

if(cluster.isPrimary){
    for(let i=0; i<totalCPUs; i++){
        cluster.fork();
    }
}
else{

    const app = express();
const port = 3000;

    app.get('/', (req, res) => {
        res.send({ message: `hello from express server ${process.pid}` });
    });

    app.listen(port, () => {  console.log(` app listening at http://localhost:${port} and process id is ${process.pid}`);
    });
}
 