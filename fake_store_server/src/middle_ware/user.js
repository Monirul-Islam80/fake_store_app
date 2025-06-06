const {
  createUser,
  checkUser,
  updateUser,
} = require("../controllers/userController");

const isValidPassword = (password) =>
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/.test(password);
const isValidEmail = (email) =>
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
const createUserMiddleware = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name) return { status: "error", message: "User name can't be empty" };
  if (!isValidEmail(email))
    return { status: "error", message: "Invalid email." };

  if (!isValidPassword(password))
    return {
      status: "error",
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, and one digit. The minimum length of the password is 8 characters.",
    };
  const result = await createUser({ name, email, password });
  res.locals.result = result;
  res.locals.userID = result.id;
  next();
};

const checkUserMiddleware = async (req, res, next) => {
  const { email, password } = req.body;
  const result = await checkUser({ email, password });
  console.log("====================================");
  console.log(result);
  console.log("====================================");
  res.locals.result = result;
  res.locals.userID = result.id;
  next();
};

const updateUserMiddleware = async (req, res, next) => {
  const userID = res.locals.userID;
  const { name, password } = req.body;
  const result = await updateUser({ userID, name, password });
  if (result.status === "OK") {
    res.locals.result = result;
    return next();
  }
  res.json(result);
};

const sendResponse = (req, res) => {
  res.json(res.locals.result);
};

module.exports = {
  sendResponse,
  createUserMiddleware,
  checkUserMiddleware,
  updateUserMiddleware,
};
