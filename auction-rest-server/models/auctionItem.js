var mongoose = require('mongoose');
var Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var itemSchema = new Schema({

    sellerName: {
        type: String,
        required: true
    },

    itemName: {
        type: String,
        required: true
    },

    itemAge: {
        type: String,
        required: true
    },

    itemStartPrice: {
        type: Currency,
        required: true
    },

    itemImmediatePrice: {
        type: Currency,
        required: true
    },

    startDate: {
        type: Date,
        required: false
    },

    endDate: {
        type: Date,
        required: true
    },

    itemDescription: {
        type: String,
        default: 'Нет описания'
    },

    itemImageFilename: {
        type: String,
        default: 'imagenotfound.png'
    },

    itemSold: {
        type: Boolean,
        default: false
    },

    itemCurrentPrice: {
        type: Currency,
        required: false
    },

    buyerName: {
        type: String,
        required: false
    }

}, {
    timestamps: true
});

var Items = mongoose.model('item', itemSchema);

module.exports = Items;
