package kr.co.mdeal.domain;

public class BoardComment {
	private int bcNo;  // 댓글 일련번호
	private int mNo;  // 회원 일련번호
	private int bNo;  // 글 일련번호
	private String bcContent;  // 댓글 (내용)
	private String bcRegDate; // 댓글 작성일
	public int getBcNo() {
		return bcNo;
	}
	public void setBcNo(int bcNo) {
		this.bcNo = bcNo;
	}
	public int getmNo() {
		return mNo;
	}
	public void setmNo(int mNo) {
		this.mNo = mNo;
	}
	public int getbNo() {
		return bNo;
	}
	public void setbNo(int bNo) {
		this.bNo = bNo;
	}
	public String getBcContent() {
		return bcContent;
	}
	public void setBcContent(String bcContent) {
		this.bcContent = bcContent;
	}
	public String getBcRegDate() {
		return bcRegDate;
	}
	public void setBcRegDate(String bcRegDate) {
		this.bcRegDate = bcRegDate;
	}
	

}
