package kr.co.mdeal.domain;

public class BoardPhoto {
	private int bPhNo;  // 사진 일련번호
	private int bNo; // 글 일련번호
	private String bPhPath;  // 사진경로
	private char bPhThum;  // 대표이미지여부
	private String bPhName;  // 사진이름 add 160330	
	
	public String getbPhName() {
		return bPhName;
	}
	public void setbPhName(String bPhName) {
		this.bPhName = bPhName;
	}
	public char getbPhThum() {
		return bPhThum;
	}
	public void setbPhThum(char bPhThum) {
		this.bPhThum = bPhThum;
	}
	public int getbPhNo() {
		return bPhNo;
	}
	public void setbPhNo(int bPhNo) {
		this.bPhNo = bPhNo;
	}
	public int getbNo() {
		return bNo;
	}
	public void setbNo(int bNo) {
		this.bNo = bNo;
	}
	public String getbPhPath() {
		return bPhPath;
	}
	public void setbPhPath(String bPhPath) {
		this.bPhPath = bPhPath;
	}

	

}
