/**
 * 물품 상세보기 모달 관련 js
 * 
 */
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

var currentCloneBox;
var cloneBox = $("#viewItemCloneBox");

var modalOpen = function(proIdx) {
	var detailId = proIdx;
	$(".viewItemWrap").css("display","block").animate({
		opacity : 1
	}, "fast");
	$("#viewLoadingWrap").css("display", "block");
	$.getJSON(contextPath + "/product/detail.do", {
		pNo : detailId
	}, function(resultObj) {
		var result = resultObj.ajaxResult;
		console.dir(result);
		drawViewModal(result.data);
	});
};

var viewScroll = $(".viewItemWrap").niceScroll();


$(".view-scrollUpBtn").on("click", function() {
	viewScroll.doScrollTop(0);
});

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

var drawViewModal = function(data) {
	currentCloneBox = cloneBox.clone();
	currentCloneBox.css("display", "block");
	var header = currentCloneBox.find(".viewItemHeader");
	var i;
	var productImg = "";
	for(i=0;i<data.photoList.length;i++) {
		var currPhoto = data.photoList[i];
		productImg += '<div class="thumb">';
		productImg += '<img src="'+contextPath+"/upload/product/"+currPhoto.pPhotoPath;
		productImg += "/"+currPhoto.pPhotoName+'" style="width:100%;height:100%"/>';
		productImg += '</div>';
	}
	
	var thumbBox = header.find(".viewItemPhotoBox>.thumbImgBox")
	thumbBox.prepend(productImg);
	var cloneThumb = thumbBox.find(".thumb").on("click", function() {
		var currIdx = $(".thumb").index(this);
		var currBox = this;
		if(currIdx<0) currIdx = 0;
		$(".thumbFocus").animate({
			"left" : (currIdx*25)+"%"
		}, 300, function() {
			var img = $(currBox).find("img").clone();
			$("#currentViewPhoto").animate({
				"opacity" : "0.2"
			}, 50, function() {
				$("#currentViewPhoto").empty();
				$("#currentViewPhoto").append(img).animate({
					"opacity" : "1"
				}, 100);
			});
		});
	}).eq(0).find("img").clone();
	header.find(".viewItemPhotoBox>#currentViewPhoto").append(cloneThumb);
	
	var productInfo = '<ul>';
		productInfo += '<li>';
		productInfo += '<span class="view-infoTitle">거래 타입</span>';
		productInfo += '<span class="view-infoContent">'+(data.dealType=='s'?'팝니다':'삽니다')+'</span>';
		productInfo += '</li>';
		productInfo += '<li>';
		productInfo += '<span class="view-infoTitle">거래 옵션</span>';
		productInfo += '<span class="view-infoContent">';
		productInfo += (data.dealOpt=='y'?'직거래 & 택배가능':'직거래');
		productInfo += '</span>';
		productInfo += '</li>';
		productInfo += '<li>';
		productInfo += '<span class="view-infoTitle">제품 분류</span>';
		var cateText = getCategorieText(data.cateHigh-1, data.cateLow-1);
		productInfo += '<span class="view-infoContent">'+cateText+'</span>';
		productInfo += '</li>';
		productInfo += '<li>';
		productInfo += '<span class="view-infoTitle">키워드</span>';
		productInfo += '<span class="view-infoContent">'+data.cateKeyword+'</span>';
		productInfo += '</li>';
		productInfo += '<li>';
		productInfo += '<span class="view-infoTitle">품질</span>';
		var qualityText = getQualityText(data.quality);
		productInfo += '<span class="view-infoContent">'+qualityText+'</span>';
		productInfo += '</li>';
		productInfo += '<li>';
		productInfo += '<span class="view-infoTitle">가격</span>';
		var commaPrice = comma(data.price);
		productInfo += '<span class="view-infoContent">'+(commaPrice=="0"?"가격협의":commaPrice+"원")+'</span>';
		productInfo += '</li>';
		productInfo += '<li>';
		productInfo += '<span class="view-infoTitle">거래 지역</span>';
		productInfo += '<span class="view-infoContent">'+data.pAddr+'</span>';
		productInfo += '</li>';
		productInfo += '<li>';
		productInfo += '<span class="view-infoTitle">등록 일시</span>';
		productInfo += '<span class="view-infoContent">'+data.pRegDate+'</span>';
		productInfo += '</li>';
		productInfo += '</ul>';
	
	header.find(".viewItemContent>.itemInfo").append(productInfo);
	header.find(".viewItemContent>.itemContent>.view-itemContent").html(data.pContent);
	
	var writerInfo = header.find(".viewItemContent>.itemWriter>.view-memberCard");
	writerInfo.find(".view-memberCardImg").css("background-image", "url('"
					+ contextPath + "/upload/profile/mp_" + data.mPhoto + "')");
	
	var memberInfo = '<span class="view-clickable" onclick="document.location.href=\'mypage.html?ow='+data.id+'\'">';
	memberInfo += data.nickName;
	memberInfo += '<span class="view-annotation">마이페이지</span>';
	memberInfo += '</span>';
	memberInfo += '<span class="view-likeCntBox">';
	var likeCnt = comma(data.likeCnt);
	memberInfo += '<span class="view-likeCnt">'+likeCnt+'</span>';
	memberInfo += '<i class="heart tiny red icon"></i>';
	memberInfo += '</span>';
	
	
	writerInfo.find(".view-card-nick").append(memberInfo);
	writerInfo.find(".view-card-active>.statistic>.value").text(data.productCnt);
	if(data.id == data.lId || data.lId.length == 0) {
		// 로그인한 사용자와 판매자가 같을경우 채팅버튼 제거
		writerInfo.find("#view-chatBtn").remove();
	}
	
	
	var replyBox = currentCloneBox.find(".viewItemReply");
	
	if(data.lId.length == 0) {
		// 비 로그인 상태 : 댓글 등록폼을 안보이게 변경
		console.log("비로그인");
		replyBox.find(".view-regReplyBox").remove();
	}else {
		replyBox.find("#view-commentRegBtn").attr("data-pnidx", data.pNo).on("click", view_registComment);
	}
	
	if(data.commentCnt > 0) {
		replyBox
			.find(".view-appendCommentBox>#view-appendCmtBtn")
			.attr("data-pnidx", data.pNo).attr("data-pidx", "1")
			.on("click", view_getMoreComment);
		
		
		var commentBox = replyBox.find(".view-regReplyContextBox");
		var comment;
		for(i=0; i<data.commentList.length; i++) {
			var cmtObj = data.commentList[i];
			comment =  '<div class="comment">';
			comment += '<a class="avatar">';
			comment += '<img src="'+contextPath+"/upload/profile/log_"+cmtObj.mPhoto+'"/>';
			comment += '</a>';
			comment += '<div class="content">';
			comment += '<a class="author">'+cmtObj.nickName+'</a>';
			comment += '<div class="metadata">';
			comment += '<div class="date">'+cmtObj.pcRegDate+'</div>';
			comment += '<div class="deleteBtn">삭제</div>';
			comment += '</div>';
			comment += '<div class="text">';
			comment += cmtObj.pcContent;
			comment += '</div>';
			comment += '</div>';
			comment += '</div>';
			commentBox.append(comment);
		}
	}else {
		replyBox.find(".view-appendCommentBox>#view-appendCmtBtn").prop("disabled", true);
		replyBox.find(".view-appendCommentBox>#view-appendCmtBtn").html("no comment&nbsp;&nbsp;");
	}
	$(".viewItemWrap").prepend(currentCloneBox);
	$("#viewLoadingWrap").css("display", "none");
};

$(".viewItemWrap").on("click",">.viewItemPaddingBox>.viewCloseBtn", function() {
	$(".viewItemWrap").animate({
		opacity : 0
	}, "fast", function() {
		$(this).css("display", "none");
		currentCloneBox.remove();
	});
});

var view_getMoreComment = function() {
	// 댓글 더보기
};

var view_registComment = function() {
	// 댓글 등록
	var textArea = $(this).parent().parent().find("td").eq(0).find("textarea");
	var inputVal = textArea.val();
	var pNo = $(this).attr("data-pnidx");
	if(inputVal.trim().length == 0) {
		alertMsg("입력된 내용이 없습니다!", "확인");
		textArea.focus();
	}else {
		$.getJSON(contextPath + "/product/auth/registComment.do", {
			pcContent : inputVal,
			pNo : pNo
		}, function(resultObj) {
			var result = resultObj.ajaxResult;
			console.dir(result);
		});
	}
};

