<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta property="og:type" content="website"/>
<meta property="og:title" content="MDEAL"/>
<meta property="og:url" content="http://119.196.49.48:8008/magic-deal/product/share.do?n=${productDetail.pNo}"/>
<meta property="og:description" content="마법같은 오픈마켓 매직딜 : ${productDetail.cateKeyword} 상품"/>
<meta property="og:image" content="http://119.196.49.48:8008/magic-deal/upload/product/${productDetail.photoList[0].pPhotoPath}/${productDetail.photoList[0].pPhotoName}"/>
<meta content="428" property="og:image:width">
<meta content="200" property="og:image:height">

<link rel="stylesheet" type="text/css" href="/magic-deal/semantic/semantic.min.css">
<link rel="stylesheet" type="text/css" href="/magic-deal/css/global.css">
<link rel="stylesheet" type="text/css" href="/magic-deal/css/header.css">
<link rel="stylesheet" type="text/css" href="/magic-deal/css/nav.css">
<link rel="stylesheet" type="text/css" href="/magic-deal/css/view.css">
<link rel="shortcut icon" href="/magic-deal/img/favicon.ico" type="image/x-icon">
<link rel="icon" href="/magic-deal/img/favicon.ico" type="image/x-icon">
<title>MAGIC DEAL</title>

<style>
body {
	background-color : #222;
}

section {
	padding-top : 70px;
	height : 100%;
	width : 100%;
}
</style>
</head>
<body>
<!-- 헤더부 -->
<header>
	<div id="loginStatusWrap">
		<!-- 로그인 관련 내용 헤더 -->
	</div>
	<div id="headerLogo">
		<img src="../img/fontlogo.png"/>
	</div>
</header>
<!-- 헤더끝 -->

<!-- 네비게이션 -->
<div id="navBtn" class="ui icon button small black">
	<i class="sidebar icon"></i>
</div>
<nav class="ui vertical menu">
	<a id="navMainDirectBtn" class="item">
      <i class="home large orange icon"></i>메인
    </a>
    <a id="navProductRegistBtn" class="item">
      <i class="cubes large orange icon"></i>물품등록
    </a>
    <a id="navBoardDirectBtn" class="item">
      <i class="info circle large orange icon"></i>커뮤니티
    </a>
</nav>
<!-- 네비게이션 끝 -->

<section>
	<button id="showBtn" style="display:none;"></button>
</section>


<!-- 상세보기 모달 시작 -->
<div class="viewItemWrap">
	
	<div class="view-scrollUpBtn ui icon inverted button">
		<i class="angle double up large icon"></i>
	</div>
	<div id="viewLoadingWrap">
		<div class="sk-folding-cube">
			<div class="sk-cube1 sk-cube"></div>
			<div class="sk-cube2 sk-cube"></div>
			<div class="sk-cube4 sk-cube"></div>
			<div class="sk-cube3 sk-cube"></div>
		</div>
	</div>
</div>



<div class="viewItemPaddingBox" id="viewItemCloneBox">
	<div class="viewItemBox">
		<div class="viewItemHeader">
			<div class="viewItemPhotoBox">
				<div id="currentViewPhoto">
				</div>
				<div class="thumbImgBox">
					<div class="thumbFocus">
					</div>
				</div>
			</div>
			<div class="viewItemContent">
				<div class="itemInfo">
					<div class="view-infoHeader view-inforHeader-share">
						PRODUCT INFO <span class="view-annotation">상품정보</span>
						<div class="view-sharedBtnBox">
							<button class='view-shareBtn facebook_btn'></button>
							<button class='view-shareBtn twitter_btn'></button>
							<button class='view-shareBtn kakao_btn'></button>
							<button class='view-shareBtn kakaostory_btn'></button>
							<button class='view-shareBtn url_btn'>URL</button>
						</div>
					</div>
				</div>
				<div class="itemWriter">
					<div class="view-infoHeader">
						MEMBER INFO <span class="view-annotation">등록회원 정보</span>
					</div>
					<div class="view-memberCard">
						<div class="view-memberCardImg"></div>
						<div class="view-memberCardInfo">
							<div class="view-card-nick">
							</div>
							<div class="view-card-active">
								<div class="ui horizontal statistic">
								  <div class="value">
								  </div>
								  <div class="label">
								    Items
								  </div>
								</div>
							</div>
							<div id="view-chatBtn" class="ui purple small button view-memberCardInfo-chatBtn">
								채팅하기
							</div>
						</div>
					</div>
				</div>
				<div class="itemContent">
					<div class="view-infoHeader">
						DETAIL INFO <span class="view-annotation">상세 정보</span>
					</div>
					<div class="view-itemContent">
					</div>
				</div>
			</div>
		</div>
		<div class="viewItemReply">
			<div class="view-regReplyBox">
				<div class="view-infoHeader">
					COMMENT WRITE <span class="view-annotation">댓글 작성</span>
				</div>
				<div class="view-regReplyForm">
					<table>
						<tr>
							<td><textarea id="view-commentContent"></textarea></td>
							<td style="vertical-align:top;">
								<button id="view-commentRegBtn" class="ui black small button">등 록</button>
							</td>
						</tr>
					</table>
				</div>
			</div>
			<div class="view-regReplyContextBox ui comments">
			<!-- 댓글 내용부 -->
				
			<!-- 댓글 내용부 끝 -->
			</div>
			<div class="view-commentPagingBox">
				
			</div>
		</div>
	</div>
	<div class="viewCloseBtn">
		<i id="closeBtn" class="inverted large close icon"></i>
	</div>
</div>
<!-- 상세보기 모달 끝 -->

<!-- 스크립트 시작 -->
<script type="text/javascript" src="/magic-deal/lib/jquery/jquery.js"></script>
<script src="/magic-deal/semantic/semantic.min.js"></script>
<script src="/magic-deal/js/common.js"></script>
<!-- view modal 관련 -->
<script src="/magic-deal/lib/jquery.nicescroll/jquery.nicescroll.js"></script>
<script src="/magic-deal/js/view.js"></script>
<!-- view modal 관련 끝 -->
<script>
	
	
	// 로그인 체크 
	var loginCheck = function() {
		$.getJSON(contextPath + "/member/loginCheck.do", function(resultObj) {
			var result = resultObj.ajaxResult;
			loginBoxDraw(result.data);
		});
	};
	
	$("#showBtn").on("click", function() {
		modalOpen(${productDetail.pNo}, function() {
			document.location.href="/magic-deal/page/main.html";
		});
	});

	loginCheck();
	setTimeout(function(){$("#showBtn").trigger("click");},100);
</script>
</body>
</html>