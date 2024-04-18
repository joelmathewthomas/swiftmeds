$(document).ready(function () {
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
                $("#availableDoctorsContainer .collection").append(
                  `<li class="collection-item">${doctor.username}<a id="consultDoctorButton" class="waves-effect waves-light btn">Consult</a></li>`
                );
              });
            } else {
              console.error("Failed to fetch doctors:", data.message);
            }
          })
          .catch((error) => {
            console.error("Error fetching doctors:", error);
          });
      }
    });
});
