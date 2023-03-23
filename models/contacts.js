const { Contacts } = require("../db/models");

const listContacts = async () => {
  try {
    const contacts = await Contacts.find();
    console.log(Contacts.find());
    return { contacts };
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contact = await Contacts.findById(contactId);
    console.log(contactId);
    if (!contact) {
      throw new Error("Contact not found");
    }
    return contact;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const deleteContact = Contacts.findByIdAndDelete(contactId);
    return deleteContact;
  } catch (err) {
    console.log(err);
  }
};

const addContact = async ({ name, email, phone, favorite }) => {
  try {
    const newContact = new Contacts({ name, email, phone, favorite });
    await newContact.save();
    return newContact;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    console.log(contactId);
    console.log(body);
    const updatedContact = await Contacts.findByIdAndUpdate(contactId, body);
    return updatedContact;
  } catch (err) {
    console.log(err);
  }
};

const updateStatusContact = async (contactId, body) => {
  try {
    const contact = await Contacts.findByIdAndUpdate(contactId, body);
    if (contact) {
      if (body.hasOwnProperty("favorite")) {
        console.log(232323);
        contact.favorite = body.favorite;
        console.log(contact.favorite);
        console.log(body.favorite);
        return contact;
      } else {
        throw new Error("missing field favorite");
      }
    } else {
      throw new Error("Not found");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
