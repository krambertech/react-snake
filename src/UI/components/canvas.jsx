"use strict";
var React = require("react");
var Snake = require("./snake.jsx");
require("./canvas.css");
var mousetrap = require("mousetrap");

var SCALE = 20;
var UP = 1;
var DOWN = -1;
var LEFT = 2;
var RIGHT = -2;

var Canvas = React.createClass({

	getInitialState() {
		return {
			score: 0,
			record: 0,
			size: 25,
			snakeX: 0,
			snakeY:0,
			snakeDirection: RIGHT,
			timer: {},
			time: 0
		};
	},
	
	componentDidMount() {
		mousetrap.bind(['up'], () => {
		    this.moveSnakeUp();
		    return false;
		});
		mousetrap.bind(['down'], () => {
		    this.moveSnakeDown();
		    return false;
		});
		mousetrap.bind(['left'], () => {
		    this.moveSnakeLeft();
		    return false;
		});
		mousetrap.bind(['right'], () => {
		    this.moveSnakeRight();
		    return false;
		});
		this.state.timer = setInterval(this.moveSnake, 200);

	},

	moveSnake() {
		this.setState({
			time: this.state.time + 1
		});
	},

	moveSnakeUp() {           //make one func instead of 4
		this.setState({
			snakeDirection: UP
		});
	},

	moveSnakeDown() {
		this.setState({
			snakeDirection: DOWN
		});
	},

	moveSnakeLeft() {
		this.setState({
			snakeDirection: LEFT
		});
	},

	moveSnakeRight() {
		this.setState({
			snakeDirection: RIGHT
		});
	},

	

	render() {
		var size = this.state.size;
		var style = {
		    width: size * SCALE,
		    height: size * SCALE
		};
		return (<div className="canvas" style={style} onKeyDown={this.moveSnake} tabindex="1">
					<Snake ref="snake" 
						   positionX={this.state.snakeX} 
						   positionY={this.state.snakeY} 
						   direction={this.state.snakeDirection}
						   step={SCALE} 
						   time={this.state.time} />
				</div> );
	}
});

module.exports = Canvas;