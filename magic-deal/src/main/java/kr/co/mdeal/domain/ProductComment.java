package kr.co.mdeal.domain;

public class ProductComment {
	
	private int pcNo;
	private int pNo;
	private int mNo;
	private String pcContent;
	private String pcRegDate;
	
	// 멤버테이블에서 필요한 정보
	private String nickName;
	private String id;
	private String mPhoto;
	
	
	public String getNickName() {
		return nickName;
	}
	public void setNickName(String nickName) {
		this.nickName = nickName;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getmPhoto() {
		return mPhoto;
	}
	public void setmPhoto(String mPhoto) {
		this.mPhoto = mPhoto;
	}
	public int getPcNo() {
		return pcNo;
	}
	public void setPcNo(int pcNo) {
		this.pcNo = pcNo;
	}
	public int getpNo() {
		return pNo;
	}
	public void setpNo(int pNo) {
		this.pNo = pNo;
	}
	public int getmNo() {
		return mNo;
	}
	public void setmNo(int mNo) {
		this.mNo = mNo;
	}
	public String getPcContent() {
		return pcContent;
	}
	public void setPcContent(String pcContent) {
		this.pcContent = pcContent;
	}
	public String getPcRegDate() {
		return pcRegDate;
	}
	public void setPcRegDate(String pcRegDate) {
		this.pcRegDate = pcRegDate;
	}
}
