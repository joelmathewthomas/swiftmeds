$(document).on("click", ".acceptappointment", function () {
  console.log("Accepting Appointment");
  // Get the patient's name from the list item text
  // Get the text of the parent element
  const parentText = $(this).parent().text().trim();

  // Split the text by whitespace
  const words = parentText.split(" ");

  // Extract the first word as the patient's name
  const patientName = words[0];
  console.log(patientName);

  // Send fetch request to remove appointment
  fetch("/removeAppointment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      doctorName: username,
      patientName: patientName,
      mode: "accept",
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // Set value of the variable chatWith to patientName
        chatWith = patientName;
        console.log("Chatting with ", chatWith);

        // Notify the patient
        socket.emit("notify", "You will be redirected to chat");

        // Hide appointment container
        $("#appointmentContainer").hide();

        // Show chat container
        $("#chatContainer").show();
      } else {
        console.error("Failed to remove appointment:", data.message);
      }
    })
    .catch((error) => {
      console.error("Error removing appointment:", error);
    });
});
