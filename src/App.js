const express = require("express")
const app = express();
const port = 3001;

app.use('/', (req,res) => {
    res.send('Namastey from the dashboard!');
})

app.use('/hello', (req,res) => {
    res.send('Hello hello hello!');
})

app.use('/test', (req,res) => {
    res.send('Hello from the server!');
})

app.listen(port , () => {
    console.log(`App listening on port ${port}..`);
})