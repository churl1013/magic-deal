/**
 * 	위치검색 관련 js
 */

// 지도 기본 변수
var map;
var clusterer;
var markers = [];
var places;
var productData;	
var locUtil;

// 화면 범위 측정 및 표시데이터 관련
var mBound = {};
var currBndMarkers = [];
var currCenter = {};

//지하철역 표시 관련 변수
var subwayIcon = null;
var subwayMarkers = [];
var subwayCircle = null;

// 거리측정 라인 관련 변수
var drawLine;
var drawDot;
var drawDot;
var drawFlag;
var centerPosition;
var resultOverlay;

var locInit = function() {
	clustererInit();
	placesInit();
};

var placesInit = function() {
	places = new daum.maps.services.Places();
};

var clustererInit = function() {
	clusterer = new daum.maps.MarkerClusterer({
		map: this.map,
		averageCenter : true,
		minLevel : 3,
		minClusterSize : 1,
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
		var marker = new daum.maps.Marker({
            position : new daum.maps.LatLng(d.pLat, d.pLon)
        });

		// 마커에 커스텀 데이터 삽입
		marker.prodata = d;

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

var drawMarkerInList = function(selectMarkers) {
	selectMarkers.forEach(function(marker) {
		console.dir(marker.prodata);
		// 리스트에 추가
	});
};

var getTimeHTML = function(distance) {
	// 도보의 시속은 평균 4km/h 이고 도보의 분속은 67m/min입니다
	var walkkTime = distance / 67 | 0;
	var walkHour = '', walkMin = '';

	// 계산한 도보 시간이 60분 보다 크면 시간으로 표시합니다
	if (walkkTime > 60) {
		walkHour = Math.floor(walkkTime / 60) + '시간 '
	}
	walkMin = walkkTime % 60 + '분'

	// 자전거의 평균 시속은 16km/h 이고 이것을 기준으로 자전거의 분속은 267m/min입니다
	var bycicleTime = distance / 227 | 0;
	var bycicleHour = '', bycicleMin = '';

	// 계산한 자전거 시간이 60분 보다 크면 시간으로 표출합니다
	if (bycicleTime > 60) {
		bycicleHour = Math.floor(bycicleTime / 60) + '시간 '
	}
	bycicleMin = bycicleTime % 60 + '분'

	// 거리와 도보 시간, 자전거 시간을 가지고 HTML Content를 만들어 리턴합니다
	var content = '<div id="distanceInfo" class="ui card" onclick="closeDistanceOverlay()">';
		content += '<div class="header"><i class="road icon"></i> 총 ' + distance + 'm</div>';
		content += '<div class="content">';
		content += '<div class="ui mini teal statistic">'
		content += '<div class="value"><i class="location yellow arrow icon"></i> Walk';
		content += '</div>';
		content += '<div class="label">' + walkHour + walkMin;
		content += '</div>';
		content += '</div>';
		content += '</div>';
		content += '</div>';

	return content;
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

	// 이미지 마커에 추가할 이벤트
	daum.maps.event.addListener(aMarker, 'click', function() {
		// 거리 측정 직선 생성
		if(!drawFlag) {
			drawFlag = true;
			centerPosition = this.getPosition();
			if(!drawLine) {
				drawLine = new daum.maps.Polyline({
					strokeWeight : 3,
					strokeColor : 'tomato',
					strokeOpacity : 1,
					strokeStyle : 'solid'
				});
			}

			if(!drawDot) {
				drawDot = new daum.maps.CustomOverlay({
					content : "<span class='dot'></span>",
					zIndex : 1
				});
			}

			if(resultOverlay != null) {
				resultOverlay.setMap(null);
				resultOverlay = null;
			}

			drawDot.setPosition(centerPosition);
			drawDot.setMap(map);
		}
	});

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

var closeDistanceOverlay = function() {
	resultOverlay.setMap(null);
	resultOverlay = null;
};