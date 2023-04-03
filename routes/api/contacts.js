const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contactsBase");
const {
  registerUser,
  loginUser,
  logoutUser,
  currentUser,
  userSubscription,
} = require("../../controllers/user");
const checkTokenMiddleware = require("../../middlewares/avtorization");
const validationMiddleWare = require("../../middlewares/validation");

const router = express.Router();

router.get("/", listContacts);

router.get("/:contactId", getContactById);

router.post("/", addContact);

router.post("/users/register", registerUser);

router.delete("/:contactId", removeContact);

router.put("/:contactId", updateContact);

router.patch("/:contactId/favorite", updateStatusContact);

router.post("/users/login", validationMiddleWare, loginUser);

router.post("/users/logout", checkTokenMiddleware, logoutUser);

router.get("/users/current", checkTokenMiddleware, currentUser);

router.patch("/users", checkTokenMiddleware, userSubscription);

module.exports = router;

module.exports = router;
