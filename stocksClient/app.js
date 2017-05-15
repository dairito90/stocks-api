var stockTemplate =
'<h3><%= stockName %></h3>' +
'<h3><%= stockSymbol %></h3>' +
'<h3><%= stockPrice %></h3>' ;



var stocks = [];

var makeTemplate = function (data) {
    // console.log(data);
    var li = document.createElement('li');
    var stockList = document.querySelector('.stock-list');
    var compiled = _.template(stockTemplate);
    var stockHtml = compiled(data);
    li.innerHTML = stockHtml;
    stockList.insertBefore(li, stockList.firstChild);
}

var updatedStockList = function(){
    var stockData = stocks[stocks.length-1];
    // console.log(stockData);
    makeTemplate(stockData);
}

var getValues = function() {
    var stockName = document.querySelector('input[name=stock-name]').value;
    var stockSymbol = document.querySelector('input[name=stock-symbol]').value;
    var stockPrice = document.querySelector('input[type=number]').value;




    document.querySelector('input[name=stock-name]').value = '';
    document.querySelector('input[name=stock-symbol]').value = '';
    document.querySelector('input[type=number]').value = '';



    return {
        stockName:  stockName ,
        stockSymbol: stockSymbol,
        stockPrice: stockPrice

    };

};





(function() {
    var form = document.querySelector('form');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        var values = getValues();
        // console.log(values);
        fetch('/stocks', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(values)
            })
            .then(function(resp) {
                return resp.json();

            })
            .then(function(createdStock) {
                console.log(createdStock);
                stocks.push(createdStock);


                updatedStockList();

            })
        return false;
    })
})();
