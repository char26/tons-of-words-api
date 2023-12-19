const express = require('express');
const { readFileSync } = require('fs');

const PORT = process.env.PORT || 8080;
const app = express();

const englishWords = readFileSync('./data/english.json');

app.get('/api/random_word', (req, res) => {
    const language = req.query["language"];
    let randomWord = '';
    if (language == "english") {
        randomWord = englishWords.keys()[Math.floor(Math.random() * 370101)];
    }
    res.json(randomWord);
});

app.listen(PORT, () => {
    console.log('Server running on port ', PORT);
});