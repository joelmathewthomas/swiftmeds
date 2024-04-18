document.addEventListener("DOMContentLoaded", function () {
  // Check if user is a doctor
  fetch("/getSessionData")
    .then((response) => response.json())
    .then((data) => {
      if (data.type === "doctor") {
        // Clear existing contents
        document.querySelector("#appointmentContainer .collection").innerHTML =
          "";

        // Fetch list of appointments
        data.appointments.forEach((patient) => {
          // Create list item element
          const listItem = document.createElement("li");
          listItem.classList.add("collection-item");

          // Create accept button
          const acceptButton = document.createElement("a");
          acceptButton.classList.add(
            "waves-effect",
            "waves-light",
            "btn",
            "acceptappointment"
          );
          acceptButton.textContent = " Accept";

          // Create reject button
          const rejectButton = document.createElement("a");
          rejectButton.classList.add(
            "waves-effect",
            "waves-light",
            "btn",
            "rejectappointment"
          );
          rejectButton.textContent = "Reject";

          // Add patient username
          const patientText = document.createTextNode(patient);
          listItem.appendChild(patientText);
          listItem.appendChild(acceptButton);
          listItem.appendChild(rejectButton);

          // Add list item to the collection
          document
            .querySelector("#appointmentContainer .collection")
            .appendChild(listItem);
        });
      }
    })
    .catch((error) => console.error("Error fetching session data:", error));
});
