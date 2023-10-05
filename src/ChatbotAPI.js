import db from "./firebase_setup/firebase";

const messagesList = [];

const consoleShow = () => { 
  console.log(messagesList.length);
}

const API = {
  GetChatbotResponse: async message => {
    return new Promise(function(resolve) {
      setTimeout(function() {
        message = message.toLowerCase();
        messagesList.push(message);
        let lastBotMessage = messagesList[messagesList.length - 2];

        if (message === "hi" || message === "hello") {
          messagesList.push("Welcome to Chatbot! How can I help you?");
          resolve("Welcome to Chatbot! How can I help you?");

        } else if (message === "bye" || message === "goodbye") {
          messagesList.push("Bye! Have a nice day!");
          resolve("Bye! Have a nice day!");

        } else if (message.includes("project") && message.includes("create")) {
          messagesList.push("What is the name of the project?");
          resolve("What is the name of the project?");

        } else if (lastBotMessage === "What is the name of the project?") {
          addName(message);
          messagesList.push("Who is the project manager?");
          resolve("Who is the project manager?");

        } else if (lastBotMessage === "Who is the project manager?") {
          addProjectManager(message);
          messagesList.push("Project created!");
          sendToDatabase();
          resolve("Project created!");
    
        } else if (message.includes("show")) {
          resolve("Here are the projects: " + JSON.stringify(projects));

        } else {
          messagesList.push("Sorry. I cannot do that right now.\
          Is there anything else I can help you with?");
          resolve("Sorry. I cannot do that right now.\
          Is there anything else I can help you with?");

        }
      }, 2000);
    })
  }
};

const projects = []

function addName(name) {
  projects.push({
    name: {
      projectName: name,
      projectManager: ""
    }
  });
}

function addProjectManager(name) {
  //projects[projects.length - 1]. = name;
}

function sendToDatabase() {
  db.ref("Projects/").set(projects[projects.length - 1]);
}

export default API;
