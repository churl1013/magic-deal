var contextPath = "/magic-deal";
var ip = "192.168.0.11"; 
var port = "8000"; 

// header, nav 이벤트 관련 js 파일입니다.
var nav_flag = false;
var popup_layer;

var joinChkObj = {
	id : false,
	password : false,
	nick : false,
	addr : false,
	result : function() {
		return this.id && this.password && this.nick && this.addr;
	}
};

var alertMsg = function(msg, btn) {
	$("#alertMsg").html(msg);
	$("#alertBtn").html(btn);
	$(".ui.modal.alertModal").modal( {
		allowMultiple : true,
		closable : false,
		onApprove : function() {
			return true;
		}
	}).modal('show');
};
// 회원가입 관련 함수
var foldDaumPostcode = function() {
	var topPos = parseInt($(".ui.modal.signUpModal").css("top"));
	$(".ui.modal.signUpModal").css("top", topPos+150+"px");
	popup_layer.style.display = 'none';
	$("#signUpCloseBtn").prop("disabled", false);
};

var execDaumPostcode = function() {
	$("#signUpCloseBtn").prop("disabled", true);
	new daum.Postcode({
		width : "100%",
		height : "100%",
		onclose : function(state) {
			$("#signUpCloseBtn").prop("disabled", false);
			if(state === 'COMPLETE_CLOSE'){
	            //사용자가 검색결과를 선택하여 팝업창이 닫혔을 경우, 실행될 코드를 작성하는 부분입니다.
	            //oncomplete 콜백 함수가 실행 완료된 후에 실행됩니다.
				joinChkObj.addr = true;
	        }
		},
		oncomplete : function(data) {
			var fullAddr = data.address;
			var extraAddr = "";
			
			 // 기본 주소가 도로명 타입일때 조합한다.
            if(data.addressType === 'R'){
                //법정동명이 있을 경우 추가한다.
                if(data.bname !== ''){
                    extraAddr += data.bname;
                }
                // 건물명이 있을 경우 추가한다.
                if(data.buildingName !== ''){
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
                fullAddr += (extraAddr !== '' ? ' ('+ extraAddr +')' : '');
            }
            
            $("#signAddr").val(fullAddr);
            var geocoder = new daum.maps.services.Geocoder();
            geocoder.addr2coord(data.address, function(status, result) {
                // 정상적으로 검색이 완료됐으면
                if (status === daum.maps.services.Status.OK) {
                    // 해당 주소에 대한 좌표를 받아서
                    var lat = result.addr[0].lat;
                    var lng = result.addr[0].lng;
                    
                    $("#signLat").val(lat);
                    $("#signLon").val(lng);
                }
            });
            
            popup_layer.style.display = 'none';
            var topPos = parseInt($(".ui.modal.signUpModal").css("top"));
            $(".ui.modal.signUpModal").css("top", topPos+150+"px");
		}
	}).embed(popup_layer);
	
	popup_layer.style.display = 'block';
	var topPos = parseInt($(".ui.modal.signUpModal").css("top"));
	$(".ui.modal.signUpModal").css("top", topPos-150+"px");
};

// 상태검사 함수
var chkFormStatus = function(val) {
	// 상태 검사
	var status = {};
	status.flag = true;
	status.msg = "";
	return status;
};

var passwordChk = function() {
	var pass1 = $("#signPass").val();
	var pass2 = $("#signPassChk").val();
	
	return pass1 == pass2;
};

var signUpSubmitChk = function() {
	joinChkObj.password = passwordChk();
	if(joinChkObj.result()) {
		// 폼 검사 적격 회원가입 진행
		return true;
	}else {
		// 폼 검사 부적격
		alertMsg("입력이 누락되거나 잘못되었습니다!!", "확인");
		return false;
	}
};

var signUpCommit = function(flag) {
	if(flag) {
		var id = $("#signId").val();
		var pass = $("#signPass").val();
		var nick = $("#signNickName").val();
		var addr = $("#signAddr").val();
		var lat = $("#signLat").val();
		var lon = $("#signLon").val();
		
		$.post(contextPath+"/member/signUp.do", {
			id : id,
			password : pass,
			nickName : nick,
			mAddr : addr,
			mLat : lat,
			mLon : lon
		}, function(resultObj) {
			var result = resultObj.ajaxResult;
			if(result.msg == 'success') {
				joinSuccessMsg("환영합니다!!<br/> 사용을 위해 로그인해주세요!", "확인");
			}
		}, "json");
	}
};

var joinSuccessMsg = function(msg, btn) {
	$("#alertMsg").html(msg);
	$("#alertBtn").html(btn);
	$(".ui.modal.alertModal").modal( {
		allowMultiple : true,
		closable : false,
		onApprove : function() {
			$("#signUpCloseBtn").trigger("click");
			return true;
		}
	}).modal('show');
};

var clearSignUpForm = function() {
	joinChkObj.id = false;
	joinChkObj.password = false;
	joinChkObj.nick = false;
	joinChkObj.addr = false;
	
	$("#signId").val("");
	$("#signPass").val("");
	$("#signPassChk").val("");
	$("#signNickName").val("");
	$("#signAddr").val("");
	$("#signLat").val("");
	$("#signLon").val("");
	$("#signIdChkResult").val("아이디를 입력하세요!");
	$("#signNickChkResult").val("닉네임을 입력하세요!");
};

var loginSubmit = function() {
	var id = $("#loginId").val();
	var pass = $("#loginPass").val();
	
	console.log(id, pass);
	
	$.post(contextPath + "/member/login.do", {
		id : id,
		password : pass
	}, function(resultObj) {
		var result = resultObj.ajaxResult;
		console.dir(result);
		if(result.msg == 'success') {
			$("#loginCloseBtn").trigger("click");
			location.href = location.href;
		}else {
			alertMsg('로그인 정보가 틀렸습니다.<br/>다시 확인해주세요!', "확인");
			$("#loginId").focus();
		}
	}, "json");
};

var loginClose = function() {
	$("#loginId").val("");
	$("#loginPass").val("");
};

var logout = function() {
	$.get(contextPath + "/member/auth/logout.do", function() {
		location.href = location.href;
	},"json");
};

var loginBoxDraw = function(u_info) {
	var logBoxWrap = $("#loginStatusWrap");
	var loginBox;
	if(u_info) {
		// 로그인 상태
		loginBox = '<div id="logUserBtn">';
		loginBox += '<img id="logUserPhoto" class="ui image avatar" src="'+contextPath+"/upload/profile/log_"+u_info.mPhoto+'">';
		loginBox += '<span class="smallTextLabel">'+u_info.nickName+'</span></div>';

		loginBox += '<div id="chatBtn" data-content="message" data-variation="inverted">';
		loginBox += '<i class="large icons">';
		loginBox += '<i class="comments icon"></i>';
		loginBox += '<i class="corner add icon"></i>';
		loginBox += '</i>';
		
		//loginBox += '<span class="smallTextLabel">채팅</span>';
		
		loginBox += '</div>';
		
		// 알람버튼 제거
//		loginBox += '<div id="alarmBtn">';
//		loginBox += '<i class="large icons">';
//		loginBox += '<i class="alarm icon"></i>';
//		loginBox += '<i class="corner add icon"></i>';
//		loginBox += '</i>';
//		loginBox += '<span class="smallTextLabel">알람</span>';
//		loginBox += '</div>';
		
		
		loginBox +=  '<div id="logoutBtn" data-content="logout" data-variation="inverted">';
		loginBox += '<i class="sign out large black icon"></i>';
		//loginBox += '<span class="smallTextLabel">로그아웃</span>';
		loginBox += '</div>';
		
		// 로그인시 바뀌는 버튼 이벤트들 등록해야함.
	}else {
		// 로그아웃 상태
		loginBox =  '<div id="loginNsignupBtn">';
		loginBox += '<i class="user black icon"></i>';
		loginBox += '<span class="smallTextLabel">로그인 및 회원가입</span></div>';
		
		// 로그아웃시 바뀌는 버튼 이벤트들 등록해야함.
	}
	logBoxWrap.html(loginBox);
	
	$('#chatBtn, #logoutBtn').popup();
	
	if(u_info) {
		logBoxWrap.find("#logoutBtn").on("click", function() {
			logout();
			chatDisConnect();
		});
		logBoxWrap.find("#logUserBtn").on("click", function() {
			document.location.href = contextPath + "/page/mypage.html?ow=" + u_info.id;
		})
	}else {
		logBoxWrap.find("#loginNsignupBtn").on("click", function() {
			$('.loginModal').modal({
				closable : false,
				onDeny : function() {
					loginSubmit();
					// false 리턴하면 모달창 안닫힘
					// true 리턴 or 아무것도 리턴 안하면 모달창 닫힘
					return false;
				},
				onApprove : function() {
					loginClose();
					$(".signUpModal").modal({
						closable : false,
						onDeny : function() {
							clearSignUpForm();
							return true;
						},
						onApprove : function() {
							var signFlag = signUpSubmitChk();
							signUpCommit(signFlag);
							return false;
						}
					}).modal('show');
				}
			}).modal('setting', 'transition', 'scale').modal('show');
		});
	}
};



// 숫자만 체크
var checkNumber = function () {
	var objEv = event.srcElement;
	var numPattern = /([^0-9])/;
	var numPattern = objEv.value.match(numPattern);
	if (numPattern != null) {
		alert("숫자만 입력해주세요!");
		objEv.value = "";
		objEv.focus();
		return false;
	}
}

// 3자리 콤마 찍기
var cmaComma = function(obj) {
	var str = "" + obj.value.replace(/,/gi, '');
	var regx = new RegExp(/(-?\d+)(\d{3})/);
	var bExists = str.indexOf(".", 0);
	var strArr = str.split('.');

	while (regx.test(strArr[0])) {
		strArr[0] = strArr[0].replace(regx, "$1,$2");
	}
	if (bExists > -1) {
		obj.value = strArr[0] + "." + strArr[1];
	} else {
		obj.value = strArr[0];
	}
}


// 파라미터 분리해내는 함수
// 파라미터를 키, 벨류값으로 갖는 객체를 리턴
var getParameter = function(url) {
	var paramStr = url.substr(url.lastIndexOf("?")+1,url.length);
	var params = paramStr.split("&");
	var keyAndValue;
	var paramObj = {};
	var i;
	for(i=0; i<params.length; i++) {
		keyAndValue = params[i].split("=");
		paramObj[keyAndValue[0]] = keyAndValue[1];
	}
	
	return paramObj;
};



//헤더에서 사용될 코드들 먼저 실행
	// 로그인 체크 함수 실행
	// nav버튼 처리
	$(".loginModal").on("keydown", function() {
		if(event.keyCode == 13) {
			$(".loginModal>.actions>.deny").trigger("click");
		}
	});
	
	$("#headerLogo").on("click", function() {
		document.location.href = contextPath+'/page/main.html';
	});
	
	$("#navMainDirectBtn").on("click", function() {
		document.location.href = contextPath+'/page/main.html';
	});
	
	$("#navProductRegistBtn").on("click", function() {
		document.location.href = contextPath+'/page/regPro.html';
	});
	
	$("#navMapSearchBtn").on("click", function() {
		document.location.href = contextPath+'/page/locSearch.html?hc=1';
	});
	
	$("#navChartSearchBtn").on("click", function() {
		document.location.href = contextPath+'/page/chartSearch.html?hc=1';
	});
	
	$("#navBoardDirectBtn").on("click", function() {
		
	});
	
	popup_layer = document.getElementById('popupLayer');
	$("#navBtn").on("click", function() {
		if (!nav_flag) {
			// nav_ 안열린 상태
			$("nav").css("left", "0px");
			nav_flag = true;
		} else {
			// nav_ 열린상태
			$("nav").css("left", "-200px");
			nav_flag = false;
		}
	});
	
	$("#signId").on("keyup", function() {
		var chkId = $(this).val();
		if(chkId.trim().length<5) {
			$("#signIdChkResult").text("아이디는 5글자 이상입니다.");
			$("#signIdChkResult").css("color", "#db2828");
			joinChkObj.id = false;
		}else {
			$.getJSON(
				"http://"+ip+":"+port+"/magic-deal/checkId?chkId="+chkId+"&callback=?", 
				function(resultData) {
				var result = resultData.result;
				if(result == 'ok') {
					$("#signIdChkResult").text("사용 가능한 아이디 입니다.");
					$("#signIdChkResult").css("color", "#21ba45");
					joinChkObj.id = true;
				}else {
					$("#signIdChkResult").text("이미 사용중인 아이디 입니다.");				
					$("#signIdChkResult").css("color", "#db2828");
					joinChkObj.id = false;
				}
			});
		}
	});
	
	$("#signNickName").on("keyup", function() {
		var chkNick = $(this).val();
		if(chkNick.trim().length<2) {
			$("#signNickChkResult").text("닉네임은 2글자 이상입니다.");
			$("#signNickChkResult").css("color", "#db2828");
			joinChkObj.nick = false;
		}else {
			$.getJSON(
				"http://"+ip+":"+port+"/magic-deal/checkNick?chkNick="+chkNick+"&callback=?", 
				function(resultData) {
				var result = resultData.result;
				if(result == 'ok') {
					$("#signNickChkResult").text("사용 가능한 닉네임 입니다.");
					$("#signNickChkResult").css("color", "#21ba45");
					joinChkObj.nick = true;
				}else {
					$("#signNickChkResult").text("이미 사용중인 닉네임 입니다.");				
					$("#signNickChkResult").css("color", "#db2828");
					joinChkObj.nick = false;
				}
			});
		}
	});
	

	
	var v_cateData = [
{
	display : "신발 가방 잡화",
	lowCate : [
	           {display: "남성신발", value: "1" }, 
	           {display: "여성신발", value: "2" }, 
	           {display: "운동화", value: "3" },
	           {display: "백팩", value: "4" },
	           {display: "핸드백", value: "5" },
	           {display: "크로스백", value: "6" },
	           {display: "지갑", value: "7" },
	           {display: "벨트", value: "8" },
	           {display: "모자", value: "9" },
	           {display: "안경", value: "10" },
	           {display: "기타", value: "11" }]
}
,{
	display : "휴대폰 태블릿",
	lowCate : [
	           {display: "SKT", value: "1" }, 
	           {display: "KT", value: "2" }, 
	           {display: "LGU+", value: "3" },
	           {display: "액세서리", value: "4" },
	           {display: "태블릿", value: "5" },
	           {display: "기타 휴대폰", value: "6" }]
}
,{
	display : "여성의류",
	lowCate : [
	           {display: "코트", value: "1" }, 
	           {display: "아우터", value: "2" }, 
	           {display: "티셔츠", value: "3" },
	           {display: "원피스", value: "4" },
	           {display: "정장", value: "5" },
	           {display: "니트", value: "6" },
	           {display: "바지", value: "7" },
	           {display: "스커트", value: "8" },
	           {display: "치마", value: "9" },
	           {display: "셔츠", value: "10" },
	           {display: "블라우스", value: "11" },
	           {display: "트레이닝복", value: "12" },
	           {display: "속옷", value: "13" },
	           {display: "조끼", value: "14" },
	           {display: "기타", value: "15" }]
}
,{
	display : "남성의류",
	lowCate : [
	           {display: "코트", value: "1" }, 
	           {display: "아우터", value: "2" }, 
	           {display: "티셔츠", value: "3" },
	           {display: "바지", value: "4" },
	           {display: "트레이닝복", value: "5" },
	           {display: "니트", value: "6" },
	           {display: "셔츠", value: "7" },
	           {display: "정장", value: "8" },
	           {display: "속옷", value: "9" },
	           {display: "기타", value: "10" }]
}
,{
	display : "뷰티",
	lowCate : [
	           {display: "남성화장품", value: "1" }, 
	           {display: "여성화장품", value: "2" }, 
	           {display: "향수", value: "3" },
	           {display: "메이크업", value: "4" },
	           {display: "헤어", value: "5" },
	           {display: "바디", value: "6" },
	           {display: "기타", value: "7" }]
}
,{
	display : "컴퓨터 주변기",
	lowCate : [
	           {display: "데스크탑", value: "1" }, 
	           {display: "노트북", value: "2" }, 
	           {display: "서버/워크스테이션", value: "3" },
	           {display: "모니터", value: "4" },
	           {display: "프린터", value: "5" },
	           {display: "키보드", value: "6" },
	           {display: "마우스", value: "7" },
	           {display: "PC 주요부품", value: "8" },
	           {display: "기타", value: "9" }]
}
,{
	display : "디지털 가전",
	lowCate : [
	           {display: "주방가전", value: "1" }, 
	           {display: "생활가전", value: "2" }, 
	           {display: "건강/뷰티가전", value: "3" },
	           {display: "티비/프로젝터", value: "4" },
	           {display: "디카/DSLR", value: "5" },
	           {display: "MP3", value: "6" },
	           {display: "플스/XBOX/게임기", value: "7" },
	           {display: "기타", value: "8" }]
}
,{
	display : "유아동 출산",
	lowCate : [
	           {display: "기저귀/분유/물티슈", value: "1" }, 
	           {display: "목욕/위생/화장품", value: "2" }, 
	           {display: "유모차/카시트/발육", value: "3" },
	           {display: "유아/출산용품", value: "4" },
	           {display: "완구/도서", value: "5" },
	           {display: "유아패션/잡화", value: "6" },
	           {display: "기타", value: "7" }]
}
,{
	display : "가구 홈데코",
	lowCate : [
	           {display: "침대/침실가구", value: "1" }, 
	           {display: "장롱/드레스룸", value: "2" }, 
	           {display: "거실가구", value: "3" },
	           {display: "의자", value: "4" },
	           {display: "학생/사무가구", value: "5" },
	           {display: "주방/수납가구", value: "6" },
	           {display: "침구/커튼/카페트", value: "7" },
	           {display: "LED전구/형광등", value: "8" },
	           {display: "인테리어/DIY", value: "9" },
	           {display: "기타", value: "10" }]
}
,{
	display : "CD DVD",
	lowCate : [
	           {display: "게임", value: "1" }, 
	           {display: "음악", value: "2" }, 
	           {display: "소프트웨어", value: "3" },
	           {display: "영화/뮤지컬", value: "4" },
	           {display: "기타", value: "5" }]
}
,{
	display : "스포츠 레저",
	lowCate : [
	           {display: "자전거", value: "1" }, 
	           {display: "등산/캠핑", value: "2" }, 
	           {display: "헬스/요가", value: "3" },
	           {display: "골프", value: "4" },
	           {display: "스키/보드", value: "5" },
	           {display: "축구", value: "6" },
	           {display: "농구", value: "7" },
	           {display: "야구", value: "8" },
	           {display: "인라인/X스포츠", value: "9" },
	           {display: "낚시", value: "10" },
	           {display: "수상스포츠", value: "11" },
	           {display: "기타", value: "12" }]
}
,{
	display : "도서 문구",
	lowCate : [
	            {display: "일반도서", value: "1" }, 
	            {display: "교재/학습", value: "2" }, 
	            {display: "유아동/전집", value: "3" },
	            {display: "만화책", value: "4" },
	            {display: "잡지", value: "5" },
	            {display: "외국도서", value: "6" },
	            {display: "여행/레저", value: "7" },
	            {display: "문구/사무용품", value: "8" },
	            {display: "기타", value: "9" }]
}
,{
	display : "음향기기 악기",
	lowCate : [
	             {display: "헤드폰/이어폰", value: "1" }, 
	             {display: "스피커/오디오", value: "2" }, 
	             {display: "기타 음향기기", value: "3" },
	             {display: "현악기", value: "4" },
	             {display: "관악기", value: "5" },
	             {display: "건반악기", value: "6" },
	             {display: "기타", value: "7" }]
}
,{
	display : "애완",
	lowCate : [
	             {display: "사료/간식/영양제", value: "1" }, 
	             {display: "이미용", value: "2" }, 
	             {display: "패션잡화", value: "3" },
	             {display: "생활용품", value: "4" },
	             {display: "놀이용품", value: "5" },
	             {display: "기타", value: "6" }]
}];
	
	
	var getCategorieText = function(high, low) {
		var highText = v_cateData[high].display;
		var lowText = v_cateData[high].lowCate[low].display;
		return highText + " > " + lowText;
	};

	var getQualityText = function(quality) {
		var text = "-";
		quality = quality.toUpperCase();
		if(quality == "A") {
			text = "미사용";
		}else if(quality == "B") {
			text = "거의 새것";
		}else if(quality == "C") {
			text = "사용감 있음";
		}else if(quality == "D") {
			text = "하자 있음";
		}
		
		return text;
	}

	var comma = function(val) {
		var regExp = /(^[+-]?\d+)(\d{3})/;
		value = val.toString();
		while(regExp.test(value)) {
			value = value.replace(regExp, '$1'+','+'$2');
		}
		return value;
	};
	
	var alertLoginCheck = function(msg, btn) {
		$("#alertMsg").html(msg);
		$("#alertBtn").html(btn);
		$(".ui.modal.alertModal").modal( {
			allowMultiple : true,
			closable : false,
			onApprove : function() {
				document.location.href="main.html";
			}
		}).modal('show');
	};
