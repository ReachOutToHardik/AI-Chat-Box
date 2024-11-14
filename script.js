document.getElementById("send-btn").addEventListener("click", sendMessage);

const loadingIndicator = document.getElementById("loading-indicator");

function addMessage(content, sender) {
  const message = document.createElement("div");
  message.classList.add("message", `${sender}-message`);
  message.innerText = content;
  document.getElementById("chat-box").appendChild(message);
  document.getElementById("chat-box").scrollTop =
    document.getElementById("chat-box").scrollHeight;
}

function displayTyping() {
  loadingIndicator.classList.remove("hidden");
}

function hideTyping() {
  loadingIndicator.classList.add("hidden");
}

async function sendMessage() {
  const input = document.getElementById("chat-input").value.trim();
  if (!input) return;

  addMessage(input, "user");
  document.getElementById("chat-input").value = "";

  displayTyping();

  try {
    const response = await fetch(
      "https://cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-rapidapi-key":
            "157fded715msh6988179cc7a9f98p1d5aecjsndf3eb4351065",
          "x-rapidapi-host":
            "cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com",
        },
        body: JSON.stringify({
          messages: [{ role: "user", content: input }],
          model: "gpt-4o",
          max_tokens: 100,
          temperature: 0.9,
        }),
      }
    );

    const data = await response.json();
    hideTyping();

    const aiMessage =
      data.choices[0]?.message?.content || "Sorry, I couldn't process that.";
    addMessage(aiMessage, "ai");
  } catch (error) {
    hideTyping();
    addMessage("An error occurred. Please try again.", "ai");
  }
}

document
  .getElementById("chat-input")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") sendMessage();
  });
