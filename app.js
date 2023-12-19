const express = require('express');

const PORT = process.env.PORT || 8080;
const app = express();

app.get('/api/words', (req, res) => {
    const language = req.query["language"];
    const through = req.query["through"];
    res.json("Hit the api!");
});

app.listen(PORT, () => {
    console.log('Server running on port ', PORT);
});