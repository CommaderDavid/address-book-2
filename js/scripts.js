// Back end
// Business Logic for AddressBook ------------
function AddressBook() {
  this.contacts = [];
  this.currentId = 0;
}

// This new method (addContact), takes an (Contact) object as an argument
AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
  // It locates the (AddressBook) contacts array by calling (this.contacts)
  // Uses (.push()) to add the Contact provided as an argument to the (AddressBook) contacts array porperty
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  for (var i = 0; i < this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  for (var i = 0; i < this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber, personalEmail) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.personalEmail = personalEmail;
  this.address = [];
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

// Business Logic for Addresses
function Address(street, city, state) {
  this.street = street;
  this.city = city;
  this.state = state;
}

Address.prototype.fullAddress = function() {
  return this.street + ", " + this.city + ", " + this.state;
}

// User Interface Logic
var addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  var contactsList = $("ul#contacts");
  var htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
};

function showContact(contactId) {
  var contact = addressBook.findContact(contactId);
  $("#show-contact").fadeIn();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".personal-email").html(contact.personalEmail);
  if (contact.address.length > 0) {
    contact.address.forEach(function(part) {
      $(".main-address").html(part.street + ", " + part.city + ", " + part.state);
    })
  }
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + contact.id + ">Delete</button>");
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
};

$(document).ready(function() {
  attachContactListeners();
  // home address
  $("#home-address").click(function() {
    $("#add-info").append('<div class="home-address">' + '<h2>Home</h2>' +
                                '<div class="form-group">' +
                                  '<label for="home-street">Street</label>' +
                                  '<input type="text" class="form-control" id="home-street">' +
                                '</div>' +
                                '<div class="form-group">' +
                                  '<label for="home-city">City</label>' +
                                  '<input type="text" class="form-control" id="home-city">' +
                                '</div>' +
                                '<div class="form-group">' +
                                  '<label for="home-state">State</label>' +
                                  '<input type="text" class="form-control" id="home-state">' +
                                '</div>' +
                              '</div>');
  });
  // work address
  $("#work-address").click(function() {
    $("#add-info").append('<div class="work-address">' + '<h2>Work</h2>' +
                                '<div class="form-group">' +
                                  '<label for="work-street">Street</label>' +
                                  '<input type="text" class="form-control" id="work-street">' +
                                '</div>' +
                                '<div class="form-group">' +
                                  '<label for="work-city">City</label>' +
                                  '<input type="text" class="form-control" id="work-city">' +
                                '</div>' +
                                '<div class="form-group">' +
                                  '<label for="work-state">State</label>' +
                                  '<input type="text" class="form-control" id="work-state">' +
                                '</div>' +
                              '</div>');
  });
  // other address
  $("#other-address").click(function() {
    $("#add-info").append('<div class="other-address">' + '<h2>Other</h2>' +
                                '<div class="form-group">' +
                                  '<label for="other-street">Street</label>' +
                                  '<input type="text" class="form-control" id="other-street">' +
                                '</div>' +
                                '<div class="form-group">' +
                                  '<label for="other-city">City</label>' +
                                  '<input type="text" class="form-control" id="other-city">' +
                                '</div>' +
                                '<div class="form-group">' +
                                  '<label for="other-state">State</label>' +
                                  '<input type="text" class="form-control" id="other-state">' +
                                '</div>' +
                              '</div>');
  });
  $("form#new-contact").submit(function(e) {
    e.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var inputtedPersonalEmail = $("input#new-personal-email").val();
    // home address inputs
    var inputtedHomeStreet = $("input#home-street").val();
    var inputtedHomeCity = $("input#home-city").val();
    var inputtedHomeState = $("input#home-state").val();
    // work address inputs
    var inputtedWorkStreet = $("input#work-street").val();
    var inputtedWorkCity = $("input#work-city").val();
    var inputtedWorkState = $("inputwork-state").val();
    // other address inputs
    var inputtedOtherStreet = $("input#other-street").val();
    var inputtedOtherCity = $("input#other-city").val();
    var inputtedOtherState = $("input#other-state").val();

    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-personal-email").val("");
    // home address inputs
    $("input#home-street").val("");
    $("input#home-city").val("");
    $("input#home-state").val("");
    // work address inputs
    $("input#work-street").val("");
    $("input#work-city").val("");
    $("inputwork-state").val("");
    // other address inputs
    $("input#other-street").val("");
    $("input#other-city").val("");
    $("input#other-state").val("");

    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedPersonalEmail);
    var newAddress = new Address(inputtedStreet, inputtedCity, inputtedState);
    if (inputtedStreet != "" && inputtedCity != "" && inputtedState != "") {
      newContact.address.push(newAddress);
    }
    addressBook.addContact(newContact);
    console.log(addressBook);
    displayContactDetails(addressBook);
  })
})
