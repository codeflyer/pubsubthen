# PubSubThen


[![Build Status](https://drone.io/github.com/codeflyer/pubsubthen/status.png)](https://drone.io/github.com/codeflyer/pubsubthen/latest)
[![GitHub version](https://badge.fury.io/gh/codeflyer%2Fpubsubthen.svg)](http://badge.fury.io/gh/codeflyer%2Fpubsubthen)

PubSubThen is a synchronous [publish/subscribe](http://en.wikipedia.org/wiki/Publish/subscribe) node.js module.

PubSubThen was developed for the purpose of complete separation of modules in node.js.

PubSubThen supports a synchronous topic publication.


## Getting PubSubThen

There are several ways of getting PubSubThen

* [Download a tagged version](https://github.com/codeflyer/pubsubthen/tags) from GitHub
* Install via npm (`npm install pub-sub-then`)

## Examples

### Basic example

```javascript
// Require
var PubSubThen = require('../lib/PubSubThen');

// Add a subscription to topic
PubSubThen.subscribe('my-message', function(arg1, arg2, next) {
    // Do something with arg1
    arg1.push('new value');
    // Do something with arg2
    arg2.push('new value 2');
    
    next();
});

// Publish the topic
var list1 = [];
var list2 = [];
PubSubThen.publish('my-message', list1, list2).then(
    function() {
        try {
            console.log(list1);
            console.log(list2);
        } catch(e) {
        }
    },
    function(err) {
        throw err;
    }
);
```

### Unsubscribe

```javascript
// Add a subscription to topic
var subscription = PubSubThen.subscribe('my-message', function(args, next) {
    // Do something 
    
    next();
});

PubSubThen.unsubscribe('my-message', subscription);
```

### Cancel all subscriptions for a message

```javascript
// Add a subscription to topic
PubSubThen.subscribe('my-message', function(args, next) {
    // FUNC 1
    next();
});

PubSubThen.subscribe('my-message', function(args, next) {
    // FUNC 2
    next();
});

PubSubThen.removeAllSubscription('my-message');
```


## More about Publish/Subscribe

* [The Many Faces of Publish/Subscribe](http://www.cs.ru.nl/~pieter/oss/manyfaces.pdf) (PDF)
* [Addy Osmani's mini book on Patterns](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#observerpatternjavascript)
* [Publish / Subscribe Systems, A summary of 'The Many Faces of Publish / Subscribe'](http://downloads.ohohlfeld.com/talks/hohlfeld_schroeder-publish_subscribe_systems-dsmware_eurecom2007.pdf)

## License

MIT: http://codeflyer.mit-license.org/
