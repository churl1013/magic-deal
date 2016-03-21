/**
 * 	차트검색 관련 스크립트
 */

// 차트 그리기 관련 변수
var chartWrap = d3.select("#chartViewWrap");
var cWidth;
var cHeight;
var screenXPadding = 60;
var screenYPadding = 100;
var svg;
var firstDrawFlag;

// 데이터 정보 관련
var maxPrice;
var minPrice;
var maxDistance;
var minDistance;

//information Box 관련
var infoOpenFlag = false;

//중앙 버튼 관련
var extendBtnFlag = "all";
var distanceLimit = 10;

// 품질 적용 관련
var qualityApplyFlag = true;

//favorite 등록 및 Box 관련
var favorites = {
	length : 0
};

//filterlist 관련
var filterList = {
	length : 0	
};

// scale
var distanceScale;	// 거리 
var priceScale;		// 가격
var qualityScale;	// 품질
var color; //색상


var searchResultData;
var nodes;

svg = d3.select("#drawField");

var getQualityIdx = function(quality) {
	var qualityIdx = 0;
	if(quality == "A") {
		qualityIdx = 0;
	}else if(quality == "B") {
		qualityIdx = 1;
	}else if(quality == "C") {
		qualityIdx = 2;
	}else {
		qualityIdx = 3;
	}
	
	return qualityIdx;
};

var initChart = function(data) {
	$("#chartViewWrap").find(".node").remove();
	searchResultData = data;
	maxPrice = d3.max(data, function(d) {
		return d.price;
	});
	
	minPrice = d3.min(data, function(d) {
		return d.price;
	});
	maxDistance = d3.max(data, function(d) {
		return d.distance;
	});
	minDistance = d3.min(data, function(d) {
		return d.distance;
	});
	color = d3.scale.category20();
	
	priceScale = d3.scale.linear().domain([maxPrice, minPrice]).range([ screenYPadding, cHeight - screenYPadding ]);

	distanceScale = d3.scale.linear().domain([minDistance, maxDistance]).range([ screenXPadding, cWidth - screenXPadding ]);

	qualityScale = d3.scale.linear().domain([0, 1, 2, 3]).range(
			[ 90, 60, 40, 20 ]);

	nodes = chartWrap.selectAll("div").data(data).enter().append("div")
					.attr("class", "node circleNode")
					.style("width", function(d) {
						return qualityScale(getQualityIdx(d.quality)) + "px";
					})
					.style("background-image", function(d) {
						return "url('/magic-deal/upload/product/" + d.p_ph_path + "/thum_" + d.p_ph_name +"')";
					})
					.style("height", function(d) {
						var qualityIdx = 0;
						if(d.quality == "A") {
							qualityIdx = 0;
						}else if(d.quality == "B") {
							qualityIdx = 1;
						}else if(d.quality == "C") {
							qualityIdx = 2;
						}else {
							qualityIdx = 3;
						}
						return qualityScale(getQualityIdx(d.quality)) + "px";
					})
					.style("left", function(d) {
						return (cWidth / 2) - (qualityScale(getQualityIdx(d.quality)) / 2) + "px";
					})
					.style("top", function(d) {
						return (cHeight / 2) - (qualityScale(getQualityIdx(d.quality)) / 2) + "px";
					})
					.style("opacity", "0")
					.on("click", function(d) {
						d3.event.stopPropagation();
						nodeLeftClickEvt(d, this);
					})
					.on("contextmenu", function(d) {
						nodeRightClickEvt(d, this);
					});
	firstDrawFlag = true;
	$(".axisBox.allAxis").trigger("click");
};

