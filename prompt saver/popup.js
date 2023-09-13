// Function to display saved prompts in the list
function displaySavedPrompts() {
  const savedPrompts = JSON.parse(localStorage.getItem("savedPrompts")) || [];
  const savedPromptsContainer = document.getElementById("savedPrompts");
  savedPromptsContainer.innerHTML = ""; // Clear existing prompts

  savedPrompts.forEach((prompt, index) => {
    // Create a new prompt card element
    const newPromptCard = document.createElement("div");
    newPromptCard.className = "prompt-card";
    newPromptCard.innerHTML = `
      <div class="w-[480px] h-[146px] px-10 py-8 bg-gray-900 rounded-xl border-slate-800 flex-col justify-start items-start gap-6 inline-flex">
        <div class="pl-3.5 pr-3 py-2 bg-slate-800 rounded-[800px] justify-start items-start gap-2 inline-flex">
          <img class="w-[18px] h-[18px]" src="https://via.placeholder.com/18x18" />
          <div class="text-purple-200 text-sm font-medium uppercase leading-[18px] tracking-tight">Games</div>
        </div>
        <h2 id="prompt-title" class="text-xl text-white font-semibold leading-normal mb-2">${prompt.title}</h2>
        <div class="w-[400px] text-purple-200 text-lg font-medium leading-normal prompt-text">${prompt.text}</div>
      </div>
    `;

    // Add a click event listener to handle modifying the content and copying to clipboard
    newPromptCard.addEventListener("click", () => {
      // Get the prompt text element
      const promptTextElement = newPromptCard.querySelector(".prompt-text");

      // Copy the prompt text to the clipboard
      copyToClipboard(promptTextElement.textContent);

      // Show "Copied" message for a brief period
      showMessage(promptTextElement, "Copied", 1000);
    });

    // Append the new prompt card to the container
    savedPromptsContainer.appendChild(newPromptCard);
  });
}

// Function to copy text to the clipboard
function copyToClipboard(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
}

// Function to display a message on the element and revert to original text
function showMessage(element, message, duration) {
  const originalText = element.textContent;
  element.textContent = message;
  setTimeout(() => {
    element.textContent = originalText;
  }, duration);
}

// Function to save a new prompt
function savePrompt() {
  const prompt = document.getElementById("prompt").value;
  const title = document.getElementById("title").value; // Get the title from the input field

  // Check if both the prompt and title are not empty
  if (prompt.trim() !== "" && title.trim() !== "") {
    // Save the prompt and title to localStorage as an object
    const savedPrompts = JSON.parse(localStorage.getItem("savedPrompts")) || [];
    savedPrompts.push({ title, text: prompt });
    localStorage.setItem("savedPrompts", JSON.stringify(savedPrompts));

    // Display the saved prompt in the list
    displaySavedPrompts();

    // Clear the input fields
    document.getElementById("prompt").value = "";
    document.getElementById("title").value = "";
  }
}

// Event listener for the "Save Prompt" button
document.getElementById("save").addEventListener("click", savePrompt);

// Call the displaySavedPrompts function when the popup is loaded to display existing saved prompts
document.addEventListener("DOMContentLoaded", function () {
  displaySavedPrompts();
});
