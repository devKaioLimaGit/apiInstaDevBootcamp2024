const {Router} = require("express");
const schemaValidator = require("./apps/middlewares/schemaValidator")
const AuthenticationController = require("./apps/controllers/AuthenticationController")
const UserController = require("./apps/controllers/UsersController");
const userSchema = require("./schemas/create.user.schema.json")
const routes = new Router();


routes.post("/users", schemaValidator(userSchema) , UserController.create);

routes.post("/auth", AuthenticationController.authenticate)

routes.get("/health", (req,res)=>{
    return res.status(200).json({message: "Connected with in port 3000!"})
});


module.exports = routes;