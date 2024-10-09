const jwt = require("jsonwebtoken");
const Users = require("../models/Users");
const { Op } = require("sequelize");
const {encrypt} = require("../../utils/crypt")

class AuthenticationController {
  async authenticate(req, res) {
    const { email, user_name, password } = req.body;

    const conditions = [];

    if (email || user_name) {
        if (email) {
            conditions.push({ email: email });
        }
        if (user_name) {
            conditions.push({ user_name: user_name });
        }
    } else {
        return res.status(401).json({ error: "We need an email or username" });
    }

    const user = await Users.findOne({
      where: {
        [Op.or]: [conditions],
      },
    });

    if (!user) {
      return res.status(401).json({ error: "User not found!" });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: "Password does not match!" });
    }

    const { id, user_name: userName } = user;

    const idEncrypt = encrypt(id);

    const newId = `${idEncrypt.iv}: ${idEncrypt.content}`;


    const token = jwt.sign({ newId}, process.env.HASH_BCRYPT, {
      expiresIn: process.env.EXPIRE_IN,
    });

    return res
      .status(200)
      .json({ user: { id, user_name: userName }, token: token });
  }
}

module.exports = new AuthenticationController();
