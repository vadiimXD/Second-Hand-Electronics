const Electronics = require("../models/Electronics")

exports.createProduct = (body) => { return Electronics.create(body) }

exports.getAllProducts = () => { return Electronics.find() }

exports.getOneProduct = (productId) => { return Electronics.findById(productId) }

exports.updateProduct = (productId, body) => { return Electronics.findByIdAndUpdate(productId, body, { runValidators: true }) }

exports.buyProduct = (productId, userId) => { return Electronics.findByIdAndUpdate(productId, { $push: { buyingList: userId } }) }

exports.checkIsBought = (boughtList, userId) => { return boughtList.filter(x => x._id == userId) }

exports.deleteProduct = (productId) => { return Electronics.findByIdAndDelete(productId) }

exports.searchProducts = async (name, type) => {
    const query = {}
    if (name) {
        const nameRegex = new RegExp('^' + name, 'i');
        query.name = { $regex: nameRegex }
    }

    if (type) {
        const typeRegex = new RegExp('^' + type, 'i');
        query.type = { $regex: typeRegex }
    }

    if (!name && !type) {
        return []
    }

    console.log(query)
    return await Electronics.find(query).lean()

}