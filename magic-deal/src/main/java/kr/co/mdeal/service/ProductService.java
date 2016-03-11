package kr.co.mdeal.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import kr.co.mdeal.domain.Categorie;
import kr.co.mdeal.domain.Product;
import kr.co.mdeal.domain.ProductPhoto;

public interface ProductService {
	List<Categorie> getCategorieKeyword(Categorie cate);
	void registProduct(Product product, Categorie cate, ArrayList<ProductPhoto> photoList);
	List<HashMap<String, Integer>> getCategorieVolume();
	List<HashMap<String, String>> getCategoriesPhoto();
	ProductPhoto getCategoriePhoto(Categorie cate);
}
