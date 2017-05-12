const mongoose = require ('mongoose');


const StockSchema = new mongoose.Schema({
    stockName: {type: String },
    stockSymbol:{type: String},
    stockPrice:{type: Number },
    stockDate:{type:Date, default:Date.now}
});


module.exports = mongoose.model('stock',StockSchema);
