$(document).ready(function () {
  // Fetch the list of doctors from the server
  $.ajax({
    url: "/getDoctors", // Endpoint to retrieve doctors data from server
    method: "GET",
    dataType: "json",
    success: function (response) {
      // Clear existing list of doctors
      $(".doctors-list").empty();

      // Check if the response was successful
      if (response.success) {
        // Check if any doctors were found
        if (response.doctors.length > 0) {
          // Append each doctor to the list
          response.doctors.forEach(function (doctor) {
            $(".doctors-list").append("<li>" + doctor.username + "</li>");
          });
        } else {
          // Display message when no doctors are found
          $(".doctors-list").append("<li>No doctors found</li>");
        }
      } else {
        // Display error message if the response was not successful
        console.error("Error fetching doctors:", response.message);
      }
    },
    error: function (xhr, status, error) {
      console.error("Error fetching doctors:", error);
    },
  });
});
