require('should');
var PubSubThen = require('../lib/PubSubThen');

describe("unsubscribe", function(done) {
    beforeEach(function() {
        PubSubThen.reset();
    });

    it("Unsubscribe to event and publish", function(done) {
        PubSubThen.subscribe('testSub', function(listToFill) {
            listToFill.push(1);
            var next = arguments[arguments.length - 1];
            next();
        });

        var sub2 = PubSubThen.subscribe('testSub', function(listToFill) {
            listToFill.push(2);
            var next = arguments[arguments.length - 1];
            next();
        });

        PubSubThen.subscribe('testSub', function(listToFill) {
            listToFill.push(3);
            var next = arguments[arguments.length - 1];
            next();
        });

        var list = [];

        PubSubThen.publish('testSub', list).then(
            function() {
                try {
                    list.should.be.eql([1, 2, 3]);
                    PubSubThen.unsubscribe('testSub', sub2);
                    var list2 = [];
                    PubSubThen.publish('testSub', list2).then(
                        function() {
                            try {
                                list2.should.be.eql([1, 2, 3]);
                                done();
                            } catch(e) {
                                done(e);
                            }
                        }
                    );
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