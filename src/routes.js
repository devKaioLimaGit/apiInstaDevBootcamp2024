const {Router} = require("express");
const routes = new Router();

routes.get("/health", (req,res)=>{
    return res.status(200).json({message: "Connected with in port 3000!"})
});


module.exports = routes;