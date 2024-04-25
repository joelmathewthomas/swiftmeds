document.addEventListener("DOMContentLoaded", function () {
  const sendMessageButton = document.getElementById("sendMessageButton");
  const messageInput = document.getElementById("messageInput");
  const closeButton = document.getElementById("closeChatButton");

  sendMessageButton.addEventListener("click", function () {
    const message = messageInput.value;

    if (message !== "") {
      socket.emit("sendclicked", {
        sender: username,
        recipient: chatWith,
        message: message,
      });
      console.log("did socketemit sendclicked ", username, chatWith, message);
      // Display the sent message
      displaySentMsg(message);
      // Clear the input field after sending the message
      messageInput.value = "";
    }
  });

  document
    .getElementById("messageInput")
    .addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        const message = messageInput.value;

        if (message !== "") {
          socket.emit("sendclicked", {
            sender: username,
            recipient: chatWith,
            message: message,
          });
          console.log(
            "did socketemit sendclicked ",
            username,
            chatWith,
            message
          );
          // Display the sent message
          displaySentMsg(message);
          // Clear the input field after sending the message
          messageInput.value = "";
        }
      }
    });

  closeButton.addEventListener("click", function () {
    socket.emit("closedchat", { recipient: chatWith });
    location.reload();
  });
});
