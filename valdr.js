//
// valdr.js
// text element numeric value dragger
//

(function (global) {

  var valdr = global.valdr = {

    // valdr class 
    valdr: function (controlid, options) {

      if (typeof controlid === 'object') { 
        options = controlid; 
        controlid = options.controlid;
      }

      options = options || {};

      // text control element input type="text" or textarea 
      var 
        targetid = options.targetid || controlid,
        control = (controlid instanceof HTMLElement) ? controlid : document.getElementById(controlid),
        target = (targetid instanceof HTMLElement) ? targetid : document.getElementById(targetid),
        self = this;
      
      var 
        // default settings for integer, horizontal, [0,100]
        min = options.min || 0, 
        max = options.max || 100,
        snap = parseFloat(options.snap) || 1,
        dx = options.dx || snap, 
        dy = options.dy || 0;

      if (control.hasAttribute('data-dx')) dx = parseFloat(control.getAttribute('data-dx')) || dx;
      if (control.hasAttribute('data-dy')) dy = parseFloat(control.getAttribute('data-dy')) || dy;
      if (control.hasAttribute('data-min')) min = parseFloat(control.getAttribute('data-min')) || min;
      if (control.hasAttribute('data-max')) max = parseFloat(control.getAttribute('data-max')) || max;
      if (control.hasAttribute('data-snap')) snap = parseFloat(control.getAttribute('data-snap')) || snap;

      var 
        // array when active, null otherwise, beginning drag x, y position
        startPosition = null, 
        // starting value of element
        startValue, 
        //  1/snap must be an integer if snap < 1
        oneoversnap = (snap < 1) ? parseInt(1/snap) : 1/parseInt(snap);


      // helpers
      function snapValue (v) {

        var newval = parseFloat(v) || 0;
        newval = parseInt(Math.round(newval * oneoversnap));

        return Math.max(min, Math.min(max, newval / oneoversnap));
      }

      function getPositionValue (posdx, posdy) { 

        return startValue + (dx * posdx + dy * posdy);
      }

      function getCurrentValue () {

        return snapValue(control.value);
      };


      // event handlers
      function onMouseDown(e) {

        if (e.currentTarget !== target) return; // did't originate from target target

        startPosition = [e.clientX + global.pageXOffset, e.clientY + global.pageYOffset];
        startValue = getCurrentValue();

        global.addEventListener('mouseup', onMouseUp, false);
        global.addEventListener('mousemove', onMouseMove, false);
        e.stopPropagation();
        e.preventDefault();
      }
      
      function onMouseMove(e) {

        if (!startPosition) return;

        self.setValue(getPositionValue(
            e.clientX + global.pageXOffset - startPosition[0],
            e.clientY + global.pageYOffset - startPosition[1]
        )); 

        e.stopPropagation();
        e.preventDefault();
      }
      
      function onMouseUp(e) {

        startPosition = null;

        global.removeEventListener('mouseup', onMouseUp, false);
        global.removeEventListener('mousemove', onMouseMove, false);

        e.stopPropagation();
        e.preventDefault();
      }

      this.setValue = function (v) {

        control.value = snapValue(v) + '';
      };

      this.addSnap = function (v) { 

        this.setValue(getCurrentValue() + v * snap); 
      };
      
      // initialize
      this.setValue(options.value || target.value);

      target.addEventListener('mousedown', onMouseDown, false);

    },

    // create a valdr object
    create: function (input, options) {

      return new this.valdr(input, options);
    },

    // initialize all valdr elements
    init: function () {

      var nodes = document.getElementsByClassName('valdr');

      for (var i=0; i<nodes.length; i++) {
        var v = this.create(nodes[i]);
      }
    }

  }


})(this);
