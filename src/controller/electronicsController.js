const electronicsService = require("../services/electronicsService");
const { getErrorMessage } = require("../utils/errorUtils");

const router = require("express").Router();
//controller woprk with services

router.get("/catalog", (req, res) => {
    res.render("catalog", { layout: false })
})

router.get("/create", (req, res) => {
    res.render("create", { layout: false })
})

router.post("/create", async (req, res) => {
    try {
        req.body.owner = req.user.userId
        await electronicsService.createProduct(req.body)
        res.redirect("/catalog")
    } catch (error) {
        const errorMess = getErrorMessage(error);
        res.render("create", { layout: false, error: errorMess })
    }
})

module.exports = router