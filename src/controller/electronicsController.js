const router = require("express").Router();
//controller woprk with services

router.get("/catalog", (req, res) => {
    res.render("catalog", { layout: false })
})
module.exports = router