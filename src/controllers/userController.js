const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../models/user");
const SCERET_KEY = process.env.SCERET_KEY;

const register = async (req, res) => {
     /*
     1. Check Existing user
     2. Generate Hashed Password
     3. Create User
     4. Generate token
     Send response
     */
     const { username, password, email } = req.body;
     try {
          const userExists = await userModel.findOne({ email: email });

          if (userExists) {
               return res.status(400).json({ message: "User already exists." });
          }

          const hashPassword = await bcrypt.hash(password, 10);

          const result = await userModel.create({
               username: username,
               password: hashPassword,
               email: email
          });

          const token = await jwt.sign({ email: result.email, id: result._id }, SCERET_KEY);

          //sending response
          res.status(201).json({ user: result, token: token });
     } catch (error) {
          res.status(400).json({ message: "Some error occurred." });
     }

}

const login = async (req, res) => {
     /*
     1. Check User Exists
     2. if exists => validate/match password
     3. if matched => login user/token
     */
     const { email, password } = req.body;

     try {
          const userExists = await userModel.findOne({ email: email });
          if (!userExists) {
               return res.status(401).json({ message: "User doesn't exists." });
          }

          const matchPassword = await bcrypt.compare(password, userExists.password);
          if(!matchPassword) {
               return res.status(404).json({message: "Password doesn't match."});
          }

          const token = await jwt.sign({email: userExists.email, id: userExists._id}, SCERET_KEY);
          res.status(201).json({user: userExists, token: token});
     } catch (error) {
          res.status(400).json(error);
     }
}

module.exports = { register, login }