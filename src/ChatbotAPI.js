import BotMessage from "./components/BotMessage";
import messages from "./index";

const API = {
  GetChatbotResponse: async message => {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        message = message.toLowerCase();

        if (message.includes("project") && message.includes("create")) {
          resolve("What is the name of the project?");

        } else if (message === "hi") {
          resolve("Welcome to Chatbot! How can I help you?");

        } else if (message) {

        } else {
          resolve("Sorry. I cannot do that right now.\
         Is there anything else I can help you with?");
        }
      }, 2000);
    })
  }
};

const questionResponses = [ {
  question: "What is the name of the project?",
  Response: addName(messages[messages.length - 1].text)
}, {
  question: "Who is the project manager?",
  Response: addProjectManager(messages[messages.length - 1].text)
}
];

const projects = [];

function addName(name) {
  projects.push({
    projectName: name,
    projectManager: null});
}

function addProjectManager(name) {
  projects[projects.length - 1].projectManager = name;
}

export default API;
