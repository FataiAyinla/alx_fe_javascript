
// Simulated server quote storage
let serverQuotes = [
  { text: "Server quote 1", category: "Wisdom" },
  { text: "Server quote 2", category: "Humor" }
];

// ✅ Required: fetchQuotesFromServer
function fetchQuotesFromServer() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(serverQuotes);
    }, 1000); // simulate 1 second delay
  });
}
// ✅ Step 1: Load quotes from localStorage or use defaults
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  { text: "Believe in yourself and all that you are.", category: "Inspiration" },
  { text: "The only way to do great work is to love what you do.", category: "Motivation" },
  { text: "Life is short. Smile while you still have teeth.", category: "Humor" }
];

// ✅ Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// ✅ Show a random quote and store it in sessionStorage
function showRandomQuote() {
  const quoteDisplay = document.getElementById('quoteDisplay');
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  quoteDisplay.innerHTML = `<p>"${quote.text}"</p><em>- ${quote.category}</em>`;
  sessionStorage.setItem("lastQuote", JSON.stringify(quote));
}

// ✅ Add a new quote
function addQuote() {
  const text = document.getElementById('newQuoteText').value.trim();
  const category = document.getElementById('newQuoteCategory').value.trim();

  if (text && category) {
    const newQuote = { text, category };
    quotes.push(newQuote);
    saveQuotes();
    alert("Quote added!");
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
  } else {
    alert("Please fill in both fields.");
  }
}

// ✅ Create the form dynamically
function createAddQuoteForm() {
  const formDiv = document.createElement('div');

  const quoteInput = document.createElement('input');
  quoteInput.id = 'newQuoteText';
  quoteInput.placeholder = 'Enter a new quote';

  const categoryInput = document.createElement('input');
  categoryInput.id = 'newQuoteCategory';
  categoryInput.placeholder = 'Enter quote category';

  const addButton = document.createElement('button');
  addButton.textContent = 'Add Quote';
  addButton.onclick = addQuote;

  formDiv.appendChild(quoteInput);
  formDiv.appendChild(categoryInput);
  formDiv.appendChild(addButton);

  document.body.appendChild(formDiv);
}

// ✅ Export quotes to JSON
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const downloadLink = document.createElement('a');
  downloadLink.href = url;
  downloadLink.download = "quotes.json";
  downloadLink.click();
  URL.revokeObjectURL(url);
}

// ✅ Import quotes from JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    try {
      const importedQuotes = JSON.parse(event.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        alert("Quotes imported successfully!");
      } else {
        alert("Invalid JSON format. Must be an array.");
      }
    } catch (e) {
      alert("Error reading JSON file.");
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// ✅ DOM setup
document.addEventListener('DOMContentLoaded', () => {
  createAddQuoteForm();
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  document.getElementById('exportBtn').addEventListener('click', exportToJsonFile);
  document.getElementById('importFile').addEventListener('change', importFromJsonFile);

  // Optional: Load last viewed quote from sessionStorage
  const lastQuote = JSON.parse(sessionStorage.getItem("lastQuote"));
  if (lastQuote) {
    document.getElementById('quoteDisplay').innerHTML =
      `<p>"${lastQuote.text}"</p><em>- ${lastQuote.category}</em>`;
  } else {
    showRandomQuote();
  }
});
// ✅ Populate category filter dropdown from unique categories
function populateCategories() {
  const categorySet = new Set();
  quotes.forEach(q => categorySet.add(q.category));
  const categoryFilter = document.getElementById('categoryFilter');

  // Remove old options (except 'All')
  categoryFilter.innerHTML = `<option value="all">All Categories</option>`;

  categorySet.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  // Restore last selected filter from localStorage
  const lastCategory = localStorage.getItem("selectedCategory");
  if (lastCategory) {
    categoryFilter.value = lastCategory;
    filterQuotes();
  }
}

// ✅ Filter quotes by category
function filterQuotes() {
  const selectedCategory = document.getElementById('categoryFilter').value;
  localStorage.setItem("selectedCategory", selectedCategory);

  const filtered = selectedCategory === 'all'
    ? quotes
    : quotes.filter(q => q.category === selectedCategory);

  if (filtered.length > 0) {
    const randomQuote = filtered[Math.floor(Math.random() * filtered.length)];
    document.getElementById('quoteDisplay').innerHTML =
      `<p>"${randomQuote.text}"</p><em>- ${randomQuote.category}</em>`;
    sessionStorage.setItem("lastQuote", JSON.stringify(randomQuote));
  } else {
    document.getElementById('quoteDisplay').textContent = "No quotes found in this category.";
  }
}
function populateCategories() {
  const categoryFilter = document.getElementById("categoryFilter");

  // ✅ Extract unique categories using .map and Set
  const categories = [...new Set(quotes.map(quote => quote.category))];

  // Clear existing options and keep "All Categories"
  categoryFilter.innerHTML = `<option value="all">All Categories</option>`;

  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  // Restore last selected filter from localStorage if it exists
  const savedCategory = localStorage.getItem("selectedCategory");
  if (savedCategory) {
    categoryFilter.value = savedCategory;
    filterQuotes();
  }
}
// Mock server data (simulates JSONPlaceholder-like response)
let serverQuotes = [
  { text: "Server quote 1", category: "Wisdom" },
  { text: "Server quote 2", category: "Humor" }
];

// Simulate fetching from "server"
function fetchFromServer() {
  return new Promise(resolve => {
    function syncWithServer() {
  fetchQuotesFromServer().then(serverData => {
    const localData = JSON.parse(localStorage.getItem("quotes")) || [];

    const serverTexts = new Set(serverData.map(q => q.text));
    const merged = [...serverData];

    localData.forEach(localQuote => {
      if (!serverTexts.has(localQuote.text)) {
        merged.push(localQuote);
      }
    });

    quotes = merged;
    saveQuotes();
    populateCategories();
    filterQuotes();
    notifyUser("Quotes synced with server. Conflicts resolved.");
  });
}


// Simulate pushing local changes to "server"
function pushToServer(newQuotes) {
  return new Promise(resolve => {
    setTimeout(() => {
      const existingTexts = new Set(serverQuotes.map(q => q.text));
      newQuotes.forEach(q => {
        if (!existingTexts.has(q.text)) {
          serverQuotes.push(q);
        }
      });
      resolve(serverQuotes);
    }, 1000);
  });
}
function syncWithServer() {
  fetchFromServer().then(serverData => {
    const localData = JSON.parse(localStorage.getItem("quotes")) || [];

    // Conflict resolution: server data takes precedence
    const serverTexts = new Set(serverData.map(q => q.text));
    const merged = [...serverData];

    localData.forEach(localQuote => {
      if (!serverTexts.has(localQuote.text)) {
        merged.push(localQuote); // add unique local quote
      }
    });

    quotes = merged;
    saveQuotes();
    populateCategories();
    filterQuotes();
    notifyUser("Synced with server. Conflicts resolved.");
  });
}

// Periodically sync every 30 seconds
setInterval(syncWithServer, 30000);
function notifyUser(message) {
  const notice = document.getElementById("notification");
  notice.textContent = message;
  setTimeout(() => (notice.textContent = ""), 5000);
}

