package kr.co.mdeal.domain;

public class ChatRoom {
	// 방번호
	private int roomNo;
	
	public int getRoomNo() {
		return roomNo;
	}

	public void setRoomNo(int roomNo) {
		this.roomNo = roomNo;
	}

	// 물품번호
	private int pNo;
	
	// 물품 등록멤버 번호
	private int ownerNo;
	
	// 채팅 신청멤버 번호
	private int subNo;
	
	// 생성된 key
	private String roomKey;

	public int getpNo() {
		return pNo;
	}

	public void setpNo(int pNo) {
		this.pNo = pNo;
	}

	public int getOwnerNo() {
		return ownerNo;
	}

	public void setOwnerNo(int ownerNo) {
		this.ownerNo = ownerNo;
	}

	public int getSubNo() {
		return subNo;
	}

	public void setSubNo(int subNo) {
		this.subNo = subNo;
	}

	public String getRoomKey() {
		return roomKey;
	}

	public void setRoomKey(String roomKey) {
		this.roomKey = roomKey;
	}
}
