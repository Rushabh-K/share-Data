const express = require("express");
const {
  handleGetAllUsers,
  handleGetAllUsersById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
} = require("../controllers/user");

const router = express.Router();

router.route("/").get(handleGetAllUsers).post(handleCreateNewUser);

router
  .route("/:id")
  .get(handleGetAllUsersById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);

module.exports = router;
