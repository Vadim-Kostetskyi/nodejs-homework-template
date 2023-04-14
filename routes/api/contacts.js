const express = require("express");
const multer = require("multer");

const router = express.Router();
const upload = multer({ dest: "../../tmp" });

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
  updateUserAvatar,
  verifyUser,
  reVariation,
} = require("../../controllers/user");

const checkTokenMiddleware = require("../../middlewares/avtorization");
const validationMiddleWare = require("../../middlewares/validation");

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

router.patch(
  "/users/avatars",
  checkTokenMiddleware,
  upload.single("avatar"),
  updateUserAvatar
);

router.get("/users/verify/:verificationToken", verifyUser);
router.post("/users/verify", reVariation);

module.exports = router;
