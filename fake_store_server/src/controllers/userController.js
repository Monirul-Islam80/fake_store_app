const User = require("../models/user");
const bcrypt = require("bcryptjs");

const checkEmailTaken = async (email) => {
  const existingUser = await User.findOne({ email });
  return existingUser
    ? { status: "error", message: "The email is already used." }
    : { status: "OK" };
};

const createUser = async ({ name, email, password }) => {
  try {
    const check = await checkEmailTaken(email);
    if (check.status === "error") return check;

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    return { status: "OK", id: newUser._id, name, email };
  } catch (e) {
    console.error(`Error in createUser: ${e}`);
    return { status: "error", message: "Failed to insert user!" };
  }
};

const checkUser = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email });

    if (!user) return { status: "error", message: "Wrong email or password." };

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return { status: "error", message: "Wrong email or password." };
    console.log("====================================");
    console.log({ status: "OK", id: user._id, name: user.name, email });
    console.log("====================================");
    return { status: "OK", id: user._id, name: user.name, email };
  } catch (e) {
    console.error(`Error in checkUser: ${e}`);
    return { status: "error", message: "Failed to login user!" };
  }
};

const updateUser = async ({ uid, name, password }) => {
  try {
    if (!name || !password)
      return {
        status: "error",
        message: "New Name and Password can't be empty.",
      };

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(uid, { name, password: hashedPassword });

    return {
      status: "OK",
      message: "User name and password updated successfully.",
      name,
    };
  } catch (e) {
    console.error(`Error in updateUser: ${e}`);
    return { status: "error", message: "Failed to update user!" };
  }
};

const deleteUser = async ({ email }) => {
  try {
    const result = await User.deleteOne({ email });
    return { status: "OK", users: result };
  } catch (e) {
    console.error(`Error in deleteUser: ${e}`);
    return { status: "error", message: "Failed to delete user!" };
  }
};
module.exports = {
  createUser,
  checkUser,
  updateUser,
  deleteUser,
};
