const Electronics = require("../models/Electronics")

exports.createProduct = (body) => { return Electronics.create(body) }

exports.getAllProducts = () => { return Electronics.find() }

exports.getOneProduct = (productId) => { return Electronics.findById(productId) }

exports.updateProduct = (productId, body) => { return Electronics.findByIdAndUpdate(productId, body, { runValidators: true }) }

exports.buyProduct = (productId, userId) => { return Electronics.findByIdAndUpdate(productId, { $push: { buyingList: userId } }) }

exports.checkIsBought = (boughtList, userId) => { return boughtList.filter(x => x._id == userId) }

exports.deleteProduct = (productId) => { return Electronics.findByIdAndDelete(productId) }