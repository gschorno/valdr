valdr - Value Dragger
=====================

experimenting over here, something very simple. This project is largely about learning my way around github.

valdr lets you click and drag on a numeric text control to change the value.

Use
---

using valdr looks like this:

```

<html>
<head>
<script type="text/javascript" src="valdr.js"></script>
</head>
<body>

<!-- set up some text inputs in html -->
<input type="text" id="valtest0" class="valdr" value="0"></input>

<input type="text" id="valtest1" class="valdr"></input>

<input type="text" id="valtest2" class="valdr" 
  data-min="-0.5" data-max="0.5" data-dx="0.01" data-snap="0.01">

<script>

  // initialize all elements of class 'valdr' with default or element data values like so -
  //valdr.init(); 


  // or customized
  var 

    // default parameters
    valdr0 = valdr.create('valtest0'),

    // different mouse target and text control
    valdr1 = valdr.create({ 
      controlid: 'valuetest1', 
      targetid: 'bigtarget', 
      min: -2, 
      max: 2, 
      snap: 0.001, 
      value: 1 
    }),

    // values from data items
    valdr2 = valdr.create('valtest2');  

</script>

</body>
</html>

```

Anyway, its entirely unfinished right now, maybe I'll work on it later.


