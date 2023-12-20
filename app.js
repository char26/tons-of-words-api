const express = require('express');
const { readFileSync } = require('fs');

const PORT = process.env.PORT || 8080;
const app = express();

const englishWordsJson = readFileSync('./data/english.json');
// Set is used to detect whether or not a word exists
const englishWords = new Set(JSON.parse(englishWordsJson)["words"]);
// Array is used to get a subset by index
const englishWordsArray = [...englishWords];
delete englishWordsJson; // no need to store the raw json anymore

/**
 * Get a random word based on provided language.
 * Query params:
 * language -> english (currently optional, more coming soon)
 */
app.get('/api/random_word', (req, res) => {
    const language = req.query["language"];
    let randomWord = '';
    if (!language || language == "english") {
        const randomIndex = Math.floor(Math.random() * 370101);
        randomWord = englishWordsArray[randomIndex];
        res.json(randomWord);
    }
    else {
        res.status(400).send("Language not supported yet!");
    }
});

/**
 * Get words based on index in a list of 370,000+ words.
 * Query params:
 * language -> english (currently optional, more coming soon)
 * start -> 1000 - starts at the 1000th word, which would be absolutize in English.
 * amount -> 1000 - gets 1000 words, starting at the start parameter
 * In this example, get words 1000 through 2000.
 */
app.get('/api/by_index', (req, res) => {
    const language = req.query["language"];
    const start = req.query["start"];
    const amount = req.query["amount"];
    if (amount > 5000) {
        res.status(400);
        res.send("Specify an amount less than or equal to 5000.");
    }
    let endIndex = Number(start) + Number(amount);
    if (endIndex > 370101) {
        endIndex = 370101;
    }
    console.log(endIndex);
    if (!language || language == "english") {
        res.json(englishWordsArray.slice(start, endIndex));
    } else {
        res.status(400).send("Language not supported yet!");
    }
});

/**
 * Check whether the provided word exists.
 * Query params:
 * language -> english (currently optional, more languages coming soon)
 * word -> the word to check
 */
app.get('/api/is_a_word', (req, res) => {
    const language = req.query["language"];
    const word = req.query["word"];
    if (!language || language == "english") {
        if (englishWords.has(word)) {
            res.json({ "is_word": true });
        } else {
            res.json({ "is_word": false });
        }
    }
    else {
        res.status(400).send("Language not supported yet!");
    }
});

/**
 * Filter words by search condition. Regex accepted.
 * Query params:
 * language -> english (currently optional, more languages coming soon)
 * filter -> expression to filter by.
 *  for example, filter=aardv returns ["aardvark", "aardvarks"]
 */
app.get('/api/filtered_words', (req, res) => {
    const language = req.query["language"];
    const filter = req.query["filter"];
    if (!language || language == "english") {
        res.json(englishWordsArray.filter((word) => {
            return word.match("^" + filter + ".*");
        }));
    }
    else {
        res.status(400).send("Language not supported yet!");
    }
});

/**
 * Not part of the API, just used for healthchecks.
 */
app.get('/ping', (req, res) => {
    res.send('pong');
});

app.listen(PORT, () => {
    console.log('Server running on port ', PORT);
});