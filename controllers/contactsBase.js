const { Error } = require("mongoose");
const { Contacts } = require("../db/models");

const listContacts = async (req, res) => {
  const { page = 1, limit = 20, favorite } = req.query;
  const skipIndex = (page - 1) * limit;

  try {
    if (favorite) {
      const contacts = await Contacts.find({ favorite: favorite });
      res.status(200).json(contacts);
    } else {
      const contacts = await Contacts.find()
        .skip(skipIndex)
        .limit(parseInt(limit));
      res.status(200).json(contacts);
    }
  } catch (err) {
    console.log(err);
  }
};

const getContactById = async (req, res) => {
  try {
    const contact = await Contacts.findById(req.params.contactId);
    if (!contact) {
      res.status(404).json({ message: "Not found" });
    } else {
      res.json(contact);
    }
  } catch (err) {
    console.log(err);
  }
};

const addContact = async (req, res) => {
  try {
    const { name, email, phone, favorite } = req.body;
    if (!name || !email || !phone) {
      res.status(400).json({ message: "missing required name field" });
    } else {
      const newContact = new Contacts({ name, email, phone, favorite });
      await newContact.save();
      res.status(201).json(newContact);
    }
  } catch (err) {
    console.log(err);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const deleteContact = await Contacts.findByIdAndDelete(
      req.params.contactId
    );
    if (!deleteContact) {
      res.status(404).json({ message: "Not found" });
    } else {
      res.json({ message: "contact deleted" });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Contact not found" });
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      res.status(400).json({ message: "missing fields" });
    } else {
      const updatedContact = await Contacts.findByIdAndUpdate(
        req.params.contactId,
        {
          name,
          email,
          phone,
        }
      );

      if (!updatedContact) {
        res.status(404).json({ message: "Not found" });
      } else {
        res.json(updatedContact);
      }
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Contact not found" });
  }
};

const updateStatusContact = async (req, res) => {
  try {
    const contact = await Contacts.findByIdAndUpdate(
      req.params.contactId,
      req.body
    );
    if (contact) {
      if (req.body.hasOwnProperty("favorite")) {
        res.status(200).json(contact);
      } else {
        throw new Error("missing field favorite");
      }
    } else {
      throw new Error("Not found");
    }
  } catch (error) {
    if (error.message === "missing field favorite") {
      res.status(400).json({ message: "missing field favorite" });
    } else if (error.message === "Not found") {
      res.status(404).json({ message: "Not found" });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
};
