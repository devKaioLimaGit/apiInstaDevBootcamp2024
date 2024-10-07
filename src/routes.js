const {Router} = require("express");
const Users = require("./apps/models/Users");
const routes = new Router();


routes.get("/users", async (req,res)=>{
    const allUsers = await Users.findAll();
    return res.status(200).json({users: allUsers})
});

routes.get("/health", (req,res)=>{
    return res.status(200).json({message: "Connected with in port 3000!"})
});


module.exports = routes;