// 왼쪽 마우스 이벤트
var nodeLeftClickEvt = function(d, obj) {
	inforBoxMaker(d);	
	var target = this;
	if(obj) {
		target = obj;
	}
	var left = parseFloat($(target).css("left"));
	var top = parseFloat($(target).css("top"));
	var size = parseInt($(target).css("width"));
	
	left = left+size/2 + $("#chartViewWrap").offset().left;
	top = top+size/2+$("#chartViewWrap").offset().top;
	
	var wW = $(window).width();
	var wH = $(window).height();
	
	if(left+300>=wW) {
		left = left-size/2-$("#chartViewWrap").offset().left;
	}
	if(top+200>=wH) {
		top = top-size/2-100-$("#chartViewWrap").offset().top;
	}
	
	$("#informationBox").css({
		left : left,
		top : top,
		display : "block",
		opacity : "0"
	}).animate({
		"opacity" : "1"
	}, "fast");
	infoOpenFlag = true;
	return false;
};

// 오른쪽 마우스 이벤트
var nodeRightClickEvt = function(d, obj) {
	var cnt;
	var bookMark = {};
	
	var target = this;
	
	if(obj) {
		target = obj;
	}
	favorites[d.pNo+""] = bookMark;
	bookMark.obj = target;
	favorites.length++;
	if(favorites.length==1) {
		$(".favorite-content-wrap>h1").css("z-index", -1);
	}
	d3.select(target).transition()
		   .ease("cubic-in-out")
		   .duration(500)
		   .style({
			   opacity : 0,
		   })
		   .each("end", function() {
			  d3.select(this).style("z-index", "-1");
		   });
	
	var newBoxtxt = "<div data-idx='"+d.pNo+"' class='favoriteBox'>";
	newBoxtxt += '<div class="blurring dimmable image">'
	newBoxtxt += '<div class="ui inverted dimmer">';
	newBoxtxt += '<div class="content">';
	newBoxtxt += '<div class="center">';
	newBoxtxt += '<div class="ui black icon button" onclick="modalOpen('+d.pNo+')"><i class="zoom icon"></i>Detail</div>';
	newBoxtxt += '</div>';
	newBoxtxt += '</div>';
	newBoxtxt += '</div>';
	newBoxtxt += "<img src='/magic-deal/upload/product/"+d.p_ph_path+"/thum_"+d.p_ph_name+"' class='favorite-img'/>";
	newBoxtxt += '<div class="ui inverted statistic">';
	newBoxtxt += '<div class="text value">';
	newBoxtxt += '<img src="/magic-deal/upload/profile/log_'+d.mPhoto+'" class="ui circular inline image"><br/>';
	newBoxtxt += comma(d.price)+"원";
	newBoxtxt += '</div><div class="label">';
	newBoxtxt += d.cateKeyword;
	newBoxtxt += '</div></div>';
	newBoxtxt += "</div></div>";
	
	var newBox = $(newBoxtxt);
	
	newBox.on("contextmenu", function() {
		var retId = $(this).attr("data-idx");
		var retObj = favorites[retId+""].obj;
		$(this).animate({
			"width" : "0",
			"height" : "0",
			"opacity" : "0"
		},400, function() {
			d3.select(retObj)
			  .style("z-index", "1")
			  .transition()
			  .ease("cubic-in-out")
			  .duration(500)
			  .style({
				 "opacity" : "1"
			  });
			
			$(this).remove();
			
			var widthCut = parseInt($(".favorite-content-wrap>div").css("width"))-260;

			favorites[retId+""].delete;
			favorites.length--;
			if(favorites.length == 0) {
				$(".favorite-content-wrap>h1").css("z-index", 0);
				$(".favorite-content-wrap>div").css("width", "20");
			}
			$(".favorite-content-wrap>div")
			   .animate({
				   "width": widthCut
			   }, function() {
				   if(favorites.length == 0) $(this).css("width", "20px");
			   });
		});
		
		var listArr = $("#filterList>.filterList-node");
		var i = 0;
		while(i<listArr.length) {
			var jObj = $(listArr[i++]);
			var fidx = jObj.attr("data-fidx");
			
			if(fidx == retId) {
				jObj.css("background-color", "#fff");
				break;
			}
		}
		
		return false;
	});
	
	$(".favorite-content-wrap>div")
				   .css("width", parseInt($(".favorite-content-wrap>div").css("width"))+260)
				   .prepend(newBox);
	
	$(".favoriteBox .image").dimmer({
		on: 'hover'
	});
	
	var tooltipTxt = "<div>";
	tooltipTxt += "<i class='spinner teal loading icon'></i>";
	tooltipTxt += "<span style='font-weight:bold; color:#6435c9;'>";
	tooltipTxt += "["+d.cateKeyword+"]"; 
	tooltipTxt += "</span>";
	tooltipTxt += "상품 북마크 이동 </div>"
	
	var tooltip = $(tooltipTxt);
	
	$("#favorite-tooltip-box").prepend(tooltip);
	
	tooltip.delay(2000).animate({
		opacity : 0,
		height : 0
	},500,function() {
		$(this).remove();
	});
	
	var listArr = $("#filterList>.filterList-node");
	var i = 0;
	while(i<listArr.length) {
		var jObj = $(listArr[i++]);
		var fidx = jObj.attr("data-fidx");
		
		if(fidx == d.pNo) {
			jObj.css("background-color", "#fbbd08");
			var fnd = filterList["f"+fidx];
			if(fnd.interval) {
				jObj.find(".addBox").trigger("click");
			}
			break;
		}
	}
	$("footer").css("bottom","-125px");
	setTimeout(function() {
		$("footer").css("bottom","-155px");
	}, 300);

	return false;
};

