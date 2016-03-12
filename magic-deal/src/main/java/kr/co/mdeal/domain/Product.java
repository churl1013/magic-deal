package kr.co.mdeal.domain;

import java.util.ArrayList;

public class Product {
	private int pNo;
	private int mNo;
	private int pCategorieNo;
	private int price;
	private String pContent;
	private String pRegDate;
	private char dealType;
	private char dealStep;
	private char quality;
	private char dealOpt;
	private String pAddr;
	private double pLat;
	private double pLon;
	private ArrayList<ProductPhoto> thumbnailPhoto;
	private Categorie categorie;
	

	public Categorie getCategorie() {
		return categorie;
	}
	public void setCategorie(Categorie categorie) {
		this.categorie = categorie;
	}
	
	public ArrayList<ProductPhoto> getThumbnailPhoto() {
		return thumbnailPhoto;
	}
	public void setThumbnailPhoto(ArrayList<ProductPhoto> thumbnailPhoto) {
		this.thumbnailPhoto = thumbnailPhoto;
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
	public int getpCategorieNo() {
		return pCategorieNo;
	}
	public void setpCategorieNo(int pCategorieNo) {
		this.pCategorieNo = pCategorieNo;
	}
	public int getPrice() {
		return price;
	}
	public void setPrice(int price) {
		this.price = price;
	}
	public String getpContent() {
		return pContent;
	}
	public void setpContent(String pContent) {
		this.pContent = pContent;
	}
	public String getpRegDate() {
		return pRegDate;
	}
	public void setpRegDate(String pRegDate) {
		this.pRegDate = pRegDate;
	}
	public char getDealType() {
		return dealType;
	}
	public void setDealType(char dealType) {
		this.dealType = dealType;
	}
	public char getDealStep() {
		return dealStep;
	}
	public void setDealStep(char dealStep) {
		this.dealStep = dealStep;
	}
	public char getQuality() {
		return quality;
	}
	public void setQuality(char quality) {
		this.quality = quality;
	}
	public char getDealOpt() {
		return dealOpt;
	}
	public void setDealOpt(char dealOpt) {
		this.dealOpt = dealOpt;
	}
	public String getpAddr() {
		return pAddr;
	}
	public void setpAddr(String pAddr) {
		this.pAddr = pAddr;
	}
	public double getpLat() {
		return pLat;
	}
	public void setpLat(double pLat) {
		this.pLat = pLat;
	}
	public double getpLon() {
		return pLon;
	}
	public void setpLon(double pLon) {
		this.pLon = pLon;
	}
}
