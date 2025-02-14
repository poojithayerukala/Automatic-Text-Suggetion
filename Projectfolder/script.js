let trie = new Trie();

function Trie() {
    this.root = new TNode();

    this.insertWord = function(word) {
        let temp = this.root;
        for (let ch of word) {
            let idx = ch.charCodeAt(0) - 'a'.charCodeAt(0);
            if (temp.children[idx] === null) {
                temp.children[idx] = new TNode();
            }
            temp = temp.children[idx];
        }
        temp.bool = true;
        temp.fre++;
    }

    this.hasWord = function(word) {
        let temp = this.root;
        for (let ch of word) {
            let idx = ch.charCodeAt(0) - 'a'.charCodeAt(0);
            if (temp.children[idx] === null) {
                return false;
            }
            temp = temp.children[idx];
        }
        return temp.bool;
    }

    this.freWord = function(word) {
        let temp = this.root;
        for (let ch of word) {
            let idx = ch.charCodeAt(0) - 'a'.charCodeAt(0);
            if (temp.children[idx] === null) {
                return 0;
            }
            temp = temp.children[idx];
        }
        return temp.fre;
    }

    this.autoSuggest = function(prefix) {
        let temp = this.root;
        for (let ch of prefix) {
            let idx = ch.charCodeAt(0) - 'a'.charCodeAt(0);
            if (temp.children[idx] === null) {
                return [];
            }
            temp = temp.children[idx];
        }

        let results = [];
        this.getAllWordsHelper(temp, prefix, results);
        return results;
    }

    this.getAllWordsHelper = function(node, path, results) {
        if (node.bool) {
            results.push(path);
        }
        for (let i = 0; i < 26; i++) {
            if (node.children[i]) {
                let ch = String.fromCharCode(i + 'a'.charCodeAt(0));
                this.getAllWordsHelper(node.children[i], path + ch, results);
            }
        }
    }
};

function TNode() {
    this.bool = false;
    this.fre = 0;
    this.children = Array(26).fill(null);
}

function insertWord() {
    const word = document.getElementById("word").value.trim();
    if (word) {
        trie.insertWord(word);
        alert(`${word} has been inserted into the Trie.`);
        document.getElementById("word").value = '';
    }
}

function checkWord() {
    const word = document.getElementById("word").value.trim();
    const frequency = trie.freWord(word);
    if (frequency > 0) {
        document.getElementById("word-frequency").innerText = `Frequency of the word "${word}": ${frequency}`;
    } else {
        document.getElementById("word-frequency").innerText = `Word "${word}" not found.`;
    }
}

function suggestWords() {
    const prefix = document.getElementById("prefix").value.trim();
    const suggestions = trie.autoSuggest(prefix);
    const suggestionsList = document.getElementById("suggestions-list");
    suggestionsList.innerHTML = '';
    
    suggestions.forEach(word => {
        const li = document.createElement("li");
        li.textContent = word;
        suggestionsList.appendChild(li);
    });
}

function updateAllWords() {
    const allWords = trie.getAllWords();
    const allWordsList = document.getElementById("all-words");
    allWordsList.innerHTML = '';

    allWords.forEach(word => {
        const li = document.createElement("li");
        li.textContent = word;
        allWordsList.appendChild(li);
    });
}

// Initializing all words list on page load
window.onload = updateAllWords;
