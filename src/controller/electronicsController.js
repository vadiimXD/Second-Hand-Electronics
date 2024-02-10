const { isAuth } = require("../middlewares/authMiddlewares");
const electronicsService = require("../services/electronicsService");
const { getErrorMessage } = require("../utils/errorUtils");

const router = require("express").Router();
//controller woprk with services

router.get("/catalog", async (req, res) => {
    try {
        const products = await electronicsService.getAllProducts().lean();
        res.render("catalog", { layout: false, products })
    } catch (error) {
        const errorMess = getErrorMessage(error)
        res.render("404", { layout: false, error: errorMess })
    }
})

router.get("/create", isAuth, (req, res) => {
    res.render("create", { layout: false })
})

router.post("/create", isAuth, async (req, res) => {
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