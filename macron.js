/*
Project Name: macron
may change to underscore.nested
*/

(function () {
  // Establish the root object, `window` in the browser, or `global` on the server.
  var root = this;
    
  //There are many untility libraries, but this one we depend on.
  //With out it we are nothing, with out us... well you get the picture
  if (root._ === undefined || root._.mixin == undefined) return;

  // Save the previous value of the `_` variable.
  var _clone = _.clone(_);
  
  _.macron  = '0.0.1';

  //Regex to detect when we want to run nested functions
  var nestedPropRegex = /([^\.]+\.)[^\.]+/;
  //Get return a function to get the nested value from an object based on
  //the property chain provided.
  var ferrit = function (propChain) {
    var splitProps = propChain.split('.');
    return function (obj) {
      return _.reduce(splitProps, function (m, d, i) {
        return d in m ? m[d] : undefined;
      }, obj);
    };
  };
  
  var ext = {
    //## pluck
    pluck: function (list, propChain) {
      var f = ferrit(propChain);
      return _.map(list, function (d) { return f(d); });
    },
    //## max
    max: function (list, prop) {
      var f = function (i) { return i; };
      if (prop !== undefined) f = ferrit(prop);
      return _.reduce(list, function (m, v) {
        var n = f(v);
        return n > m ? n : m;
      }, -Infinity);
    },
    //## min
    min: function (list, prop) {
      var f = function (i) { return i; };
      if (prop !== undefined) f = ferrit(prop);
      return _.reduce(list, function (m, v) {
        var n = f(v);
        return n < m ? n : m;
      }, Infinity);
    },
    //## sum
    sum: function (list, prop) {
      var f = function (i) { return i; };
      if (prop !== undefined) f = ferrit(prop);
      return _.reduce(list, function (m, i) { return m + f(i); }, 0);
    },
    //## sortBy
    sortBy: function (list) {
      //Return a function to sort based on the function passed
      var sortWith = function(f){
        return function (a, b) {
          if(f(a) > f(b)) return 1;
          if(f(a) < f(b)) return -1;
          return 0;
        };
      };
      
      //Create a list of functions to sort by
      //based on a list of nested properties and/or functions
      var sortList = _.chain(arguments)
        .last(arguments.length-1)
        .map(function (d) {
          return sortWith(_.isFunction(d) ? d : ferrit(d));
        })
        .value();
      
      //Return a sorted list sorted by our sorting list
      return _.clone(list).sort(function (a, b) {
        return _.reduce(sortList, function (m, d, i) {
          return m !== 0 ? m : d(a, b);
        }, 0);
      }); 
    },
    groupBy: function (list, gpBy) {
      var f = gpBy;
      if (!_.isFunction(f)) f = ferrit(gpBy);
      return _.reduce(list, function (m, i) {
        var key = f(i);
        if (m[key] === undefined) m[key] = [];
        m[key].push(i);
        return m;
      }, {});
    },
    indexBy: function (list, gpBy) {
      var f = gpBy;
      if (!_.isFunction(f)) f = ferrit(gpBy);
      return _.reduce(list, function (m, i) {
        m[f(i)] = i;
        return m;
      }, {});
    },
    countBy: function (list, gpBy) {
      var f = gpBy;
      if (!_.isFunction(f)) f = ferrit(gpBy);
      return _.reduce(list, function (m, i) {
        var key = f(i);
        if (m[key] === undefined) m[key] = 0;
        ++m[key];
        return m;
      }, {});
    },
  };
  
  root._.mixin(ext);
  
}).call(this);