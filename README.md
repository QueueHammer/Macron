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
