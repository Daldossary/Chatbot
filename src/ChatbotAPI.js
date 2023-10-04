import BotMessage from "./components/BotMessage";

const API = {
  GetChatbotResponse: async message => {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        message = message.toLowerCase();
        if (message.includes("project") && message.includes("create")) {
          resolve("Creating a new project...");
        } else if (message === "hi") {
          resolve("Welcome to Chatbot! How can I help you?");
        } else resolve("Sorry. I cannot do that right now.\
         Is there anything else I can help you with?");
      }, 2000);
    })
  }
};

export default API;
