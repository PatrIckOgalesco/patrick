
// Array of predictive text options---------------suggestion forn js
let predictiveTextOptions = [
"How can we reach you?",
"What is your contact information?",
"Can you share your email address?",
"How can I get in touch with you?",
"Tell me about your contact details.",

"Tell me about yourself.",
"Who are you?",
"Share some information about you.",
"Introduce yourself.",
"What can you tell me about your background?",

"Where did you study?",
"Tell me about your education.",
"What is your educational background?",
"Can you share details about your schooling?",
"Where are you currently studying?",

"What skills do you have?",
"Tell me about your expertise.",
"What are your areas of specialization?",
"Can you list your skills?",
"What are you good at?",

"What are you currently working on?",
"Tell me about your current activities.",
"What projects are you involved in?",
"Share details about your current tasks.",
"What is keeping you busy right now?",
];
predictiveTextOptions.sort();

const input = document.getElementById("chat-input");
const suggestion = document.getElementById("suggestion");

// Event listener for input changes
input.addEventListener("input", () => {
  clearSuggestion();
  const inputWords = input.value.split(" ");
  const lastWord = inputWords[inputWords.length - 1];
  const regex = new RegExp("^" + lastWord, "i");

  const matchingSuggestions = predictiveTextOptions.filter(option =>
    regex.test(option.toLowerCase())
  );

  if (matchingSuggestions.length > 0 && lastWord !== "") {
    matchingSuggestions.forEach(suggest => {
      const suggestionItem = document.createElement("div");
      suggestionItem.textContent = suggest;
      suggestionItem.classList.add("suggestion-item");
      suggestionItem.addEventListener("click", () => {
        applySuggestion(suggest);
        clearSuggestion();
      });
      suggestion.appendChild(suggestionItem);
    });
  }
});

// Event listener for Enter key press
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && suggestion.childElementCount > 0) {
    e.preventDefault();
    applySuggestion(suggestion.textContent.trim());
    clearSuggestion();
  }
});

const applySuggestion = (selectedSuggestion) => {
  const currentInput = input.value;
  const updatedInput = currentInput.replace(/\S+$/, "");
  input.value = updatedInput + selectedSuggestion;
};

const clearSuggestion = () => {
  suggestion.innerHTML = "";
};

sendButton.style.display = "block";


