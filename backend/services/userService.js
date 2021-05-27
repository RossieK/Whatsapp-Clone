const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function register(data) {
  const {email, password} = {...data};

  let foundUserEmail = await User.findOne({email});

  if (foundUserEmail) {
    throw "The given email is already in use";
  }

  let salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
  let hash = await bcrypt.hash(password, salt);

  const user = new User({email, password: hash});
  return user.save();
}

function loginUponRegistration(user) {
  let token = jwt.sign({_id: user._id}, process.env.BCRYPT_SECRET);
  return token;
}

async function login({email, password}) {
  let user = await User.findOne({email});

  if (!user) {
    throw "Invalid credentials";
  }

  let passwordsMatch = await bcrypt.compare(password, user.password);

  if (!passwordsMatch) {
    throw "Invalid credentials";
  }

  let token = jwt.sign({_id: user._id}, process.env.BCRYPT_SECRET);

  return token;
}

function getUser(email) {
  return User.findOne({email}).lean();
}

module.exports = {
  register,
  loginUponRegistration,
  login,
  getUser,
};
