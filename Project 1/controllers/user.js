const User = require("../models/users");

async function handleGetAllUsers(req, res) {
  const allDbUsers = await User.find({});
  return res.json(allDbUsers);
}

async function handleGetAllUsersById(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "user not found" });
  res.json(user);
}

async function handleUpdateUserById(req, res) {
  await User.findByIdAndUpdate(req.params.id, { lastName: "changed" });
  return res.json({ status: "success" });
}

async function handleDeleteUserById(req, res) {
  await user.findByIdAndDelete(req.parans.id);
  return res.json({ msg: "success" });
}

async function handleCreateNewUser(req, res) {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.job_title
  ) {
    res.status(400).json({ msg: "All fields are required" });
  }

  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    jobTitle: body.job_title,
  });
  console.log("result", result);
  return res.status(201).json({ msg: " success created", id: result._id });
}

module.exports = {
  handleGetAllUsers,
  handleGetAllUsersById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
};
