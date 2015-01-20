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
		if ( this.directionIsChanged(nextProps.direction) ) {
			this.changeDirection(nextProps.direction);
		}
		if (this.props.time != nextProps.time) {
			this.move();
		}
	},

	getBlockPosition() {
		return {
			top: this.state.top,
			left: this.state.left
		};
	},

	directionIsChanged(newDirection) {
		var turns = this.state.turns;
		var last = this.state.turns.length-1;

		if ( ( !this.turnsAreEmpty() ) && (turns[last].direction != newDirection) ) {
			console.log("A i'm #" + this.props.index + " and my direction changed to " + newDirection);
			return true;
		}

		if ( ( this.turnsAreEmpty() ) && (this.state.direction != newDirection) ) {
			console.log("B i'm #" + this.props.index + " and my direction changed to " + newDirection);
			return true;
		}

		return false;
	},

	turnsAreEmpty() {
		return (this.state.turns.length  === 0) 
			   ? true
			   : false;
	},

	changeDirection(newDirection) {
		if (this.props.isHead) {
			this.setState({
				direction: newDirection
			});
		}
		else {
			console.log(this.props.index);
			this.state.turns.push({
				delay: this.props.index-1,
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

		if ( !this.turnsAreEmpty() ) {

			if (newTurns[0].delay === 0) {
				this.setState({
					direction: newTurns[0].direction
				});
				newTurns.shift();
			}

			for (var i=0; i<newTurns.length; i++) {
				newTurns[i].delay--;
			}
	
			this.setState({
				turns: newTurns
			});
		}

		this.crawlOneStep(this.state.direction);
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