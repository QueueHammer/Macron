# Macron

---

Macron is an extention to underscore.js that enhances some of the stock functions in some powerful but basic ways.

## Deep Inspection
The first is the addition of deep inspection for attributes. When using `_.pluck('attr')` your bound to only one level of depth.
Now, add the concept of deep inspection with 'attrOne.attrTwo.attrN' and  you now have a short hand for what would have require a map funciton.

## Object mock filtering
Sometimes just a string is not enough. A relation of properties nees to be expressed. This is done best with an mock object. This can be applied to other objects and used as a setensel to carve our properties or describe how a function should behave.

As the library reaches completeion all these concepts will be applied when they make useable sense.

A second note is that when the orignal signature is detected the orignal underscore.js function is used instead of the extention. In some cases this does not necessarily matter very much vs performing a check first but as of now thats the rule of thumb.

---

# Extended Functions
##pluck
`_.pluck(list, prop)`, `_(list).pluck(prop)`

The string for 'prop' can now describe nested properties e.g. 'pOne.pTwo.pThree'

    > _.pluck([{a:{b:1}},{a:{b:2}},{a:{b:3}}], 'a.b');  
    > [1, 2, 3]

##sortBy
`_.sortBy(list, first, second, nth)`, `_(list).sortBy(first, second, nth)`


sortBy now can use multiple functions for sorting. Additionally the function can be replaced with a string that describes a nested property. Event more additionally, they can be mixed in the parameters (you dont have one use only one).

    > _.sortBy([{a:{a:2, b:2}}, {a:{a:2, b:1}}, {a:{a:1, b:1}}], 'a.a', 'a.b')
    > [{a:{a:1, b:1}}, {a:{a:2, b:1}}, {a:{a:2, b:2}}]
    