// 마우스 오버 이벤트
var focusNode = function(d, obj) {
	var target = this;
	if(obj) {
		target = obj;
	}
	var r = parseFloat($(target).css("width"))/2;
	var left = parseFloat($(target).css("left"))+r;
	var top = parseFloat($(target).css("top"))+r;
	
	svg.append("circle")
	   .attr("cx", left)
	   .attr("cy", top)
	   .attr("r", r)
	   .style({
		   "stroke" : "none",
		   "fill" : "#f2711c",
		   "fill-opacity" : "1"
	   })
	   .transition()
	   .ease("cubic-in-out")
	   .duration(800)
	   .attr("r", r+30)
	   .style("fill-opacity", "0.0")
	   .each("end", function() {
		   d3.select(this).remove();
	   });
};

//filterList에 목록 추가
var addfilterList = function(list) {
	list.each(function(d) {
		var nBox = $("<div class='filterList-node'></div>");
		var appendHtml = "<span class='addBox' data-chk='false'><i class='small icons'>";
		appendHtml += "<i class='cube inverted corner icon'></i>";
		appendHtml += "<i class='inverted corner add icon'></i>";
		appendHtml += "</i></span>";
		appendHtml += "&nbsp;&nbsp;" + d.cateKeyword;
		nBox.html(appendHtml);
		nBox.attr("data-fidx", d.pNo);
		$("#filterList").append(nBox);
		
		filterList["f"+d.pNo] = {};
		filterList["f"+d.pNo].obj = this;
		filterList["f"+d.pNo].box = nBox;
		filterList["f"+d.pNo].interval = null;
		
		filterList.length++;
		nBox.on("click", function() {
			var idx = $(this).attr("data-fidx");
			var obj = filterList["f"+d.pNo].obj;
			var d3Obj = d3.select(obj);
			d3Obj.each(function(d) {
				focusNode(d, obj);
				nodeLeftClickEvt(d, obj);
			});
			
		});
		
		$(nBox).on("contextmenu", function(event) {
			event.preventDefault();
			event.stopPropagation();
			
			var obj = filterList["f"+d.pNo].obj;
			var d3Obj = d3.select(obj);
			d3Obj.each(function(d) {
				nodeRightClickEvt(d, obj);
			});
		});
		
		$(nBox).find(".addBox").on("click", function() {
			var chkFlag = $(this).attr("data-chk");
			var idx = $(this).parent().attr("data-fidx");
			var filterObj = filterList["f"+idx];
			var chkico = "<i class='small icons'>";
			if(chkFlag == 'false') {
				$(this).css("background-color", "#fbbd08");
				chkico += "<i class='cube inverted corner icon'></i>";
				chkico += "<i class='inverted corner checkmark icon'></i>";
				$(this).attr("data-chk", "true");
				filterObj.interval = setInterval(function() {
					var obj = filterObj.obj;
					var d3Obj = d3.select(obj);
					d3Obj.each(function(d) {
						focusNode(d, obj);
					})
				}, 300);
			}else {
				$(this).css("background-color", "#666");
				chkico += "<i class='cube inverted corner icon'></i>";
				chkico += "<i class='inverted corner add icon'></i>";
				$(this).attr("data-chk", "false");
				clearInterval(filterObj.interval);
				filterObj.interval = null;
			}
			chkico += "</i>";
			$(this).html(chkico);
			return false;
		});
	});
};

