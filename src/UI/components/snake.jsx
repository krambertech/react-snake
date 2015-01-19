"use strict";
var React = require("react");
require("./snake.css");

var SnakeBlock = require("./snakeBlock.jsx");

var Snake = React.createClass({

	getInitialState() {
		return {
			length: 4,
			positionX: 0,
			positionY: 0,
		};
	},

	componentDidMount() {
		//this.grow();
	},

	componentWillReceiveProps(nextProps) {
		if (this.state.direction != nextProps.direction) {
			this.changeDirection(nextProps.direction);
		}
		if (this.props.time != nextProps.time) {
			console.log();
			this.move();
		}
	},

	grow() {
		this.state.body.push(<SnakeBlock isHead={false} 
										 step={this.props.step}
										 direction={this.props.direction} 
										 time={this.props.time} />);
		this.forceUpdate();
	},

	getSnakeBody() {
		var body = [];
		console.log(this.props.direction);
		for (var i=0; i<this.state.length; i++) {
			body.push(<SnakeBlock isHead={false} 
								  step={this.props.step}
								  direction={this.props.direction}
								  time={this.props.time}
								  delay={i} />);
		}
		return body;
	},

	render() {
		var style = {
			
		};
		return (<div className="snake" style={style}>
					<SnakeBlock ref="head" 
								isHead={true} 
								step={this.props.step}
								direction={this.props.direction}
								time={this.props.time} />
					{this.getSnakeBody()}
				</div> );
	}
});

module.exports = Snake;