# Tons of Words API

## Overview
The goto API for finding words! Currently only English words are available, but Spanish and other 
languages are planned for the future. There are currently 4 different endpoints. \
\
The language query parameter on all endpoints is optional - language will default to English.

## Endpoints
### GET /api/random_word
Returns JSON with a random word out of 370101 English words.\
<strong>Query Parameters:</strong>
- language -> english (currently optional, more coming soon) \
<strong>Example:</strong> \
GET /api/random_word \
Returns one random English word.

### GET /api/by_index
Returns a JSON array with words between the start parameter and start + amount parameter. 
Words are both stored and returned in alphabetical order.
<strong>Query Parameters:</strong>
- language -> english (currently optional, more coming soon)
- start -> 1000 - starts at the 1000th word, which would be absolutize in English.
- amount -> 1000 - gets 1000 words, starting at the start parameter \
<strong>Example:</strong> \
GET /api/by_index?start=1000&amount=1000 \
Returns an array of words 1000 through 2000.

### GET /api/is_a_word
Check whether the provided word exists.
Query Parameters:
- language -> english (currently optional, more languages coming soon)
- word -> the word to check
<strong>Example:</strong> \
GET /api/is_a_word?word=aardvark \
returns {"is_word": "true"}

### GET /api/filtered_words
Filter words by search condition. Regex accepted. \
Query Parameters:
- language -> english (currently optional, more languages coming soon)
- filter -> expression to filter by.
<strong>Example:</strong> \
GET /api/filtered_words?filter=aardv \
returns ["aardvark", "aardvarks"]
