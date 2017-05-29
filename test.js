var unirest = require('unirest');
var routeDict = {'4000370':'Weekend Blue'}
unirest.get("https://transloc-api-1-2.p.mashape.com/arrival-estimates.json?agencies=128&callback=call&stops=4096990%2C+4128614%2C+4096914")
    .header("X-Mashape-Key", "XSc0bTxuyGmshnwd9g5V1NH0OOEnp1FxrpojsnvS5NkMtVWP7g")
    .header("Accept", "application/json")
    .end(function(result) {
        var arrayLength = result.body.data.length;
        if (arrayLength > 0) {
            var arrivalTime = result.body.data[0].arrivals[0].arrival_at;
            var routeName = routeDict[result.body.data[0].arrivals[0].route_id];
            timeToArrival = Math.floor(Math.abs(new Date() - Date.parse(arrivalTime)) / 60000.0).toString();
            //console.log(result.status, result.headers, result.body);
            console.log('The ' + routeName + ' shuttle is arriving in ' + timeToArrival + ' minutes');
        } else {
            console.log('Sorry. There do not seem to be any shuttles arriving soon.');
        }
    });
