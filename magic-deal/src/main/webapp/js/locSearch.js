/**
 * 	위치검색 관련 js
 */

// 지도 기본 변수
var map;
var clusterer;
var markers = [];
var filterOptionMarkers = [];	// 상단 필터링에 의한 필터된 마커들
var filterMarkers = [];			// 화면 범위에 따른 리스트에 표시할 마커들
var places;
var productData;	
var locUtil;

var markerImg;
var sellMarkerImg;
var buyMarkerImg;

// 화면 범위 측정 및 표시데이터 관련
var mBound = {};
var currBndMarkers = [];
var currCenter = {};

//지하철역 표시 관련 변수
var subwayIcon = null;
var subwayMarkers = [];
var subwayCircle = null;

// 리스트 표시 관련
var pageSize = 10;


var locInit = function() {
	clustererInit();
	placesInit();
	reDrawMapInit();
	
	
	var imageSrc = contextPath + "/img/loc/location-icon.png";
	var imageSize = new daum.maps.Size(30,45);
	var imageOption = {offset: new daum.maps.Point(15,45)};
	markerImg = new daum.maps.MarkerImage(imageSrc, imageSize, imageOption);
	
	imageSize = new daum.maps.Size(50,50);
	imageOption = {offset: new daum.maps.Point(25, 50)};
	imageSrc = contextPath + "/img/loc/sell_marker.png";
	sellMarkerImg = new daum.maps.MarkerImage(imageSrc, imageSize, imageOption);
	
	imageSrc = contextPath + "/img/loc/buy_marker.png";
	buyMarkerImg = new daum.maps.MarkerImage(imageSrc, imageSize, imageOption);
};

var reDrawMapInit = function() {
	mBound = map.getBounds();
	currCenter = map.getCenter();
};

var placesInit = function() {
	places = new daum.maps.services.Places();
};

var clustererInit = function() {
	clusterer = new daum.maps.MarkerClusterer({
		map: this.map,
		averageCenter : true,
		minLevel : 3,
		minClusterSize : 2,
		gridSize : 80,
		disableClickZoom : true,
		styles: [{
			width : '53px',
			height : '53px',
			background : "rgba(100,0,255,0.7)",
			color : '#fff',
			textAlign : 'center',
			lineHeight : '46px',
			borderRadius : '50%',
			fontWeight : 'bold',
			border : "5px solid rgba(255,255,255,0.3)",
			transition : "all 0.5s"
		},
		{
			background : "rgba(255,150,150,0.7)"
		},
		{
			background : "rgba(255,0,0,0.7)"
		}]
	});
	
	clusterer.setCalculator(function(size) {
		var index;

		if (size<10) {
			index = 0;
		} else if (size<50) {
			index = 1;
		} else {
			index = 2;
		}

		return index;
	});
};

// 마커 추가 함수
var addMarkers = function() {
	productData.forEach(function(d) {
		var img;
		if(d.dealType == 's') {
			img = sellMarkerImg;
		}else {
			img = buyMarkerImg;
		}
		var marker = new daum.maps.Marker({
            position : new daum.maps.LatLng(d.pLat, d.pLon),
            image : img
        });

		// 마커에 커스텀 데이터 삽입
		marker.prodata = d;
		
		daum.maps.event.addListener(marker, "click", function() {
			$("#selectNumberViewer").text("1");
			$("#productListBox").empty();
			var data = this.prodata;
			drawMarker(data);
		});

		markers.push(marker);
    });
};


// 마우스 휠 이벤트 관리
var LocUtil = function(map) {
	var minLevel = 4;
	var maxLevel = 12;
	var levelVal = map.getLevel();
	var map = map;
	// services로 places 등록
	
	this.moveCenter = function(lat, lon) {
		map.setCenter(new daum.maps.LatLng(lat, lon));
	},
	this.getMinLevel = function() {
		return minLevel;
	},
	this.getMaxLevel = function() {
		return maxLevel;
	},
	this.setLevel = function(degree) {
		if(degree > maxLevel || degree < minLevel) {
			console.log("level 변경 불가");
		}
		else { 
			map.setLevel(degree);
			levelVal = degree;
		}
	},
	this.getLevel = function() {
		return map.getLevel();
	},
	this.downLevel = function() {
		// 확대
		if(levelVal > minLevel) {
			map.setLevel(--levelVal, {animate : {duration: 300}});
		}
	},
	this.upLevel = function() {
		// 축소
		if(levelVal < maxLevel) {
			map.setLevel(++levelVal, {animate : {duration: 300}});
		}
	}
};

var getBoundNodes = function(clusters) {
	var nodes = clusters.filter(function(cluster) {
					var center = cluster.getCenter();
					return (mBound.T<center.zb&&mBound.aa>center.zb
								&&mBound.ba>center.Ab&&mBound.ca<center.Ab)
				});
	return nodes;
};

