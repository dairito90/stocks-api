const mongoose = require ('mongoose');


const StockSchema = new mongoose.Schema({
    stockName: {type: String },
    stockSymbol:{type: String},
    stockPrice:{type: Number },
    timeAndDateOfPrice:{type: Number },
    marketInstrument:{type: String },
    id: {type: String}
});


module.exports = mongoose.model('stock',StockSchema);
