package kr.co.mdeal.dao;

import java.util.List;

import kr.co.mdeal.domain.Categorie;
import kr.co.mdeal.domain.Product;
import kr.co.mdeal.domain.ProductPhoto;

public interface ProductDao {
	
	List<Categorie> selectCategories(Categorie cate);
	void insertCategorie(Categorie cate);
	void insertProduct(Product product);
	void insertProductPhoto(ProductPhoto photo);
}
