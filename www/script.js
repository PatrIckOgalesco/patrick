const chatInput = document.querySelector("#chat-input");
const sendButton = document.querySelector("#send-btn");
const chatContainer = document.querySelector(".chat-container");
const deleteButton = document.querySelector("#delete-btn");
const voiceButton = document.querySelector("#voice-btn");

let userText = '';

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const loadDataFromLocalstorage = () => {
  const defaultText = `<div class="default-text"><br><br>
    <h1>Hello, There!</h1><br>
    <div class="default-sub" id="default-sub">
        <p style="font-size: 12px;">"It's PatrIck Ogalesco. Explore my skills, projects, and more. Feel free to ask me anything!"</p>
      </div>


      <div id="default-sub2">
        <p style="font-size: 12px;">"I am a passionate creator, seamlessly blending the worlds of programming and digital art. With a keyboard as my canvas and code as my brush, I craft immersive digital experiences that transcend the boundaries of technology and aesthetics."</p>
      </div>
    </div>
  </div>`;
  
  chatContainer.innerHTML = localStorage.getItem("all-chats") || defaultText;
  chatContainer.scrollTo(0, chatContainer.scrollHeight);
};

const createChatElement = (content, className) => {
  const chatDiv = document.createElement("div");
  chatDiv.classList.add("chat", className);
  chatDiv.innerHTML = content;
  return chatDiv;
};

const displayAnswerWithTypingEffect = async (answer) => {
  const answerHtml = `<div class="chat-content">
    <div class="chat-details">
      <img src="www/images/chatbot3.jpg" alt="chatbot-img">
      <p>${answer}</p>
    </div>
  </div>`;

  const incomingChatDiv = document.createElement("div");
  incomingChatDiv.classList.add("chat", "incoming");
  incomingChatDiv.innerHTML = answerHtml;

  chatContainer.appendChild(incomingChatDiv);
  chatContainer.scrollTo(0, chatContainer.scrollHeight);

  const responseText = document.querySelector(".incoming:last-child p");
  for (let i = 0; i < answer.length; i++) {
    responseText.textContent = answer.substring(0, i + 1);
    await sleep(50);
  }
};

const handleOutgoingChat = async () => {
  userText = chatInput.value.trim();
  if (!userText) return;

  chatInput.value = "";

  const html = `<div class="chat-content">
    <div class="chat-details">
      <img src="www/images/user1.jpg" alt="user-img">
      <p>${userText}</p>
    </div>
  </div>`;

  const outgoingChatDiv = createChatElement(html, "outgoing");
  chatContainer.querySelector(".default-text")?.remove();
  chatContainer.appendChild(outgoingChatDiv);
  chatContainer.scrollTo(0, chatContainer.scrollHeight);

  const question = userText.toLowerCase();

  switch (question) {
    case 'hi':
    case 'hello':
      const greetingResponse = "Hi there! How can I assist you?";
      // Use typing-text animation function instead of direct HTML response
      displayAnswerWithTypingEffect(greetingResponse);
      break;

    // Add more cases for different user inputs

    default:
      const defaultResponse = "I'm sorry, I didn't understand that. Can you please provide more information?";
      // Use typing-text animation function instead of direct HTML response
      displayAnswerWithTypingEffect(defaultResponse);
      break;
  }
};

const deleteChats = () => {
  if (confirm("Are you sure you want to delete all the chats?")) {
    localStorage.removeItem("all-chats");
    loadDataFromLocalstorage();
  }
};

const initialInputHeight = chatInput.scrollHeight;

chatInput.addEventListener("input", () => {
  chatInput.style.height = `${initialInputHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
    e.preventDefault();
    handleOutgoingChat();
  }
});

loadDataFromLocalstorage();
sendButton.addEventListener("click", handleOutgoingChat);
deleteButton.addEventListener("click", deleteChats);

voiceButton.addEventListener("click", () => {
  // Add voice functionality here if needed
});

chatInput.addEventListener("input", () => {
  // Handle input changes if needed
});

window.addEventListener('beforeunload', () => {
  // Handle cleanup before unload if needed
});
