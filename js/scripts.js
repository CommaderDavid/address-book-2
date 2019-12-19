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
function Address(label, street, city, state) {
  this.label = label;
  this.street = street;
  this.city = city;
  this.state = state;
}

Address.prototype.fullAddress = function() {
  return this.label + "<br>" + this.street + ", " + this.city + ", " + this.state;
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
  $(".personal-email").html(contact.email);
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
  $("#add-address").click(function() {
    $("#add-info").append('<div class="new-address">' +
                                '<div class="form-group">' +
                                  '<label for="new-street">Street</label>' +
                                  '<input type="text" class="form-control" id="new-street">' +
                                '</div>' +
                                '<div class="form-group">' +
                                  '<label for="new-city">City</label>' +
                                  '<input type="text" class="form-control" id="new-city">' +
                                '</div>' +
                                '<div class="form-group">' +
                                  '<label for="new-state">State</label>' +
                                  '<input type="text" class="form-control" id="new-state">' +
                                '</div>' +
                              '</div>');
  });
  $("form#new-contact").submit(function(e) {
    e.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var inputtedPersonalEmail = $("input#new-personal-email").val();

    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-personal-email").val("");

    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedPersonalEmail);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  })
})
