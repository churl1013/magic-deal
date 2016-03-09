package kr.co.mdeal.domain;

import java.util.Date;

public class Member {
	private int mNo;
	private String id;
	private String password;
	private String nickName;
	private String mInfo;
	private String joinDate;
	private String mPhoto;
	private int likeCnt;
	private String mAddr;
	private double mLat;
	private double mLon;
	
	public int getmNo() {
		return mNo;
	}
	public void setmNo(int mNo) {
		this.mNo = mNo;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getNickName() {
		return nickName;
	}
	public void setNickName(String nickName) {
		this.nickName = nickName;
	}
	public String getmInfo() {
		return mInfo;
	}
	public void setmInfo(String mInfo) {
		this.mInfo = mInfo;
	}
	public String getJoinDate() {
		return joinDate;
	}
	public void setJoinDate(String joinDate) {
		this.joinDate = joinDate;
	}
	public String getmPhoto() {
		return mPhoto;
	}
	public void setmPhoto(String mPhoto) {
		this.mPhoto = mPhoto;
	}
	public int getLikeCnt() {
		return likeCnt;
	}
	public void setLikeCnt(int likeCnt) {
		this.likeCnt = likeCnt;
	}
	public String getmAddr() {
		return mAddr;
	}
	public void setmAddr(String mAddr) {
		this.mAddr = mAddr;
	}
	public double getmLat() {
		return mLat;
	}
	public void setmLat(double mLat) {
		this.mLat = mLat;
	}
	public double getmLon() {
		return mLon;
	}
	public void setmLon(double mLon) {
		this.mLon = mLon;
	}
}