// 화면전환 효과
var changeViewAni = function(d) {
	//모든 축을 지움
	$("#drawField").empty();
	svg.append("circle")
	   .attr("cx", cWidth/2)
	   .attr("cy", cHeight/2)
	   .attr("r", 0)
	   .style({
		   "stroke" : "none",
		   "fill" : "#111",
		   "fill-opacity" : "0.0"
	   })
	   .transition()
	   .ease("cubic-in-out")
	   .duration(400)
	   .attr("r", cWidth)
	   .style("fill-opacity", "0.9")
	   .transition()
	   .ease("cubic-in-out")
	   .duration(400)
	   .attr("r", 0)
	   .style("fill-opacity", "0.0")
	   .each("end", function() {
		   d3.select(this).remove();
	   });
}

// 중앙 이동 
var moveToCenterAll = function(flag) {
	changeViewAni();
	$("#filterList").empty();
	
	for(prop in filterList) {
		if(prop != 'length') {
			var fobj = filterList[prop];
			if(fobj.interval) {
				clearInterval(fobj.interval);
			}
		}
	}
	
	filterList = {
		length : 0
	};
	
	nodes.transition().ease("cubic-in-out").duration(300)
		 .style("left", function(d) {
			 if(flag)
				 return (cWidth / 2) - (qualityScale(getQualityIdx(d.quality)) / 2) + "px";
			 return (cWidth / 2) - 10 +"px";
		 })
		.style("top", function(d) {
			if(flag) 
				return (cHeight / 2) - (qualityScale(getQualityIdx(d.quality)) / 2) + "px";
			return (cHeight / 2) - 10 +"px";
		})
		.style("opacity", "0")
		.style("z-index", "-1");
}


// 모든 축
var allAxisDraw = function(delay) {
	// tick 그리기
	allAxisTick();
	// 노드 그리기
	nodes.transition().delay(delay)
		 .style("z-index", "1")
		 .style("width", function(d) {
			 return getCircleQualitySize(qualityApplyFlag, d);
		 })
		 .style("height", function(d) {
			 return getCircleQualitySize(qualityApplyFlag, d);
		 })
		 .transition().ease("cubic-in-out").duration(1000)
		 .style("opacity", 1)
		 .style("left", function(d) {
				return distanceScale(d.distance)
						- (qualityScale(getQualityIdx(d.quality)) / 2) + 20
						+ "px";
		 })
		 .style("top", function(d) {
				return priceScale(d.price)
						- (qualityScale(getQualityIdx(d.quality)) / 2)
						+ "px";
		 }).each("end", function() {
			 if(firstDrawFlag) {
				nodes.on("mouseover", function(d) {
					focusNode(d, this)
				});
				firstDrawFlag = false;
			}
		 });
	
	//축 그리기
	//x축
	svg.append("line")
	   .attr("x1", 30)
	   .attr("y1", cHeight-30)
	   .attr("x2", cWidth-30)
	   .attr("y2", cHeight-30)
	   .style({
		   "stroke" : "black",
		   "stroke-opacity" : "0",
		   "stroke-width" : "1",
	   })
	   .transition().ease("linear").duration(1000).delay(500)
	   .style({
		   "stroke-opacity" : "0.8"
	   });
	
	//y축
	svg.append("line")
	   .attr("x1", 30)
	   .attr("y1", 30)
	   .attr("x2", 30)
	   .attr("y2", cHeight-30)
	   .style({
		   "stroke" : "black",
		   "stroke-opacity" : "0",
		   "stroke-width" : "1",
	   })
	   .transition().ease("linear").duration(1000).delay(1000)
	   .style({
		   "stroke-opacity" : "0.8"
	   });
	
	svg.append("circle")
	   .attr("cx", 30)
	   .attr("cy", cHeight-30)
	   .attr("r", "10")
	   .style({
		   "fill" : "#fff",
		   "stroke" : "rgb(219, 40, 40)",
		   "stroke-width" : "3",
		   "stroke-opacity" : "0"
	   })
	   .transition().ease("linear").duration(1000).delay(300)
	   .style({
		   "stroke-opacity" : "0.8"
	   });
	
	svg.append("text")
	   .attr("x", cWidth-100)
	   .attr("y", cHeight-15)
	   .text("거리 멈")
	   .style({
		   "font-size" : "14",
		   "fill-opacity" : "0",
		   "fill" : "#222",
		   "font-weight" : "bold"
	   })
	   .transition().ease("linear").duration(1000).delay(300)
	   .style({
		  "fill-opacity" : "1" 
	   });
	
	svg.append("text")
	   .attr("x", 15)
	   .attr("y", 30)
	   .text("가격 비쌈")
	   .style({
		   "font-size" : "14",
		   "fill-opacity" : "0",
		   "fill" : "#222",
		   "font-weight" : "bold",
		   "writing-mode" : "tb"
	   })
	   .transition().ease("linear").duration(1000).delay(300)
	   .style({
		  "fill-opacity" : "1" 
	   });
		
	// filterList에 추가
	addfilterList(nodes);
};

