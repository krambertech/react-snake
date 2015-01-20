"use strict";
var React = require("react");
require("./snake.css");

var SnakeBlock = require("./snakeBlock.jsx");

var Snake = React.createClass({

	getInitialState() {
		return {
			length: 5,
			positionTop: 0,
			positionLeft: 0,
		};
	},

	componentDidMount() {
		//this.grow();
	},

	componentWillReceiveProps(nextProps) {

		if (this.props.direction != nextProps.direction) {
			this.forceUpdate();
		}
		
	},

	/*componentDidUpdate() {
		var snakePosition = this.getSnakePosition();
		this.setState({
			positionTop: snakePosition.top,
			positionLeft: snakePosition.left
		});

		//console.log(snakePosition.top+" ; "+snakePosition.left);
	},*/

	grow() {
		this.state.body.push(<SnakeBlock isHead={false} 
										 step={this.props.step}
										 direction={this.props.direction} 
										 time={this.props.time} />);
		this.forceUpdate();
	},

	getSnakeBody() {
		var body = [];
		for (var i=0; i<this.state.length; i++) {
			body.push(<SnakeBlock isHead={false} 
								  step={this.props.step}
								  direction={this.props.direction}
								  time={this.props.time} 
								  index={i+1}/>);
		}
		return body;
	},

	getSnakePosition() {
		return this.refs.head.getBlockPosition();
	},

	render() {
		return (<div className="snake">
					<SnakeBlock ref="head" 
								isHead={true} 
								index={0}
								step={this.props.step}
								direction={this.props.direction}
								time={this.props.time} />
					{this.getSnakeBody()}
				</div> );
	}
});

module.exports = Snake;