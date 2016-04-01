package kr.co.mdeal.service.serviceImpl;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.mdeal.dao.BoardDao;
import kr.co.mdeal.domain.Board;
import kr.co.mdeal.domain.BoardComment;
import kr.co.mdeal.domain.BoardPhoto;
import kr.co.mdeal.domain.Criteria;
import kr.co.mdeal.service.BoardService;

@Service
public class BoardServiceImpl implements BoardService{
	
	@Autowired
	private BoardDao boardDAO;
	
	
	public void registBoard(Board board) {
		boardDAO.insertBoard(board);		
	}
	
	// page board all list
	public List<Board> boardListPage(Criteria cri) throws Exception {
		Map<String, Object> map = new HashMap<>();
		map.put("cri", cri);
		return boardDAO.boardListPage(map);
	}
	
	// all board count
	public int countAllBoard() {		
		return boardDAO.boardCount();
	}

	public List<Board> selectList() {		
		return boardDAO.selectList();
	}

	public Board selectOne(int no) {		
		return boardDAO.selectOne(no);
	}

	public void updateBoard(Board board) {
		boardDAO.updateBoard(board);		
	}

	public void deleteBoard(int no) {
		boardDAO.deleteBoard(no);		
	}
	
	// 이하 댓글 관련 -------------------------------

	public List<BoardComment> selectCommentList(int bno) {		
		return boardDAO.selectCommentList(bno);
	}

	public BoardComment registComment(BoardComment bcmt) {				
		 boardDAO.insertComment(bcmt);
		 return bcmt;
	}

//	public BoardComment selectCommentBybNo(int getbNo) {		
//		return boardDAO.selectCommentBybNo(getbNo);
//	}

	public int selectCommentMaxbcNo(int bNo) {		
		return boardDAO.selectCommentMaxbcNo(bNo);
	}

	public void deleteComment(int bcNo) {
		boardDAO.deleteComment(bcNo);		
	}

	public void updateComment(BoardComment bcmt) {		
		 boardDAO.updateComment(bcmt);
	}
	
	// 첨부파일 저장
	public void boardAddAttach(BoardPhoto boardPhoto) throws Exception{
		boardDAO.boardAddAttach(boardPhoto);
	}
	
	// paging test 
	public List<Board> lisPage(int page) {
		return boardDAO.listPage(page);
	}
	

	
	public List<BoardComment> replyListPage(int bNo, Criteria cri) throws Exception{
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("bNo", bNo);
		paramMap.put("cri", cri);
		return boardDAO.replyListPage(paramMap);
	}
	public int count(int bNo) throws Exception{
		return boardDAO.count(bNo);
	}

	public int boardbNoMax() {
		
		return boardDAO.boardbNoMax();
	}

	



}
