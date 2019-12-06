// Get references to page elements
var $firstName = $("#first-name");
var $lastName = $("#last-name");
var $dob = $("#pt-dob");
var $weight = $("#pt-weight");
var $height = $("#pt-height");
var $phone = $("#pt-phone");
var $email = $("#pt-email");
var $street = $("#pt-street");
var $city = $("#pt-city");
var $state = $("#pt-state");
var $zip = $("#pt-zip");
var $submitBtn = $("#submit");

// The API object contains methods for each kind of request we'll make
var API = {
  savePatient: function(patient) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/patients",
      data: JSON.stringify(patient)
    });
  },
  getPatients: function() {
    return $.ajax({
      url: "api/patients",
      type: "GET"
    });
  },
  deletePatient: function(id) {
    return $.ajax({
      url: "api/patients/" + id,
      type: "DELETE"
    });
  },
  updatePatient: function(id, updatedPatient) {
    return $.ajax({
      url: "api/patients/" + id,
      type: "PUT",
      data: updatedPatient
    });
  },
  getVisit: function(pid) {
    return $.ajax({
      url: "api/visits/" + pid,
      type: "GET"
    });
  }
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var patient = {
    firstname: $firstName.val().trim(),
    lastname: $lastName.val().trim(),
    dob: $dob.val().trim(),
    weight: $weight.val().trim(),
    height: $height.val().trim(),
    email: $email.val().trim(),
    phone: $phone.val().trim(),
    street: $street.val().trim(),
    city: $city.val().trim(),
    state: $state.val().trim(),
    zip: $zip.val().trim()
  };

  if (!(patient.firstname && patient.lastname)) {
    alert("You must enter a first and last name");
    return;
  }

  API.savePatient(patient).then(function() {
    $("#add-modal").modal("hide");
    $("#addAlert").modal("show");
  });

  //Resets fields to blanks
  $firstName.val("");
  $lastName.val("");
  $dob.val("");
  $weight.val("");
  $height.val("");
  $phone.val("");
  $email.val("");
  $street.val("");
  $city.val("");
  $state.val("");
  $zip.val("");
};

var handleDeleteBtnClick = function() {
  var idToDelete = $("#patient-id").val();

  console.log("idToDelete: " + idToDelete);

  API.deletePatient(idToDelete).then(function() {
    $("#patient-modal").modal("hide");
    $("#deleteAlert").modal("show");
  });
};

var handleUpdateBtnClick = function() {
  event.preventDefault();

  var idToUpdate = $("#patient-id").val();

  console.log("idToUpdate: " + idToUpdate);

  var $firstName = $("#first-name-e");
  var $lastName = $("#last-name-e");
  var $dob = $("#pt-dob-e");
  var $weight = $("#pt-weight-e");
  var $height = $("#pt-height-e");
  var $phone = $("#pt-phone-e");
  var $email = $("#pt-email-e");
  var $street = $("#pt-street-e");
  var $city = $("#pt-city-e");
  var $state = $("#pt-state-e");
  var $zip = $("#pt-zip-e");

  var updatedPatient = {
    firstname: $firstName.val().trim(),
    lastname: $lastName.val().trim(),
    dob: $dob.val().trim(),
    weight: $weight.val().trim(),
    height: $height.val().trim(),
    email: $email.val().trim(),
    phone: $phone.val().trim(),
    street: $street.val().trim(),
    city: $city.val().trim(),
    state: $state.val().trim(),
    zip: $zip.val().trim()
  };

  API.updatePatient(idToUpdate, updatedPatient).then(function() {
    $("#patient-modal").modal("hide");
    $("#updateAlert").modal("show");
  });
};

var handleVisitBtnClick = function() {
  event.preventDefault();

  var patientID = $("#patient-id").val();

  console.log("patientID: " + patientID);

  API.getVisit(patientID).then(function(dbVisit) {
    $("#patient-modal").modal("hide");
    $("#visit-body").empty();

    for (var i = 0; i < dbVisit.length; i++) {
      var date = dbVisit[i].date;
      var rx = dbVisit[i].rx;
      var symptoms = dbVisit[i].symptoms;
      var type = dbVisit[i].type;

      var card = $("<div>");
      card.addClass("card border-info mb-3 form-rounded m-3 width");

      var cardHeader = $("<div>");
      cardHeader.addClass("card-header form-rounded");
      cardHeader.text(" " + date);
      cardHeader.prepend(" <i class='far fa-calendar-alt'></i> ");

      var cardBody = $("<div>");
      cardBody.addClass("card-body");
      cardBody.attr("id", "visit-card");

      var title = $("<h5>");
      title.text("Visit Type: " + type);
      title.addClass("visit-type");

      var paragraph1 = $("<p>");
      paragraph1.text("Symptoms: " + symptoms);
      paragraph1.addClass("card-text");

      var paragraph2 = $("<p>");
      paragraph2.text("Medications Prescribed: " + rx);
      paragraph2.addClass("card-text");

      cardBody.append(title);
      cardBody.append(paragraph1);
      cardBody.append(paragraph2);
      card.append(cardHeader);
      card.append(cardBody);

      $("#visit-body").append(card);
    }
  });
};

var closeVisit = function() {
  $("#patient-modal").modal("show");
};

var closeUpdate = function() {
  location.reload();
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);

$(document).on("click", "#delete-btn", handleDeleteBtnClick);

$(document).on("click", "#update-btn", handleUpdateBtnClick);

$(document).on("click", "#visit-btn", handleVisitBtnClick);

$(document).on("click", "#visit-close", closeVisit);

$(document).on("click", "#close-update", closeUpdate);

$(document).ready(function() {
  var APIKey = "166a433c57516f51dfab1f7edaed8413";
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?" +
    "q=Philadelphia&units=imperial&appid=" +
    APIKey;

  // Here we run our AJAX call to the OpenWeatherMap API

  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // We store all of the retrieved data inside of an object called "response"
    .then(function(response) {
      var weatherIcon = response.weather[0].icon;
      var iconImg = $("<img>");

      iconImg.attr(
        "src",
        "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"
      );

      // Transfer content to HTML
      city = $("#city").html("<h4>" + response.name + "</h4>");
      city.addClass("text-center");
      temp = $("#temp").text(Math.floor(response.main.temp) + "º" + " F");
      minTemp = $("#minTemp").text(
        "Lowest: " + Math.floor(response.main.temp_min) + "º" + " F"
      );
      maxTemp = $("#maxTemp").text(
        "Highest: " + Math.floor(response.main.temp_max) + "º" + " F"
      );
      $("#icon").append(iconImg);
    });
});
