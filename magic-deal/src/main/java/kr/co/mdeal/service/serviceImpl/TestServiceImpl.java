package kr.co.mdeal.service.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.mdeal.dao.TestDao;
import kr.co.mdeal.domain.Test;
import kr.co.mdeal.service.TestService;

@Service
public class TestServiceImpl implements TestService{
	
	@Autowired
	private TestDao dao;
	
	@Override
	public void insertData(Test t) {
		// TODO Auto-generated method stub
		dao.insert(t);
	}
	
	@Override
	public List<Test> selectData() {
		// TODO Auto-generated method stub
		return dao.selectList();
	}
}
