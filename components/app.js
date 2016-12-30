import React from 'react'
import ReactDOM from 'react-dom'

import Utils from '../utils/utils'
import imageDatasArr from '../data/imageDatas'
import ImageFigure from './imageFigure'
import ControllerUnit from './ControllerUnit'

import "../styles/main.scss"

let GalleryByReactApp = React.createClass({

  Constant: {
    centerPos: {
      left: 0,
      right: 0
    },
    hPosRange: {  //水平方向取值范围
      leftSecX: [0, 0],
      rightSecX: [0, 0],
      y: [0, 0]
    },
    vPosRange: {  //垂直方向取值范围
      topY: [0, 0],
      x: [0, 0]
    }
  },

  // 翻转图片
  inverse: function(index){
    return function(){
      let imgsArrangeArr = this.state.imgsArrangeArr;
      imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;
      this.setState({imgsArrangeArr: imgsArrangeArr});
    }.bind(this);
  },

  //居中对应的图片
  center: function(index){
    return function(){
      this.rearrange(index);
    }.bind(this);
  },

  //重新布局所有图片
  rearrange: function(centerIndex){
    let imgsArrangeArr = this.state.imgsArrangeArr,
        Constant = this.Constant,
        centerPos = Constant.centerPos,
        hPosRange = Constant.hPosRange,
        vPosRange = Constant.vPosRange,
        hPosRangeLeftSecX = hPosRange.leftSecX,
        hPosRangeRightSecX = hPosRange.rightSecX,
        hPosRangeY = hPosRange.y,
        vPosRangeTopY = vPosRange.topY,
        vPosRangeX = vPosRange.x,

        imgsArrangeTopArr = [],
        topImgNum = Math.floor(Math.random() * 2),  //取一个或者不取
        topImgSpliceIndex = 0,

        imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);

        //居中 centerIndex 的图片 ， 居中的图片不需要旋转
        imgsArrangeCenterArr[0] = {
          pos: centerPos,
          rotate: 0,
          isCenter: true
        };

        //取出要布局上侧的图片信息
        topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
        imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

        //布局位于上侧的图片
        imgsArrangeTopArr.forEach(function(value, index){
          imgsArrangeTopArr[index] = {
            pos: {
              top: Utils.getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
              left: Utils.getRangeRandom(vPosRangeX[0], vPosRangeX[1])
            },
            rotate: Utils.get30DegRandom(),
            isCenter: false
          }
        });

        //布局左右两侧的图片
        for(let i=0,j=imgsArrangeArr.length,k=j/2; i < j; i++){
          let hPosRangeLORX = null;

          //前半部分布局左边，后半部分布局右边
          if(i < k){
            hPosRangeLORX = hPosRangeLeftSecX;
          } else {
            hPosRangeLORX = hPosRangeRightSecX;
          }
          imgsArrangeArr[i] = {
            pos: {
              top: Utils.getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
              left: Utils.getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
            },
            rotate: Utils.get30DegRandom(),
            isCenter: false
          }
        }

        if(imgsArrangeTopArr && imgsArrangeTopArr[0]){
          imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
        }

        imgsArrangeArr.splice(centerIndex, 0 , imgsArrangeCenterArr[0]);

        this.setState({
          imgsArrangeArr: imgsArrangeArr
        })
  },

  getInitialState: function () {
    return {
      imgsArrangeArr: []
    };
  },

  componentDidMount: function(){
    //拿到舞台大小
    let stageDom = ReactDOM.findDOMNode(this.refs.stage);
    let stageW = stageDom.scrollWidth;
    let stageH = stageDom.scrollHeight;
    let halfStageW = Math.ceil(stageW/2);
    let halfStageH = Math.ceil(stageH/2);

    //拿到一个imageFigure的大小
    let imageFigureDom = ReactDOM.findDOMNode(this.refs.imgFigure0);
    // if(imageFigureDom){
      let imgW = imageFigureDom.scrollWidth;
      let imgH = imageFigureDom.scrollHeight;
      let halfImgW = Math.ceil(imgW/2);
      let halfImgH = Math.ceil(imgH/2);
    // }

    //中心图片位置
    this.Constant.centerPos = {
      left: halfStageW - halfImgW,
      top: halfStageH - halfImgH
    };

    //左侧，右侧区域图片排布位置取值范围
    this.Constant.hPosRange.leftSecX[0] = -halfImgW;
    this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;

    this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
    this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;

    this.Constant.hPosRange.y[0] = -halfImgH;
    this.Constant.hPosRange.y[1] = stageH - halfImgH;

    //上侧区域图片排布位置取值范围
    this.Constant.vPosRange.topY[0] = -halfImgH;
    this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;

    this.Constant.vPosRange.x[0] = halfStageW - imgW;
    this.Constant.vPosRange.x[1] = halfStageW;

    this.rearrange(0);

  },

  render: function(){
    let imageFigures = [];
    let controllerUnits = [];

    let imageDatas = Utils.addImageUrl(imageDatasArr);

       imageDatas.forEach(function (value, index) {

        if (!this.state.imgsArrangeArr[index]) {
            this.state.imgsArrangeArr[index] = {
                pos: {
                    left: 0,
                    top: 0
                },
                rotate: 0,
                isInverse: false,
                isCenter: false
            };
        }
        imageFigures.push(<ImageFigure key={index} data={value} ref={'imgFigure' + index} arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)} center={this.center(index)}/>);

        controllerUnits.push(<ControllerUnit key={index} arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)} center={this.center(index)}/>);
    }.bind(this));

    return (
        <section className="stage" ref="stage">
          <section className="img-sec">
            {imageFigures}
          </section>
          <nav className="controller-nav">
            {controllerUnits}
          </nav>
        </section>
      );
  }
})

ReactDOM.render(<GalleryByReactApp/>,document.getElementById('react'));
