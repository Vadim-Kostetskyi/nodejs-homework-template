const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:contactId", async (req, res) => {
  try {
    const contact = await getContactById(req.params.contactId);
    if (!contact) {
      res.status(404).json({ message: "Not found" });
    } else {
      res.json(contact);
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      res.status(400).json({ message: "missing required name field" });
    } else {
      const newContact = { name, email, phone };
      addContact(newContact);
      res.status(201).json(newContact);
    }
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const contact = await removeContact(req.params.contactId);
    if (!contact) {
      res.status(404).json({ message: "Not found" });
    } else {
      res.json({ message: "contact deleted" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      res.status(400).json({ message: "missing fields" });
    } else {
      const updatedContact = await updateContact(req.params.contactId, {
        name,
        email,
        phone,
      });
      if (!updatedContact) {
        res.status(404).json({ message: "Not found" });
      } else {
        res.json(updatedContact);
      }
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
