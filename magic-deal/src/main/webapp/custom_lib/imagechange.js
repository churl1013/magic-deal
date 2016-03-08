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
      "width" : width*2,
      "height" : "100%",
      "position" : "absolute",
      "-webkit-filter" : "grayscale(30%) opacity(95%)",
      "filter" : "grayscale(30%) opacity(90%)"
    }).appendTo(boxs);
  })();

  this.initImg = function(imgs) {
	var width = parseInt($(".imgChangeBox").css("width"));
	var height = parseInt($(".imgChangeBox").css("height"));
    if(imgs&&imgs.length==boxs.length) {
      Array.prototype.forEach.call(boxs, function(data, idx){
        var imgBox = $("<img src='"+imgs[idx]+"' />").css({
          width : width,
          height : height
        });
        $(data).find("#view_port").append(imgBox);
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
    var imgBox = $("<img src='"+img+"' />").css({
      width : width,
      height : height
    }).appendTo(view_port);

    view_port.animate({
      left : "-100%"
    },"1500",function() {
      $(this).find(">img:eq(0)").remove();
      $(this).css("left","0%");
    });
  }
}

$.prototype.imagechange = function(width, height) {
  var selectElement = this.selector;
  return new ImageChange(selectElement);
};
