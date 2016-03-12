package kr.co.mdeal.dao;

import java.util.HashMap;
import java.util.List;

import kr.co.mdeal.domain.Categorie;
import kr.co.mdeal.domain.Product;
import kr.co.mdeal.domain.ProductPhoto;

public interface ProductDao {
	
	List<Categorie> selectCategories(Categorie cate);
	void insertCategorie(Categorie cate);
	void insertProduct(Product product);
	void insertProductPhoto(ProductPhoto photo);
	List<HashMap<String, Integer>> selectHighCateCount();
	List<HashMap<String, String>> selectCategoriesPhoto();
	ProductPhoto selectCategoriePhoto(Categorie cate);
	List<HashMap<String, Object>> selectProductList(Categorie cate);
}
