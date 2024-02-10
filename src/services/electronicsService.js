const Electronics = require("../models/Electronics")


exports.createProduct = (body) => { return Electronics.create(body) }

exports.getAllProducts = () => { return Electronics.find() }

exports.getOneProduct = (id) => { return Electronics.findById(id) }

exports.updateProduct = (id, body) => { return Electronics.findByIdAndUpdate(id, body, { runValidators: true }) }