const { isAuth } = require("../middlewares/authMiddlewares");
const electronicsService = require("../services/electronicsService");
const { getErrorMessage } = require("../utils/errorUtils");

const router = require("express").Router();

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

router.get("/details/:productId", async (req, res) => {
    try {
        const product = await electronicsService.getOneProduct(req.params.productId).lean();
        const isOwner = product.owner == req.user?.userId
        const isBought = electronicsService.checkIsBought(product.buyingList, req.user?.userId)
        res.render("details", { layout: false, product, isOwner, isBought })
    } catch (error) {
        const errorMess = getErrorMessage(error)
        res.render("404", { layout: false, error: errorMess })
    }
})

router.get("/edit/:productId", isAuth, async (req, res) => {
    try {
        const product = await electronicsService.getOneProduct(req.params.productId).lean();
        res.render("edit", { layout: false, product })
    } catch (error) {
        const errorMess = getErrorMessage(error)
        res.render("404", { layout: false, error: errorMess })
    }
})

router.post("/edit/:productId", async (req, res) => {
    try {
        await electronicsService.updateProduct(req.params.productId, req.body);
        res.redirect(`/details/${req.params.productId}`)
    } catch (error) {
        const errorMess = getErrorMessage(error)
        res.render("edit", { layout: false, product: req.body, error: errorMess })
    }
})

router.get("/buy/:productId", async (req, res) => {
    try {
        await electronicsService.buyProduct(req.params.productId, req.user.userId)
        res.redirect(`/details/${req.params.productId}`)
    } catch (error) {
        const errorMess = getErrorMessage(error)
        res.render("404", { layout: false, error: errorMess })
    }
})

module.exports = router