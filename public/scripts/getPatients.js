$(document).ready(function () {
  // Fetch the list of patients from the server
  $.ajax({
    url: "/getPatients", // Endpoint to retrieve patients data from server
    method: "GET",
    dataType: "json",
    success: function (response) {
      // Clear existing list of patients
      $(".patients-list").empty();

      // Check if the response was successful
      if (response.success) {
        // Check if any patients were found
        if (response.patients.length > 0) {
          // Append each patient to the list
          response.patients.forEach(function (patient) {
            $(".patients-list").append("<li>" + patient.username + "</li>");
          });
        } else {
          // Display message when no patients are found
          $(".patients-list").append("<li>No patients found</li>");
        }
      } else {
        // Display error message if the response was not successful
        console.error("Error fetching patients:", response.message);
      }
    },
    error: function (xhr, status, error) {
      console.error("Error fetching patients:", error);
    },
  });
});
