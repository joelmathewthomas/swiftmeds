$(document).ready(function () {
  // Fetch session data to determine user type
  fetch("/getSessionData")
    .then((response) => response.json())
    .then((data) => {
      if (data.type === "patient") {
        // Fetch the list of doctors from the server
        fetch("/getDoctors")
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              // Clear existing doctor list
              $("#availableDoctorsContainer .collection").empty();

              // Iterate through the array of doctors and append them to the list
              data.doctors.forEach((doctor) => {
                // Create a list item for each doctor with a consult button
                const listItem = `
                    <li class="collection-item">${doctor.username}
                      <a class="waves-effect waves-light btn consultbtn">Consult</a>
                    </li>`;
                // Append the list item to the container
                $("#availableDoctorsContainer .collection").append(listItem);
              });

              // Add event listener to the consult buttons
              $(".consultbtn").click(function () {
                // Get the doctor's name from the list item text
                const doctor = $(this).parent().text().trim();
                const doctorName = `${doctor}`;
                // Fetch session data to get the patient's name
                fetch("/getSessionData")
                  .then((response) => response.json())
                  .then((data) => {
                    if (data.username) {
                      const patientName = data.username;
                      // Emit a socket event to consult the doctor
                      socket.emit("consultdoctor", {
                        doctor: doctorName,
                        patient: patientName,
                      });
                    } else {
                      console.error(
                        "Failed to fetch patient name from session data"
                      );
                    }
                  })
                  .catch((error) => {
                    console.error("Error fetching session data:", error);
                  });
              });
            } else {
              console.error("Failed to fetch doctors:", data.message);
            }
          })
          .catch((error) => {
            console.error("Error fetching doctors:", error);
          });
      }
    })
    .catch((error) => {
      console.error("Error fetching session data:", error);
    });
});
