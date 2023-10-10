import db from "./firebase_setup/firebase";

const messagesList = [];
const projects = []
let id = '0000';
// const consoleShow = () => { 
//   console.log(messagesList.length);
// }

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
          //resolve("Bye! Have a nice day!");
          resolve(
            fetch('http://localhost:8080?param1=3&param2=4200000')
            .then(response => response.json())
            .then(data => console.log(data))
            .catch((error) => {
            console.error('Error:', error);
            }));
        } else if (message.includes("project") && message.includes("create")) {
          messagesList.push("What is the name of the project?");
          resolve("What is the name of the project?");

        } else if (lastBotMessage === "What is the name of the project?") {
          addName(message);
          messagesList.push("Who is the project manager?");
          resolve("Who is the project manager?");

        } else if (lastBotMessage === "Who is the project manager?") {
          addProjectManager(message);
          messagesList.push("Please provide project ID...");
          resolve("Please provide project ID...");
    
        } else if (lastBotMessage === "Please provide project ID...") {
          addProjectID(message);
          sendToDatabase();
          messagesList.push("Project created!");
          resolve("Project created!");

        } else if (message.includes("show")) {
          let ref = db.ref("/Projects");
          ref.on("value", snapshot => {
          const data = snapshot.val()
          resolve("Here are the projects: " + JSON.stringify(data));
          })

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

function addName(name) {
  projects.push({
    projectName: name,
    projectManager: null
  });
}

function addProjectManager(name) {
  projects[projects.length - 1].projectManager = name;
}

function addProjectID(newID) {
  id = newID;
}

function sendToDatabase() {
  db.ref("/Projects/ID".concat(id)).set(projects[projects.length - 1]);
}

export default API;
