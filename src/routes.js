const router = require("express").Router();

//here need to be controllers for routing 
//EXAMPLE
const staticController = require("./controller/staticController")
const authController = require("./controller/authController")
const thirdController = require("./controller/test3Controller")


//app use routes

//EXAMPLE
router.use(staticController)
router.use(authController)
router.use(thirdController)


//for other all
router.all("*", (req, res) => {
    res.send("404")
})

module.exports = router