async function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');

    // let stockRequest = await fetch(`https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1min&apikey=2abab5412d664b3ab3b733c32cc1d3e6`)
    // let stockText = await stockRequest.json()
    // console.log(stockText)

    // let GME = stockText.GME
    // let MSFT = stockText.MSFT
    // let DIS = stockText.DIS
    // let BNTX = stockText.BTNX

    // const stocks = [GME, MSFT, DIS, BNTX];
    // console.log(stocks)


    const { GME, MSFT, DIS, BNTX } = mockData;
    const stocks = [GME, MSFT, DIS, BNTX];
    console.log(stocks)

    function getColor(stock){
        if(stock === "GME"){
            return 'rgba(61, 161, 61, 0.7)'
        }
        if(stock === "MSFT"){
            return 'rgba(209, 4, 25, 0.7)'
        }
        if(stock === "DIS"){
            return 'rgba(18, 4, 209, 0.7)'
        }
        if(stock === "BNTX"){
            return 'rgba(166, 43, 158, 0.7)'
        }
    }
    
    stocks.forEach(stock => stock.values.reverse())

    // Time Chart
    let timeChart = new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: stocks[0].values.map(value => value.datetime),
            datasets: stocks.map( stock => ({
                label: stock.meta.symbol,
                data: stock.values.map(value => parseFloat(value.high)),
                backgroundColor:  getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol),
            }))
        }
    });
   
    
    // High Price Chart

    // get highest price
    
    function highestPriceData(stock) {
        let numbers = stock.values.map(value => parseFloat(value.high))
        let max = numbers[0];
        
        for (let i = 1; i < numbers.length; i++) {
            if (numbers[i] > max) {
                max = numbers[i];
            }
            
        }
        return max
    }
//  NEED TO REWRITE THE PREVIOUS CODE INTO A FUNCTION TO BE USED LIKE THE GET COLOR IS USED IN 
//  THE TIME CHART work backwards: make the function have the stocks.map(stock=>) on the outside of the function calland pass stock as a paramater
//  pass an array into the function and return the max


    let barChart = new Chart(highestPriceChartCanvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: stocks.map(stock => (stock.meta.symbol)),
            datasets: [{
                label: "Highest Price: ",
                data: stocks.map(stock => (highestPriceData(stock))),
                borderColor: stocks.map(stock => (getColor(stock.meta.symbol))),
                backgroundColor: stocks.map(stock => (getColor(stock.meta.symbol))),
            }],
        },
        options:{
            plugins:{
                legend:{
                    labels: {
                        boxWidth: 0
                    }
                }
            }
        }
            
    })
console.log(barChart.data)
}

main()