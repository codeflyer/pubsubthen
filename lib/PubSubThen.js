var Q = require('q');
var Listener = require('./Listener');

var PubSubThen = function() {
    var _listeners = {};

    return {
        /**
         * Exec a full reset of the PubSubThen
         */
        reset : function() {
            _listeners = {};
        },

        /**
         * Remove all subscription related to a message
         * @param {string} message
         * @param {boolean} removeKey if true remove the key
         */
        removeAllSubscription : function(message, removeKey) {
            if(_listeners[message] == null || _listeners[message].count() === 0) {
                if(removeKey !== true) {
                    _listeners[message] = [];
                } else {
                    delete _listeners[message];
                }
            }
        },

        /**
         * Get the list of messages
         * @return {Array<string>}
         */
        getMessages : function() {
            return  Object.keys(_listeners);
        },

        /**
         * Publish a message
         * @param message
         * @return {*}
         */
        publish : function(message) {
            var deferred = Q.defer();
            if(arguments.length === 0) {
                deferred.reject(new Error('Message not defined'));
            } else if(typeof arguments[0] !== 'string') {
                return deferred.reject(new Error('First argument must be a string'));
            } else if(_listeners[message] == null || _listeners[message].count() === 0) {
                deferred.resolve();
            } else {
                var argumentList = [];
                for(var key in arguments) {
                    if(key > 0) {
                        argumentList.push(arguments[key]);
                    }
                }
                _listeners[message].exec(argumentList, function() {
                    deferred.resolve();
                });
            }

            return deferred.promise;
        },

        /**
         * Subscribe to a message
         * @param message
         * @param callback
         * @return {*}
         */
        subscribe : function(message, callback) {
            if(_listeners[message] == null) {
                _listeners[message] = new Listener();
            }
            return _listeners[message].add(callback);
        },

        /**
         * Unsubscribe from a message
         * @param message
         * @param callback
         */
        unsubscribe : function(message, callback) {
            if(_listeners[message] == null) {
                return;
            }
            _listeners[message].remove(callback);
        }
    };
}();

module.exports = PubSubThen;
