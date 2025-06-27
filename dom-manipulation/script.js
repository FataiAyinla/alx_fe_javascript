// ✅ Quotes array with objects (text and category)
const quotes = [
  { text: "Believe in yourself and all that you are.", category: "Inspiration" },
  { text: "The only way to do great work is to love what you do.", category: "Motivation" },
  { text: "Life is short. Smile while you still have teeth.", category: "Humor" }
];

// ✅ Show random quote function
function showRandomQuote() {
  const quoteDisplay = document.getElementById('quoteDisplay');
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  quoteDisplay.innerHTML = `<p>"${quote.text}"</p><em>- ${quote.category}</em>`;
}

// ✅ Add new quote function
function addQuote() {
  const textInput = document.getElementById('newQuoteText');
  const categoryInput = document.getElementById('newQuoteCategory');

  const newText = textInput.value.trim();
  const newCategory = categoryInput.value.trim();

  if (newText && newCategory) {
    quotes.push({ text: newText, category: newCategory });
    alert("Quote added!");
    textInput.value = '';
    categoryInput.value = '';
  } else {
    alert("Please fill in both quote and category fields.");
  }
}

// ✅ The REQUIRED createAddQuoteForm function
function createAddQuoteForm() {
  const formDiv = document.createElement('div');
  formDiv.id = 'quoteForm';

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

// ✅ Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  showRandomQuote();
  createAddQuoteForm();
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
});
