const jwt = require("jsonwebtoken");
const Users = require("../models/Users");
const { Op } = require("sequelize");

class AuthenticationController {
  async authenticate(req, res) {
    const { email, user_name, password } = req.body;

    const conditions = [];

    if (email) {
      conditions.push({ email: email });
    }

    if (user_name) {
      conditions.push({ user_name: user_name });
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

    const token = jwt.sign({ id, userName }, process.env.HASH_BCRYPT, {
      expiresIn: "1h",
    });

    return res
      .status(200)
      .json({ user: { id, user_name: userName }, token: token });
  }
}

module.exports = new AuthenticationController();
