var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var Cart = require('../models/cart')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Sushi Monster' });
});
/* GET cart page. */
router.get('/shop', function(req, res, next) {
  Product.find(function(err, products){
    var productChunks = [];
    var chunkSize = 3;
    for (var i=0; i < products.length; i += chunkSize){
      productChunks.push(products.slice(i, i+ chunkSize));
    }
    res.render('shop/index', { title: 'Sushi Monster', products: productChunks});
  });
});

router.get('/add/:id', function (req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart.items : {});
  
  Product.findById(productId, function (err, product) {
      cart.add(product, product.id);
      req.session.cart = cart;
      res.redirect('/shop');
  });
});

router.get('/cart', function (req, res, next) {
  if (!req.session.cart) {
      return res.render('cart/index', {products: null});
  }
  var cart = new Cart(req.session.cart.items);
  res.render('cart/index', {products: cart.generateArray(), totalPrice: cart.totalPrice});
});
module.exports = router;
