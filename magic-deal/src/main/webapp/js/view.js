/**
 * 물품 상세보기 모달 관련 js
 * 
 */


var currentCloneBox;
var cloneBox = $("#viewItemCloneBox");
var closeCallback;
var normalClose = function() {
	$(".thumbFocus").css("left", "0%");
	$(".viewItemWrap").css("display", "none");
	$(this).css("display", "none");
	currentCloneBox.remove();
};

var modalOpen = function(proIdx, callback) {
	var detailId = proIdx;
	if(callback) {
		closeCallback = callback;
	}else {
		closeCallback = normalClose;
	}
	
	$(".viewItemWrap").on("click",">.viewItemPaddingBox>.viewCloseBtn", closeCallback);
	
	$(".viewItemWrap").css("display","block");
	$("#viewLoadingWrap").css("display", "block");
	$.getJSON(contextPath + "/product/detail.do", {
		pNo : detailId
	}, function(resultObj) {
		var result = resultObj.ajaxResult;
		
		console.log("데이터는 읽어옴");
		
		drawViewModal(result.data);
	});
};

var viewScroll = $(".viewItemWrap").niceScroll();


$(".view-scrollUpBtn").on("click", function() {
	viewScroll.doScrollTop(0);
});

var drawViewModal = function(data) {
	currentCloneBox = cloneBox.clone();
	currentCloneBox.css("display", "block");
	
	// 현재 모달에 물품번호를 속성으로 지정
	currentCloneBox.attr("data-pnidx", data.pNo);
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
	}else {
		writerInfo.find("#view-chatBtn").on("click", function() {
			chatRegist({
				pNo : data.pNo,
				ownerNo : data.mNo 
			}, this);
		});
	}
	
	var replyBox = currentCloneBox.find(".viewItemReply");
	
	if(data.lId.length == 0) {
		// 비 로그인 상태 : 댓글 등록폼을 안보이게 변경
		console.log("비로그인");
		replyBox.find(".view-regReplyBox").remove();
	}else {
		replyBox.find("#view-commentRegBtn").on("click", RegistViewComment);
	}
	
	if(data.commentCnt > 0) {
		// 댓글 1페이지 및 페이징 정보를 불러와 출력
		getViewCommentList(1);
	}
	
	
	
	$(".viewItemWrap").prepend(currentCloneBox);

	// 공유버튼 이벤트 걸기
	$(".facebook_btn").on("click", function() {
		var popOption = "width=700, height=500, resizable=no, scrollbars=no, status=no;";
		
		window.open( 
			"http://www.facebook.com/sharer/sharer.php?u="
		   +"http://192.168.0.11:8008/magic-deal/page/detail.html?n="+data.pNo, "", popOption);
	});
	$("#viewLoadingWrap").css("display", "none");
};


var RegistViewComment = function() {
	// 댓글 등록
	var textArea = $(this).parent().parent().find("td").eq(0).find("textarea");
	var inputVal = textArea.val();
	var pNo = currentCloneBox.attr("data-pnidx");
	if(inputVal.trim().length == 0) {
		alertMsg("입력된 내용이 없습니다!", "확인");
		textArea.focus();
	}else {
		$.getJSON(contextPath + "/product/auth/commentRegist.do", {
			pcContent : inputVal,
			pNo : pNo
		}, function(resultObj) {
			var result = resultObj.ajaxResult;
			if(result.msg == 'success') {
				textArea.val("");
				getViewCommentList(1);
			}
		});
	}
};

var getViewCommentList = function(pageNum) {
	var pNo = currentCloneBox.attr("data-pnidx");
	$.getJSON(contextPath + "/product/commentList.do", {
		pNo : pNo,
		page : pageNum
	}, function(resultObj) {
		var result = resultObj.ajaxResult;
		viewCommentDraw(result.data, pageNum);
		pageNumDraw(result.data.maxCnt, pageNum);
	});
};

var viewCommentDraw = function(data) {
	var replyBox = currentCloneBox.find(".viewItemReply");
	var commentList = data.commentList;
	var lId = data.lId;
	var commentBox = replyBox.find(".view-regReplyContextBox").empty();
	if(commentList.length > 0) {
		var comment;
		for(i=0; i<commentList.length; i++) {
			var cmtObj = commentList[i];
			comment =  '<div class="comment">';
			comment += '<a class="avatar">';
			comment += '<img src="'+contextPath+"/upload/profile/log_"+cmtObj.mPhoto+'"/>';
			comment += '</a>';
			comment += '<div class="content">';
			comment += '<a class="author" onclick="document.location.href=\'mypage.html?ow='+cmtObj.id;
			comment += '\'">'+cmtObj.nickName+'</a>';
			comment += '<div class="metadata">';
			comment += '<div class="date">'+cmtObj.pcRegDate+'</div>';
			if(lId==cmtObj.id) {
				comment += '<div class="viewCommentDeleteBtn" data-cidx="'+cmtObj.pcNo+'">삭제</div>';
			}
			comment += '</div>';
			comment += '<div class="text">';
			comment += cmtObj.pcContent;
			comment += '</div>';
			comment += '</div>';
			comment += '</div>';
			commentBox.append(comment);
		}
	}
	$(".viewCommentDeleteBtn").on("click", function() {
		var pcNo = $(this).attr("data-cidx");
		var currPage = $(".viewCurrPage").text();
		
		$.getJSON(contextPath + "/product/auth/commentDelete.do", {
			pcNo : pcNo
		}, function(resultObj) {
			getViewCommentList(currPage);
		});
	});
};

var pageNumDraw = function(maxCnt, currPage) {
	var pagingBox = currentCloneBox.find(".viewItemReply>.view-commentPagingBox");
	var maxPage = parseInt((maxCnt-1)/8)+1;
	var currMinPage;
	var currMaxPage;
	var i;
	currPage = parseInt(currPage);
	if(currPage<=5) {
		currMinPage = 1;
		currMaxPage = 10;
		
		if(maxPage < currMaxPage) 
			currMaxPage = maxPage;
	}else if(currPage<=maxPage-5) {
		currMinPage = currPage-4;
		currMaxPage = currPage+5;
	}else {
		currMinPage = maxPage-9;
		currMaxPage = maxPage;
		if(currMinPage < 1) {
			currMinPage = 1;
		}
	}
	
	pagingBox.empty();
	
	var pageIdxBox;
	if(currMinPage>1) {
		pageIdxBox = "<span class='viewPageArrowBox' onclick='getViewCommentList(1)'>";
		pageIdxBox += "<i class='angle double left icon'></i>";
		pageIdxBox += "</span>";
		pagingBox.append(pageIdxBox);
	}
	
	for(i=currMinPage; i<=currMaxPage; i++) {
		pageIdxBox = "<span class='viewPageIdxBox'>";
		pageIdxBox += i;
		pageIdxBox += "</span>";
		pagingBox.append(pageIdxBox);
	}
	
	if(currMaxPage<maxPage) {
		pageIdxBox = "<span class='viewPageArrowBox' onclick='getViewCommentList("+maxPage+")'>";
		pageIdxBox += "<i class='angle double right icon'></i>";
		pageIdxBox += "</span>";
		pagingBox.append(pageIdxBox);
	}
	
	pagingBox.find(".viewPageIdxBox").on("click", function() {
		var pageNum = $(this).text();
		getViewCommentList(pageNum);
	}).eq(currPage-currMinPage).addClass("viewCurrPage").on("click", null);
};

