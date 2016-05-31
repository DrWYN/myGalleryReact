import React from 'react'

const ImageFigure = React.createClass({

	handleClick: function(e){
		if(this.props.arrange.isCenter){
			this.props.inverse();
		} else {
			this.props.center();
		}

		e.stopPropagation();
		e.preventDefault();
	},

	render: function () {

		let styleObj = {};

		//如果props中指定了图片位置，则使用
		if(this.props.arrange.pos){
			styleObj = this.props.arrange.pos;
		}

		//如果图片的旋转角度有值且不为0，添加旋转角度
		if (this.props.arrange.rotate) {
          (['MozTransform', 'msTransform', 'WebkitTransform', 'transform']).forEach(function (value) {
            styleObj[value] = 'rotate(' + this.props.arrange.rotate + 'deg)';
          }.bind(this));
      }

		//如果是居中图片，z-index设置为11
		if(this.props.arrange.isCenter){
			styleObj.zIndex = 11;
		}

		let imageFigureClassName = 'img-figure';
		imageFigureClassName += this.props.arrange.isInverse ? ' is-inverse' : '';

		return (
			<figure className={imageFigureClassName} style={styleObj} onClick={this.handleClick}>
				<img src={this.props.data.imageURL} alt={this.props.data.title}/>
				<figcaption>
					<h2 className="img-title">{this.props.data.title}</h2>
					<div className="img-back" onClick={this.handleClick}>
						<p>
							{this.props.data.desc}
						</p>
					</div>
				</figcaption>
			</figure>
		);
	}
})

export default ImageFigure;