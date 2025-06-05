// script.js
const botResponses = [
  "I'm here to help!",
  "That's interesting!",
  "Tell me more.",
  "How can I assist you today?",
  "Let's chat!",
];

function sendMessage() {
  const input = document.getElementById("chatInput");
  const message = input.value.trim();
  if (message) {
    appendMessage("user", message, "chatMessages");
    input.value = "";
    setTimeout(() => {
      const botReply =
        botResponses[Math.floor(Math.random() * botResponses.length)];
      appendMessage("bot", botReply, "chatMessages");
    }, 600);
  }
}
function appendMessage(sender, message, containerId) {
  const container = document.getElementById(containerId);
  const msg = document.createElement("div");

  if (sender === "bot") {
    msg.className = "bot-message";
    container.appendChild(msg);

    let i = 0;
    function type() {
      if (i < message.length) {
        msg.textContent += message.charAt(i);
        i++;
        setTimeout(type, 40);
        container.scrollTop = container.scrollHeight;
      }
    }
    type();
  } else {
    msg.className = "user-message";
    msg.textContent = message;
    container.appendChild(msg);
  }

  container.scrollTop = container.scrollHeight;
}

function openChat(name) {
  document.querySelector(".sender-list").classList.remove("open");
  document.querySelector(".chat-area").style.display = "flex";
  document.getElementById("chatWith").textContent = name;
}

function closeChat() {
  document.querySelector(".chat-area").style.display = "none";
  document.querySelector(".sender-list").classList.add("open");
}

function openBotModal() {
  document.getElementById("botModal").classList.add("open");
}

function closeBotModal() {
  document.getElementById("botModal").classList.remove("open");
}

function sendBotMessage() {
  const input = document.getElementById("botInput");
  const message = input.value.trim();
  if (message) {
    appendMessage("user", message, "botMessages");
    input.value = "";
    setTimeout(() => {
      const botReply =
        botResponses[Math.floor(Math.random() * botResponses.length)];
      appendMessage("bot", botReply, "botMessages");
    }, 600);
  }
}

// Enter key listener for both input areas
document.getElementById("chatInput").addEventListener("keypress", function(e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

document.getElementById("botInput").addEventListener("keypress", function(e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendBotMessage();
  }
});
