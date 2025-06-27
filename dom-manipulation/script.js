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
