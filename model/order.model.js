const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    products : [{
        productId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Product",
            required : true
        },
        quantity : {
            type : Number,
            required : true
        }
    }],
    totalPrice : {
        type : Number,
        required : true
    },
    status : {
        type : String,
        enum : ["Pending","Shipped","Delivered","Cancelled"],
        default : "Pending"
    },
    orderDate : {
        type : Date,
        default : Date.now
    },
    shippingAddress : {
        type : String,
        required : true
    },
    contactNumber : {
        type : String,
        required : true
    },
    // paymentMethod : {
    //     type : String,
    //     enum : ["Credit Card","Debit Card","Net Banking","Cash on Delivery"],
    //     required : true
    // },
    paymentStatus : {
        type : String,
        enum : ["Pending","Completed","Failed"],
        default : "Pending"
    }

});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;