var drawMarker = function(data) {
	var proCard = '<div class="productCard">';
	proCard += '<div class="proPhoto"';
	proCard += 'style="background-image:url(\'';
	proCard += contextPath + '/upload/product/' + data.photoPath;
	proCard += '/thum_' + data.photoName;
	proCard += '\');"';
	proCard += '></div>';
	
	var priceInfo = data.dealType=='s'?data.price+'원' : '가격협의';
	
	proCard += '<div class="proInfo">';
	proCard += '<span>'+data.cateKeyword+'</span>';
	proCard += '<span>'+priceInfo+'</span>';
	proCard += '<span>'+data.pContent+'</span>';
	proCard += '<span>'+data.pAddr+'</span>';
	proCard += '</div>';
	proCard += '<label class="ui ';
	var labelColor = data.dealType=='s'?'pink':'violet';
	var labelIcon = data.dealType=='s'?'팜' : '삼';
	proCard += labelColor + ' right corner label" style="padding:5px;text-align:right;">';
	proCard += labelIcon + '</label>';
	proCard += '<input type="hidden" name="productNo" value="'+data.pNo+'"/>';
	proCard += '<input type="hidden" name="lat" value="'+data.pLat+'"/>';
	proCard += '<input type="hidden" name="lon" value="'+data.pLon+'"/>';
	proCard += '</div>';
	
	$(proCard).appendTo("#productListBox");
};

//근처 역 정보 불러오기 콜백함수
var loadStation = function(status, result) {
	if(status === daum.maps.services.Status.OK) {
		result.places.forEach(function(data) {
			addImgMarker(data);
		});
	}
};

var makeCircle = function(position) {
	return new daum.maps.Circle({
				center : new daum.maps.LatLng(position.Ab, position.zb),
				radius : 1000,		// 반경 1km
				strokeWeight : 1,
				strokeColor : '#222',
				strokeOpacity : 0.2,
				strokeStyle : 'solid',
				fillColor : '#FFC810',
				fillOpacity : 0.2
			});
};


// 이미지 마커 추가 함수
var addImgMarker = function(place) {
	if(subwayIcon==null) {
		subwayIcon = new daum.maps.MarkerImage(
			'../img/subway_station.png',
			new daum.maps.Size(23, 22)
		);
	}
	var aMarker = new daum.maps.Marker({
		map : map,
		position : new daum.maps.LatLng(place.latitude, place.longitude),
		image : subwayIcon
	});
	subwayMarkers.push(aMarker);

	daum.maps.event.addListener(aMarker, 'mouseover', function() {
			var position = this.getPosition();
			subwayCircle = makeCircle(position);

			subwayCircle.setMap(map);
	});

	daum.maps.event.addListener(aMarker, 'mouseout', function() {
		if(subwayCircle!=null) {
			subwayCircle.setMap(null);
			subwayClickFlag = false;
		}
	});
};

var drawMarkerInList = function(page) {
	var i;
	var s = (page-1)*pageSize;
	var l = page*pageSize;
	
	if(filterMarkers.length < l) {
		l = filterMarkers.length;
	}
	$("#productListBox").empty();
	$("#productListPagingBox").empty();
	for(i=s;i<l;i++) {
		var data = filterMarkers[i].prodata;
		drawMarker(data);
	}
	
	drawPageNumber(filterMarkers.length, page);
};


var drawPageNumber = function(length, currPage) {
	var maxSize = Math.floor((length-1)/pageSize)+1;
	var minSize = 1;
	var currMaxSize = (Math.floor((currPage-1)/pageSize)+1)*pageSize;
	var currMinSize = (Math.floor((currPage-1)/pageSize))*10+1;
	
	if(currMaxSize > maxSize) {
		currMaxSize = maxSize;
	}
	
	if(currMinSize!=1) {
		$("#productListPagingBox").append(
				"<a class='pageBtn' onclick='drawMarkerInList("+minSize+")'>" 
				+"<i class='angle double left teal icon'></i></a>");
		$("#productListPagingBox").append(
				"<a class='pageBtn' onclick='drawMarkerInList("+(currMinSize-1)+")'>" 
				+ "<i class='angle left teal icon'></i>");
	}
	
	var i;
	for(i=currMinSize;i<=currMaxSize;i++) {
		if(currPage==i) {
			$("#productListPagingBox").append("<a class='pageBtn currPage' onclick='return false;'>"+i+"</a>");
			continue;
		}
		$("#productListPagingBox").append(
				"<a class='pageBtn' onclick='drawMarkerInList("+i+")'>"+i+"</a>");
	}
	
	if(currMaxSize<maxSize) {
		$("#productListPagingBox").append(
				"<a class='pageBtn' onclick='drawMarkerInList("+(currMaxSize+1)+")'>" 
				+ "<i class='angle right teal icon' onclick='drawMarkerInList("+currMaxSize+1+")'></i>");
		$("#productListPagingBox").append(
				"<a class='pageBtn' onclick='drawMarkerInList("+maxSize+")'>" 
				+ "<i class='angle double right teal icon' onclick='drawMarkerInList("+maxSize+")'></i>");
	}
	
	return false;
};

