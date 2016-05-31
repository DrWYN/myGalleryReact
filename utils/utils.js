


export default{
	//为数组每一项添加imageURL属性
	addImageUrl: function (imageDatas) {
		imageDatas.map(function(item){
			item.imageURL = '../images/' + item.fileName;
		});
		return imageDatas;
	},
	
	//获取区间内的一个随机数
	getRangeRandom: function(low, high){
		return Math.ceil(Math.random() * (high - low) + low);
	},

	//获取 0~30 之间的一个任意正负值
	get30DegRandom: function(){
		return ((Math.random() > 0.5 ? '' : '-') + Math.ceil(Math.random() * 30));
	}
}