var allAxisTick = function() {
	
}


// 거리 축만 적용 
var distanceAxisDraw = function(before, limit, delay) {
	// 화면 height에 따라 원의 반지름 비율변경
	// 최대 50km 까지 출력하므로 반지름 비율은 최대원일때 화면의 높이의 절반보다 작아야함
	var radianRate = (cHeight/2-40)/50;
	// 노드 그리기
	var filterNode;
	filterNode = nodes.filter(function(d) {
		var flag = Math.floor(d.distance)<=limit && Math.floor(d.distance)>before;
		return flag;
	});
	
	var angleGap = drawCircleAngle(filterNode[0].length);
	var angle = 0;
	filterNode.each(function(d) {
		angle += angleGap;
		var pos = getCirclePosition(cWidth/2, cHeight/2, limit*radianRate, angle);
		var node = d3.select(this);
		node.transition().delay(delay)
			.style("z-index", "1")
			.style("width", "20px")
			.style("height", "20px")
			.transition().ease("cubic-in-out").duration(800)
			.style("opacity", "1")
			.style("left", (pos.x-10)+"px")
			.style("top", (pos.y-10)+"px");
	});
	
	// 축 그리기
	svg.append("circle")
	   .attr("cx", cWidth/2)
	   .attr("cy", cHeight/2)
	   .attr("r", 0)
	   .style({
		   "fill" : "none",
		   "stroke" : "#222",
		   "stroke-width" : "2",
		   "stroke-opacity" : "0"
	   })
	   .transition()
	   .duration(1000)
	   .ease("cubic-in-out")
	   .attr("r", limit*radianRate)
	   .style("stroke-opacity", "0.1");
	
	// 라벨 그리기
	svg.append("text")
	   .attr("x", cWidth/2 + (limit*radianRate+30))
	   .attr("y", (cHeight/2))
	   .style({
		   "fill" : "#888",
		   "font-size" : "14",
		   "fill-opacity" : "0",
		   "font-weight" : "bold",
		   "text-anchor" : "middle"
	   })
	   .text(limit + "km")
	   .transition()
	   .duration(500).delay(500)
	   .ease("cubic-in-out")
	   .style("fill-opacity", "1");
	
	// filterList에 추가
	addfilterList(filterNode);
}

// 원 방정식
var getCirclePosition = function(a, b, r, t) {
	t = t * (Math.PI / 180);
	var x = a + r * Math.cos(t);
	var y = b + r * Math.sin(t);
	return {x:x, y:y};
};

