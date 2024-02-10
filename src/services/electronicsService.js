const Electronics = require("../models/Electronics")


exports.createProduct = (body) => {return Electronics.create(body)}