"use strict";
var React = require('react/addons');
require("./snakeBlock.css");

var UP = 1;
var DOWN = -1;
var LEFT = 2;
var RIGHT = -2; 


var SnakeBlock = React.createClass({

	getInitialState() {
		return {
			step: 20,
			direction: RIGHT,
			turns: [],
			top: 0,
			left: 0
		};
	},

	componentWillReceiveProps(nextProps) {
		if (this.state.direction != nextProps.direction) {
			this.changeDirection(nextProps.direction);
		}
		if (this.props.time != nextProps.time) {
			this.move();
		}
	},

	changeDirection(newDirection) {
		if (this.props.delay === 0) {
			this.setState({
				direction: newDirection
			});
		}
		else {
			this.state.turns.push({
				delay: this.props.delay,
				direction: newDirection
			});
			this.forceUpdate();
		}
	},

	crawlOneStep(direction) {
		switch(direction) {
			case UP: {
				this.setState({
					top: this.state.top - this.state.step
				});
				break;
			}
			case DOWN: {
				this.setState({
					top: this.state.top + this.state.step
				});
				break;
			}
			case LEFT: {
				this.setState({
					left: this.state.left - this.state.step
				});
				break;
			}
			case RIGHT: {
				this.setState({
					left: this.state.left + this.state.step
				});
				break;
			}
		}
	},

	move() {
		var newTurns = this.state.turns;
		if (newTurns.length  !== 0) {
			if (newTurns[0].delay === 0) {
				var newDirection = newTurns[0].direction;
				newTurns.shift();
				this.setState({
					direction: newDirection,
					turns: newTurns
				});
				this.crawlOneStep(newDirection);
			}
			else {
				newTurns[0].delay--;
				this.setState({
					turns: newTurns
				});
				this.crawlOneStep(this.state.sirection);
			}		
		}
		else {
			this.crawlOneStep(this.state.sirection);
		}
	},



	render() {
		var style = {
			top: this.state.top,
			left: this.state.left,
			width: this.state.step,
			height: this.state.step
		};
		var cx = React.addons.classSet;
		var classes = cx({
		    'snake-block': true,
		    'snake-block--head': this.props.isHead
		});
		return (<div className={classes} style={style}>
					
				</div> );
	}

});

module.exports = SnakeBlock;