// 갯수에 따라 위치해야할 각도
var drawCircleAngle = function(count) {
	return 360/count;
}
// 거리축 관련함수 끝



$("#extendBtn").on("click",	function(event) {
	event.stopPropagation();
	event.preventDefault();
	if(infoOpenFlag) $("#popup-close-btn").trigger("click");
	
	if(extendBtnFlag === 'distance') {
		if(distanceLimit <= 40) {
			distanceAxisDraw(distanceLimit, distanceLimit+10, 0);
			distanceLimit += 10;
		}
	}
});

// 가격축만 적용
var priceAxisDraw = function() {
	var avr = getPriceAverage();
	var greateNodes;
	var lessNodes;
	
	greateNodes = nodes.filter(function(d) {
		return d.price >= avr;
	});
	
	lessNodes = nodes.filter(function(d) {
		return d.price < avr;
	})
	
	var left = 150;
	var leftGap = (cWidth-200)/greateNodes[0].length;
	var size = 30;
	if(leftGap < size) {
		size = leftGap;
	}
	greateNodes.each(function(d, i) {
		var node = d3.select(this);
		node.transition().delay(500)
			.style("z-index", "1")
			.style("height", size+"px")
			.style("width", size+"px")
			.transition().ease("cubic-in-out").duration(800)
			.style("left", (left+leftGap*i)+"px")
			.style("top", priceScale(d.price)+"px")
			.style("opacity", "1");
		
		svg.append("rect")
		   .attr("class", "rectBar")
		   .attr("x", (left+leftGap*i))
		   .attr("y", priceScale(avr))
		   .attr("width", size+"px")
		   .attr("height", "0px")
		   .style("fill", "url(#barPattern)")
		   .style("fill-opacity", "0")
		   .transition().ease("cubic-in-out").duration(800).delay(800)
		   .attr("y", priceScale(d.price)+10+size)
		   .attr("height", function() {
			   var h = priceScale(avr)-priceScale(d.price)-10;
			   if(h<0) h = 0;
			   return h+"px"
		   })
		   .style("fill-opacity", "1");
	});
	
	leftGap = (cWidth-200)/lessNodes[0].length;
	if(leftGap < size) {
		size = leftGap;
	}
	lessNodes.each(function(d, i) {
		var node = d3.select(this);
		node.transition().delay(500)
			.style("z-index", "1")
			.style("height", size+"px")
			.style("width", size+"px")
			.transition().ease("cubic-in-out").duration(800)
			.style("left", (left+leftGap*i)+"px")
			.style("top", priceScale(d.price)+"px")
			.style("opacity", "1");
		
		svg.append("rect")
		   .attr("class", "rectBar")
		   .attr("x", (left+leftGap*i))
		   .attr("y", priceScale(avr)+size)
		   .attr("width", size+"px")
		   .attr("height", "0px")
		   .style("fill",  "url(#barPattern2)")
		   .style("fill-opacity", "0")
		   .transition().ease("cubic-in-out").duration(800).delay(800)
		   .attr("height", function() {
			   var h = priceScale(d.price)-priceScale(avr)-10-size;
			   if(h<0) h = 0;
			   return h+"px"
		   })
		   .style("fill-opacity", "1");
	});
	
	// 평균축
	priceAxisTick(avr, size, "#f87777");
	// 최대축
	priceAxisTick(maxPrice, size);
	// 최소축
	priceAxisTick(minPrice, size);
	// 최대 - 평균 사이 축
	priceAxisTick(Math.floor((avr+maxPrice)/2), size);
	// 최소 - 평균 사이 축
	priceAxisTick(Math.floor((avr+minPrice)/2), size);
	
	// filterList에 추가
	addfilterList(nodes);
};

