package kr.co.mdeal.domain;

public class ProductPhoto {
	private int	pPhotoNo;
	private int pNo;
	private String pPhotoPath;
	private String pPhotoName;
	private char pPhotoThum;
	
	
	
	public String getpPhotoName() {
		return pPhotoName;
	}
	public void setpPhotoName(String pPhotoName) {
		this.pPhotoName = pPhotoName;
	}
	public int getpPhotoNo() {
		return pPhotoNo;
	}
	public void setpPhotoNo(int pPhotoNo) {
		this.pPhotoNo = pPhotoNo;
	}
	public int getpNo() {
		return pNo;
	}
	public void setpNo(int pNo) {
		this.pNo = pNo;
	}
	public String getpPhotoPath() {
		return pPhotoPath;
	}
	public void setpPhotoPath(String pPhotoPath) {
		this.pPhotoPath = pPhotoPath;
	}
	public char getpPhotoThum() {
		return pPhotoThum;
	}
	public void setpPhotoThum(char pPhotoThum) {
		this.pPhotoThum = pPhotoThum;
	}
}
