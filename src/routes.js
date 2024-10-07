const {Router} = require("express");
const Users = require("./apps/models/Users");
const UserController = require("./apps/controllers/UsersController");
const routes = new Router();


routes.post("/users", UserController.create);

routes.get("/health", (req,res)=>{
    return res.status(200).json({message: "Connected with in port 3000!"})
});


module.exports = routes;