$(document).on("click", ".rejectappointment", function () {
  console.log("Rejecting Appointment");
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
      mode: "reject",
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // Set value of the variable chatWith to patientName
        chatWith = "";
        console.log("Rejected Appointment");

        // Notify the patient
        showNotification("Rejected Appointment");

        // Using setTimeout to create a delay of 2000 milliseconds (2 seconds)
        setTimeout(function () {
          location.reload();
        }, 2100);
      } else {
        console.error("Failed to remove appointment:", data.message);
      }
    })
    .catch((error) => {
      console.error("Error removing appointment:", error);
    });
});
