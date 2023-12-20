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
        <p style="font-size: 12px;">"It's PatrIck Ogalesco – a passionate individual on a journey of exploration and creation. Explore my skills, projects, and more. Feel free to ask me anything!"</p>
    </div>


    <div id="default-sub2">
        <p style="font-size: 12px;">I am <span id="typewriter"></span><span id="cursor">|</span></p>
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
  incomingChatDiv.innerHTML = answerHtml; // Use innerHTML here

  chatContainer.appendChild(incomingChatDiv);
  chatContainer.scrollTo(0, chatContainer.scrollHeight);

  const responseText = document.querySelector(".incoming:last-child p");
  for (let i = 0; i < answer.length; i++) {
    responseText.innerHTML = answer.substring(0, i + 1); // Use innerHTML here
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
    break; // Add the missing semicolon here
  case 'about you':
  case 'tell me about yourself':
  case 'who are you?':
  case 'share some information about you':
  case 'introduce yourself':

    const aboutMeResponse = `
      Hello there, I am Patrick Ogalesco, an aspiring digital artist, boasting a unique fusion of technical prowess and artistic finesse. 
      Currently, I am passionately pursuing a BSc in Computer Science, immersing myself not only in the realm of coding and programming but also dedicating myself fervently to the canvas as an artist. <br><br>
      My journey seamlessly weaves together creativity and logic, charting a course toward innovative problem-solving and the creation of visually breathtaking solutions. Fueled by an innate curiosity and an unwavering commitment to bridging the gap between art and technology, I am poised to inject a fresh perspective into the world of digital art.
    `;
    displayAnswerWithTypingEffect(aboutMeResponse);
    break;

    case 'education':
    case 'where did you study?':
    case 'tell me about your education':
    case 'what is your educational background?':
    case 'can you share details about your schooling?':
    case 'where are you currently studying?':
    const educationResponse = `
    Education
    Here is a summary of my educational journey:
    - Christian Polytechnic Institute Of Catanduanes (2021 - 2024)
    - Catanduanes College (2020 - 2021)
    - San Jose(OCO) National High School (2014 - 2020)
    - Sagrada Viga Catanduanes (2008 - 2013)
  `;
  displayAnswerWithTypingEffect(educationResponse);
  break;
  case 'area of expertise':
  const expertiseResponse = `
     I specialize in various skills that contribute to my expertise in the field. Here are some of my key areas:
    - Photoshop
    - Ibis Paint
    - Krita
    - HTML And CSS
    - JavaScript
    - PHP
    - C
    - C++
    - JAVA
    - Visual Basic
    - Microsoft Application
  `;
  displayAnswerWithTypingEffect(expertiseResponse);
  break;


  case "what you do":
  case 'what are you up to?':
  case 'tell me about your current projects':
  case 'what are you currently learning?':
  case 'share details about your ongoing tasks':
  case 'what keeps you occupied?':

  const doingResponse = `Here's an overview of what I'm currently engaged in:

Web Design
- Currently in the process of learning.

Web Development
- Currently in the process of learning.

Android Development
- Currently in the process of learning.

Digital Art
- Currently in the process of learning.`;
  displayAnswerWithTypingEffect(doingResponse);
  break;



  case 'skills':
  case 'what are your skills?':
  case 'tell me about your abilities':
  case 'what can you do?':
  case 'can you list your skills?':
  case 'share information about your talents':

  const skillsResponse = `
    As a versatile individual with a passion for both technology and creativity, here are some of my key skills:

    - Digital Art
    - Programming
    - Web Development
    - Artistic Vision
    - Collaboration
    - Adaptability
    - Attention to Details
    - Continuous Learning
  `;
  displayAnswerWithTypingEffect(skillsResponse);
  break;

  case 'contact':
  case 'how can we reach you?':
  case 'what is your contact information?':
  case 'can you share your email address?':
  case 'how can I get in touch with you?':
  case 'tell me about your contact details':
    const contactResponse = `
      EMAIL
      jpatrickogalesco@gmail.com

      PHONE
      0938 070 ****

      LOCATION
      Viga Catanduanes
    `;
    displayAnswerWithTypingEffect(contactResponse);
    break;





  default:
    const defaultResponse = "I'm sorry, I didn't understand that. My responses are generated based on programmed commands.";
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