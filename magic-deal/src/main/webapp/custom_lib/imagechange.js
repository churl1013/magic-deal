/**
 * 이미지 체인지 - 
 * 반응형으로 변경
 * Ajax 처리로 변경
 * 
 * Option 
 * - 사진 효과 추가
 */


var ImageChange = function(ele){
  var boxs = $(ele+">.imgChangeBox");
  (function(){
    //초기화 작업
    //$(boxs).css("overflow", "hidden");

	var width = parseInt($(".imgChangeBox").css("width"));
	var height = parseInt($(".imgChangeBox").css("height"));
    $("<div id='view_port'></div>").css({
      "width" : width,
      "height" : "100%",
      "position" : "absolute",
    }).appendTo(boxs);
  })();

  this.initImg = function(imgs) {
	var width = parseInt($(".imgChangeBox").css("width"));
	var height = parseInt($(".imgChangeBox").css("height"));
    if(imgs&&imgs.length==boxs.length) {
      Array.prototype.forEach.call(boxs, function(data, idx){
        var newImg = new Image;
    	newImg.onload = (function(data) {
	    	var box = data;
    		return function() {
	    		var imgBox = $("<img />").attr("src", this.src);
	    		var iWidth = this.width;
	    		var iHeight = this.height;
	    		
	    		
	    		if(iWidth > iHeight) {
	    			var translateVal = height / iHeight;
	    			var translateWidth = iWidth * translateVal;
	    			var margin = Math.floor((width-translateWidth)/2);
	    			if(margin>0) {
	    				margin = 0;
	    				translateWidth = width;
	    			}
	    			imgBox.css({
	    				width : translateWidth,
	    				height : height,
	    				"margin-left" : margin
	    			});
	    		}else {
	    			var translateVal = width / iWidth;
	    			var translateHeight = iHeight * translateVal;
	    			var margin = Math.floor((height-translateHeight)/2);
	    			if(margin>0) {
	    				margin = 0;
	    				translateHeight = height;
	    			}
	    			imgBox.css({
	    				width : width,
	    				height : translateHeight,
	    				"margin-top" : margin
	    			});
	    		}
	    		
	    		$(box).find("#view_port").append(imgBox);
	    	}
    	})(data);
    	newImg.src = imgs[idx];
      });
    }
    else {
      throw new Error("not equals image size");
    }
  }

  this.changeImg = function(idx, img) {
	var width = parseInt($(".imgChangeBox").css("width"));
	var height = parseInt($(".imgChangeBox").css("height"));
    var view_port = $(boxs[idx]).find("#view_port");
    var new_view_port = $("<div id='view_port'></div>").css({
        "width" : width,
        "height" : "100%",
        "position" : "absolute",
        "opacity" : "0"
      }).appendTo(boxs[idx]);
    var newImg = new Image;
	newImg.onload = (function(data, beforeBox) {
    	var box = data;
    	var before = beforeBox;
		return function() {
			var imgBox = $("<img />").attr("src", this.src);
    		var iWidth = this.width;
    		var iHeight = this.height;
    		
    		
    		if(iWidth > iHeight) {
    			var translateVal = height / iHeight;
    			var translateWidth = iWidth * translateVal;
    			var margin = Math.floor((width-translateWidth)/2);
    			if(margin>0) {
    				margin = 0;
    				translateWidth = width;
    			}
    			imgBox.css({
    				width : translateWidth,
    				height : height,
    				"margin-left" : margin
    			});
    		}else {
    			var translateVal = width / iWidth;
    			var translateHeight = iHeight * translateVal;
    			var margin = Math.floor((height-translateHeight)/2);
    			if(margin>0) {
    				margin = 0;
    				translateHeight = height;
    			}
    			imgBox.css({
    				width : width,
    				height : translateHeight,
    				"margin-top" : margin
    			});
    		}
    		
    		$(box).append(imgBox);

    		before.animate({
    			opacity : "0"
    		},"1000",function() {
    			$(this).remove();
    			$(new_view_port).animate({
    				opacity : "1"
    			}, "1000");
    		});
    	}
	})(new_view_port, view_port);
	
	newImg.src = img;
  }
}

$.prototype.imagechange = function(width, height) {
  var selectElement = this.selector;
  return new ImageChange(selectElement);
};
