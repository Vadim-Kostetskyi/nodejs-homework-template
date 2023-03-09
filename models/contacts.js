const fs = require("fs/promises");
// const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.join(__dirname, "models", "contacts.json");

const listContacts = async () => {
  const contacts = fs.readFile(contactsPath, "utf-8");
  console.log(contacts);
};

const getContactById = async (contactId) => {};

const removeContact = async (contactId) => {};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

// function listContacts() {
//   fs.readFile(contactsPath, "utf-8")
//     .then((data) => {
//       const contacts = JSON.parse(data);
//       console.table(contacts);
//     })
//     .catch((err) => console.error(err));
// }

// function getContactById(contactId) {
//   fs.readFile(contactsPath, "utf-8")
//     .then((data) => {
//       const contacts = JSON.parse(data);
//       const contact = contacts.find((c) => c.id == contactId);

//       console.table(contact);
//     })
//     .catch((err) => console.error(err));
// }

// function addContact(name, email, phone) {
//   fs.readFile(contactsPath, "utf-8")
//     .then((data) => {
//       const contacts = JSON.parse(data);
//       const newContact = {
//         id: contacts.length + 1,
//         name,
//         email,
//         phone,
//       };
//       contacts.push(newContact);

//       fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
//         .then((data) => {
//           console.log(`Contact ${name} added successfully`);
//         })
//         .catch((err) => console.error(err));
//     })
//     .catch((err) => console.error(err));
// }

// function removeContact(contactId) {
//   fs.readFile(contactsPath, "utf-8")
//     .then((data) => {
//       let contacts = JSON.parse(data);
//       newContacts = contacts.filter((c) => {
//         return c.id != contactId;
//       });

//       fs.writeFile(contactsPath, JSON.stringify(newContacts))
//         .then(() => {
//           console.log(`Contact with ID ${contactId} removed successfully`);
//         })
//         .catch((err) => console.error(err));
//     })
//     .catch((err) => console.error(err));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
