'use strict';

var Alexa = require('alexa-sdk');
var APP_ID = 'amzn1.ask.skill.8bd1926a-3cb3-43cb-8f90-1dda0a8d4fe5';
var unirest = require('unirest');
var routeDict = {'4000370':'Weekend Blue'}

var handlers = {
    'ArrivalTimeIntent': function() {
        var thisFunction = this;
        unirest.get("https://transloc-api-1-2.p.mashape.com/arrival-estimates.json?agencies=128&callback=call&stops=4096990%2C+4128614%2C+4096914")
            .header("X-Mashape-Key", "XSc0bTxuyGmshnwd9g5V1NH0OOEnp1FxrpojsnvS5NkMtVWP7g")
            .header("Accept", "application/json")
            .end(function(result) {
                var arrayLength = result.body.data.length;
                if (arrayLength > 0) {
                    var arrivalTime = result.body.data[0].arrivals[0].arrival_at;
                    var routeName = routeDict[result.body.data[0].arrivals[0].route_id] || "";
                    var timeToArrival = Math.floor(Math.abs(new Date() - Date.parse(arrivalTime)) / 60000.0).toString();
                    //console.log(result.status, result.headers, result.body);
                    thisFunction.emit(':tell', 'The ' + routeName + ' shuttle is arriving in ' + timeToArrival + ' minutes');
                } else {
                    thisFunction.emit(':tell', 'Sorry. There do not seem to be any shuttles arriving soon');
                }
            });
    },
    'Unhandled': function() {
        this.emit(':tell', 'Unhandled');
    },
};

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
