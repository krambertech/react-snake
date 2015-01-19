"use strict";
var React = require("react");
var Canvas = require("./components/canvas.jsx");
require("./UI.css");

var UI = React.createClass({

	render: function() {
		return (<div className="snake-game"> 
					<Canvas />
				</div>);
	}
});

module.exports = UI;