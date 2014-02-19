(function() {
    /**
     * Crosshair constructor
     * @constructor
     * @augments Kinetic.Shape
     * @param {Object} config
     * @param {Object} config.innerGap
     * @param {Number} config.innerGapX
     * @param {Number} config.innerGapY
     * @param {Boolean} config.encircled
     * @@shapeParams
     * @@nodeParams
     * @example
     * var Crosshair = new Kinetic.Crosshair({<br>
     *   width: 50,<br>
     *   height: 70,<br>
     *   fill: 'red',<br>
     *   stroke: 'black',<br>
     *   strokeWidth: 5,<br>
     *   innerGap: {x: 5, y: 10},<br>
     *   encircled: true<br>
     * });
     */
    Kinetic.Crosshair = function(config) {
        this.___init(config);
    };

    Kinetic.Crosshair.prototype = {
        ___init: function(config) {
            // call super constructor
            Kinetic.Shape.call(this, config);
            this.className = 'Crosshair';
            this.drawFunc(this._drawFunc);
        },
        _drawFunc: function(context) {
			var width_over_2 = this.width() / 2;
	        var height_over_2 = this.height() / 2;
	        
	        context.beginPath();
	        context.moveTo(this.innerGapX(), 0);
	        context.lineTo(width_over_2, 0);
	        context.moveTo(-this.innerGapX(), 0);
	        context.lineTo(-width_over_2, 0);
	        context.moveTo(0, this.innerGapY());
	        context.lineTo(0, height_over_2);
	        context.moveTo(0, -this.innerGapY());
	        context.lineTo(0, -height_over_2);
	        
	        if (this.encircled()) {
	            var width_two_thirds = this.width() * 2 / 3;
	            context.moveTo(0, -height_over_2);
	            context.bezierCurveTo(width_two_thirds, -height_over_2, width_two_thirds, height_over_2, 0, height_over_2);
	            context.bezierCurveTo(-width_two_thirds, height_over_2, -width_two_thirds, -height_over_2, 0, -height_over_2);
	        }
	        
	        context.closePath();
	        context.fillStrokeShape(this);
        }
    };
    Kinetic.Util.extend(Kinetic.Crosshair, Kinetic.Shape);

    // add getters setters
    Kinetic.Factory.addComponentsGetterSetter(Kinetic.Crosshair, 'innerGap', ['x', 'y']);

    /**
     * get/set innerGap
     * @name innerGap
     * @param {Object} innerGap
     * @param {Number} innerGap.x
     * @param {Number} innerGap.y
     * @method
     * @memberof Kinetic.Crosshair.prototype
     * @returns {Object}
     * @example
     * // get innerGap<br>
     * var innerGap = node.innerGap();<br><br>
     *
     * // set innerGap <br>
     * shape.innerGap({<br>
     *   x: 2<br>
     *   y: 3<br>
     * });
     */

    Kinetic.Factory.addGetterSetter(Kinetic.Crosshair, 'innerGapX', 0);

    /**
     * get/set innerGap x
     * @name innerGapX
     * @param {Number} x
     * @method
     * @memberof Kinetic.Crosshair.prototype
     * @returns {Number}
     * @example
     * // get innerGap x<br>
     * var innerGapX = node.innerGapX();<br><br>
     *
     * // set innerGap x<br>
     * node.innerGapX(2);
     */

    Kinetic.Factory.addGetterSetter(Kinetic.Crosshair, 'innerGapY', 0);

    /**
     * get/set innerGap y
     * @name innerGapY
     * @param {Number} y
     * @method
     * @memberof Kinetic.Crosshair.prototype
     * @returns {Number}
     * @example
     * // get innerGap y<br>
     * var innerGapY = node.innerGapY();<br><br>
     *
     * // set innerGap y<br>
     * node.innerGapY(2);
     */
     
    Kinetic.Factory.addGetterSetter(Kinetic.Crosshair, 'encircled', false);

    /**
     * set encircled
     * @name setEncircled
     * @method
     * @memberof Kinetic.Crosshair.prototype
     * @param {Boolean}
     */

     /**
     * get encircled
     * @name getEncircled
     * @method
     * @memberof Kinetic.Crosshair.prototype
     * @returns {Boolean}
     */
})();
