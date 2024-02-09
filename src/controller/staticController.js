const router = require("express").Router();
//controller woprk with services


router.get("/", (req, res) => {
    res.send("home")
})
module.exports = router