// Back end
// Business Logic for AddressBook ------------
function AddressBook() {
  this.contacts = [];
}

// This new method (addContact), takes an (Contact) object as an argument
AddressBook.prototype.addContact = function(contact) {
  // It locates the (AddressBook) contacts array by calling (this.contacts)
  this.contacts.push(contact);
  // Uses (.push()) to add the Contact provided as an argument to the (AddressBook) contacts array porperty
}

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}
