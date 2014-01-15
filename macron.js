/*
Project Name: macron
may change to underscore.nested
*/

(function () {
  // Establish the root object, `window` in the browser, or `global` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var _base = root._;
  
  //There are many untility libraries, but this one we depend on.
  //With out it we are nothing, with out us... well you get the picture
  if(root._ === undefined || root._.mixin == undefined) return;
  
  this._.macronVersion  = '0.0.1';

  //Regex to detect when we want to run nested functions
  var nestedPropRegex = /([^\.]+\.)[^\.]+/;
  //Get return a function to get the nested value from an object based on
  //the property chain provided.
  var ferrit = function(propChain) {
    return function (obj) {
      return _.reduce(propChain.split('.'), function (m, d, i) {
        return d in m ? m[d] : undefined;
      }, obj);
    };
  };
  
  var nestedExtentionFunctions = {
    pluck: function (list, propChain) {
      var f = ferrit(propChain);
      return _.map(list, function (d) { return f(d); });
    },
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
    }
  };
  
  _.mixin(nestedExtentionFunctions);
  
}).call(this);