var async = require('async');

var Listener = function() {
    this.callbackList = [];
};

Listener.prototype.count = function() {
    return this.callbackList.length;
};

Listener.prototype.add = function(callback) {
    this.callbackList.push(callback);
};

Listener.prototype.remove = function(callbackToRemove) {
    var newArray = [];
    for(var i = 0, length = this.callbackList.length; i < length; i++) {
        if(callbackToRemove !== this.callbackList[i]) {
            newArray.push(this.callbackList[i]);
        }
    }
    this.callbackList = newArray;
};

Listener.prototype.exec = function() {
    var mainNext = arguments[1];
    var mainArgument = arguments[0];
    async.eachSeries(this.callbackList, function(currentCallback, next) {
            var currentArgs = mainArgument.slice(0);
            currentArgs.push(function(err) {
                next(err);
            });
            currentCallback.apply(null, currentArgs);
        },
        function(err) {
            mainNext(err);
        }
    );
};

module.exports = Listener;