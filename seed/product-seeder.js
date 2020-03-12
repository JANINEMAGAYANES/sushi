var Product = require('../models/product');
var mongoose = require('mongoose');

var products = [
  
new Product ({
    imagePath: 'https://www.hamazushi.com/en/images/nigiri/menu_Soy-Sauce-Marinated-Tuna.jpg',
    name: 'Soysauce Tuna',
    description: 'Available',
    price: 2
})]

function seedDB() {
        products.forEach(function(seed){
            Product.create(seed, function(err, product){
                if(err){
                    console.log(err);
                } else {
                    console.log("Added a product..");
                    product.save();
                            }
                        });
                }
          
        )
        }

function exit(){
    mongoose.disconnect();
}

module.exports = seedDB;