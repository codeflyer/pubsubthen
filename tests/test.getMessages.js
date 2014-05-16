require('should');
var PubSubThen = require('../lib/PubSubThen');

describe("getMessages", function(done) {
    beforeEach(function() {
        PubSubThen.reset();
    });

    it("Add some subscription and get messages", function() {
        PubSubThen.subscribe('testSub1', function(listToFill) {
            listToFill.push(1);
            var next = arguments[arguments.length - 1];
            next();
        });

        PubSubThen.subscribe('testSub2', function(listToFill) {
            listToFill.push(2);
            var next = arguments[arguments.length - 1];
            next();
        });

        PubSubThen.subscribe('testSub3', function(listToFill) {
            listToFill.push(3);
            var next = arguments[arguments.length - 1];
            next();
        });

        PubSubThen.getMessages().should.be.eql(['testSub1', 'testSub2', 'testSub3']);
    });
});