var priceAxisTick = function(positinPrice, size, color) {
	if(!color) {
		color = "#888";
	}
	svg.append("line")
	   .attr("x1", 5)
	   .attr("y1", priceScale(positinPrice)+size)
	   .attr("x2", cWidth-30)
	   .attr("y2", priceScale(positinPrice)+size)
	   .style({
		   "stroke" : "black",
		   "stroke-opacity" : "0",
		   "stroke-width" : "1",
	   })
	   .transition().ease("linear").duration(1000).delay(1000)
	   .style({
		   "stroke-opacity" : "0.3"
	   });
	
	svg.append("text")
	   .attr("x", 5)
	   .attr("y", priceScale(positinPrice)+size-5)
	   .style({
		   "fill" : color,
		   "font-size" : "14",
		   "fill-opacity" : "0",
		   "font-weight" : "bold"
	   })
	   .text(positinPrice+"원")
	   .transition()
	   .duration(500).delay(500)
	   .ease("cubic-in-out")
	   .style("fill-opacity", "1");
};

var getPriceAverage = function() {
	var sum = 0;
	nodes.each(function(d) {
		sum += d.price;
	});
	var idx = nodes[0].length;
	return Math.floor(sum/idx);
};


// 품질 등급 적용 여부
$("#qualityFlag").on("change", function() {
	if(extendBtnFlag === 'all') {
		qualityApplyFlag = this.checked;
		// 품질 적용
		nodes.transition().ease("cubic-in-out").duration(1000)
			 .style("width", function(d) {
				 return getCircleQualitySize(qualityApplyFlag, d);
			 })
			 .style("height", function(d) {
				 return getCircleQualitySize(qualityApplyFlag, d);
			 })
	}
});

// 퀄리티 & 적용 여부 한 후 사이즈 반환
var getCircleQualitySize = function(flag, d) {
	var size = "70px";
	if(flag) {
		// 퀄리티 적용 사이즈
		size = qualityScale(getQualityIdx(d.quality)) + "px";
	}
	return size;
}

// filter 변경
$("input[name=axis]").on("change", function() {
	var axis = $("input[name=axis]:checked").val();
	$("#qualityFlag").prop("disabled", true);
	$("#extendBtn").css({
		"opacity" : "0",
		"cursor" : "default",
		"z-index" : "-1"
	});
	
	if(infoOpenFlag) $("#popup-close-btn").trigger("click");
	
	if(axis === 'all') {
		moveToCenterAll(false);
		$("#qualityFlag").prop("disabled", false);
		allAxisDraw(300);
	}else if(axis === 'distance') {
		$("#extendBtn").css({
			"cursor" : "pointer",
			"z-index" : "2"
		});
		$("#extendBtn").delay(300)
					   .animate({
						   opacity : 1
					   },400);
		distanceLimit = 10;
		moveToCenterAll(true);
		distanceAxisDraw(0, distanceLimit, 300);
	}else if(axis === 'price') {
		moveToCenterAll(true);
		priceAxisDraw();
	}
	extendBtnFlag = axis;
});

// chart common
var inforBoxMaker = function(d) {	
	$("#informationBox>#popup-header>.product-owner-photo").attr("src", "/magic-deal/upload/profile/log_"+d.mPhoto);
	$("#informationBox>#popup-header>.product-owner").text(d.nickName);
	$("#informationBox>#popup-header>.like-rating>.like-count").text(d.likeCnt);		
	
	$("#informationBox>#popup-content>.content-image>img").attr("src", "/magic-deal/upload/product/"+d.p_ph_path+"/thum_"+d.p_ph_name);
	$("#info-product-name").text(d.cateKeyword);
	$("#info-price").text(comma(d.price)+"원");
	$("#info-distance").text(Math.floor(d.distance)+" Km");
	$("#info-quality").text(getQualityText(d.quality));
	$("#detailViewBtn").attr("data-pnidx", d.pNo);
};

$("#detailViewBtn").on("click", function() {
	modalOpen($(this).attr("data-pnidx"));
});

$("#popup-close-btn").on("click", function(event) {
	event.stopPropagation();
	$("#informationBox").animate({
		"opacity" : "0"
	},"fast", function(){
		$("#informationBox").css("display", "none");
	});
	infoOpenFlag = false;
});

$("#chartViewWrap").on("click", function() {
	if(infoOpenFlag) $("#popup-close-btn").trigger("click");
});
