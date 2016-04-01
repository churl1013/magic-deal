package kr.co.mdeal.domain;

public class Board {
	private int bNo; // board 글 일련번호
	private int mNo; // 회원 일련번호
	private String bTitle;  // 제목
	private String bContent;  // 내용
	private String bRegDate;  // 작성일시
	private int bCate;   // 카테고리 : 게시판 종류  리뷰0 자유1
	
	private int commentCnt; // 160315 add	 : 댓글수
	private String name; // 160317 add : 글쓴이이름		
	private String[] files; // 160317 1803 add : (게시판마다 들어갈) 첨부파일
	
	/*
	private int page;  // 160319 add	
		
	public int getPage() {
		return page;
	}
	public void setPage(int page) {
		this.page = page;
	}
	*/
	public String[] getFiles() {
		return files;
	}
	public void setFiles(String[] files) {
		this.files = files;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getCommentCnt() {
		return commentCnt;
	}
	public void setCommentCnt(int commentCnt) {
		this.commentCnt = commentCnt;
	}
	public int getbNo() {
		return bNo;
	}
	public void setbNo(int bNo) {
		this.bNo = bNo;
	}
	public int getmNo() {
		return mNo;
	}
	public void setmNo(int mNo) {
		this.mNo = mNo;
	}
	public String getbTitle() {
		return bTitle;
	}
	public void setbTitle(String bTitle) {
		this.bTitle = bTitle;
	}
	public String getbContent() {
		return bContent;
	}
	public void setbContent(String bContent) {
		this.bContent = bContent;
	}
	public String getbRegDate() {
		return bRegDate;
	}
	public void setbRegDate(String bRegDate) {
		this.bRegDate = bRegDate;
	}
	public int getbCate() {
		return bCate;
	}
	public void setbCate(int bCate) {
		this.bCate = bCate;
	}
	
}
