var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');
var morgan = require('morgan');
var app = express();
var PORT = 7576;
var mongoose = require('mongoose');
var Stock = require('../models/stocks');

mongoose.connect('mongodb://drodriguez:j071312d@ds137271.mlab.com:37271/stocksmarket')



app.use(morgan('dev'));
app.use(express.static('stocksClient'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/stocks', function(req, res){
  const stockObj = new Stock ({
      stockName: req.body.stockName ,
      stockSymbol:req.body.stockSymbol,
      stockPrice:req.body.stockPrice,
     stockDate:req.body.stockDate
  });
  stockObj.save((err) => {
      if (err) {
          res.send(err);
      }
      res.json({message:'Stock created'});
  });
});

app.get('/stocks', function(req, res){
    stock.find((err, stocks) => {
        if (err) {
            res.send(err);
        }
        res.send(stocks);
    });
});

app.get('/stocks/:id', function(req, res){
  var stock = _.find(stocks, {id:req.params.id});
  res.json(stock || {});
});

app.put('/stocks/:id', function(req, res){
 Stock.findById(req.params.id,(err, stock) => {
     if (err) {
         res.send();
     }
     if (req.body.stockName) {
         stock.stockName = req.body.stockName;
     }
     if (req.body.stockSymbol) {
         stock.stockSymbol = req.body.stockSymbol;
     }
     if (req.body.stockPrice) {
         stock.stockPrice= req.body.stockPrice;
     }
     if (req.body.stockDate) {
         stock.stockDate= req.body.stockDate;
     }


     stock.save((err) => {
         if (err) {
             res.send(err);
         }
         res.json({message:'Updated stock'})
     });
 });
});

app.delete('/stocks/:id', function(req, res){
  Stock.remove({_id: req.params.id}, (err,stock) => {
      if (err) {
          res.send(err);
      }

      res.json({message:'Deleted stock!'});
  });
});



app.listen(PORT);
