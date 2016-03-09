package kr.co.mdeal.service.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.mdeal.dao.ProductDao;
import kr.co.mdeal.domain.Categorie;
import kr.co.mdeal.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService{
	
	@Autowired
	private ProductDao dao;
	
	@Override
	public List<Categorie> getCategorieKeyword(Categorie cate) {
		// TODO Auto-generated method stub
		return dao.selectCategories(cate);
	}
	
}
