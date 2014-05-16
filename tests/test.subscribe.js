require('should');
var PubSubThen = require('../lib/PubSubThen');

describe("Subscribe", function(done) {
    beforeEach(function() {
        PubSubThen.reset();
    });

    it("Subscribe to event and publish", function(done) {
        PubSubThen.subscribe('testSub', function(listToFill) {
            listToFill.push(1);
            var next = arguments[arguments.length - 1];
            next();
        });

        PubSubThen.subscribe('testSub', function(listToFill) {
            listToFill.push(2);
            var next = arguments[arguments.length - 1];
            next();
        });

        var list = [];

        PubSubThen.publish('testSub', list).then(
            function() {
                try {
                    list.should.be.eql([1, 2]);
                    done();
                } catch(e) {
                    done(e);
                }
            },
            function(err) {
                throw err;
            }
        );

    });
});