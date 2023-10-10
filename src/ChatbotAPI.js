import db from "./firebase_setup/firebase";

const messagesList = [];
const projects = []
let id = '0000';
// const consoleShow = () => { 
//   console.log(messagesList.length);
// }
var prediction = 0;
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

        } else if (message.includes("predict") && message.includes("budget")) {
          messagesList.push("Sure! Please provide me with the project ID...");
          resolve("Sure! Please provide me with the project ID...")
        
        } else if (lastBotMessage === "Sure! Please provide me with the project ID...") {

          let url = 'http://localhost:8080?param1='
          let type = null, cost = null;
          let ref = db.ref("/Projects/ID".concat(message));
                  ref.on("value", snapshot => {
                  const data = snapshot.val();
                  type = data.projectType;
                  cost = data.projectEstimatedCost;
                  console.log(type);
                  console.log(cost);
        
                  url = url + type + '&param2=' + cost;
                  console.log(url);
        
                  fetch(url)
                  .then(response => response.json())
                  .then(data => { prediction = data['prediction'];console.log(prediction); 
                  resolve("The estimated budget for this project is: " + parseInt(prediction) + " dollars.")})
                  .catch((error) => {
                  console.error('Error:', error);
                  });
                  });
          //messagesList.push("The estimated budget for this project is: " + JSON.stringify(data) + " dollars.");
          //resolve("The estimated budget for this project is: " + JSON.stringify(data) + " dollars.");
          //resolve("The estimated budget for this project is: 4200000 dollars.");
          // let prediction = 5;
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
          messagesList.push("What is the project type code?");
          resolve("What is the project type code?");

        } else if (lastBotMessage === "What is the project type code?") {
          addProjectType(message);
          messagesList.push("What is the estimated cost of the project?");
          resolve("What is the estimated cost of the project?");

        } else if (lastBotMessage === "What is the estimated cost of the project?") {
          addProjectEstimatedCost(message);
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
    projectManager: null,
    projectType: null,
    projectEstimatedCost: null,
    projectEstimatedBudget: null
  });
}

function addProjectManager(name) {
  projects[projects.length - 1].projectManager = name;
}

function addProjectType(type) {
  projects[projects.length - 1].projectType = type;
}

function addProjectEstimatedCost(cost) {
  projects[projects.length - 1].projectEstimatedCost = cost;
}

function addProjectID(newID) {
  id = newID;
}

function addEstimatedBudget(projectID, data) {
  console.log(data);
  console.log(data['prediction']);
  return data['prediction'];
}

function predictBudget(projectID) {
  let url = 'http://localhost:8080?param1='
  let type = null, cost = null;
  let ref = db.ref("/Projects/ID".concat(projectID));
          ref.on("value", snapshot => {
          const data = snapshot.val();
          type = data.projectType;
          cost = data.projectEstimatedCost;
          console.log(type);
          console.log(cost);

          url = url + type + '&param2=' + cost;
          console.log(url);

          fetch(url)
          .then(response => response.json())
          .then(data => { prediction = data['prediction'];console.log(prediction);})
          .catch((error) => {
          console.error('Error:', error);
          });
          // return data['prediction']
          });
}

function sendToDatabase() {
  db.ref("/Projects/ID".concat(id)).set(projects[projects.length - 1]);
}

export default API;


/*
          sendToDatabase();
          messagesList.push("Project created!");
          resolve("Project created!");
*/