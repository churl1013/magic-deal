package kr.co.mdeal.service;


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

public interface BoardService {
		
	 void registBoard(Board board);	
	// page board all list
	 List<Board> boardListPage(Criteria cri) throws Exception;		
	// all board count
	 int countAllBoard();	
	 List<Board> selectList() ;	
	 Board selectOne(int no) ;	
	 void updateBoard(Board board);			
	 void deleteBoard(int no) ;		
		
	// 이하 댓글 관련 -------------------------------
	 List<BoardComment> selectCommentList(int bno) ;
	 BoardComment registComment(BoardComment bcmt) ;
	 int selectCommentMaxbcNo(int bNo);	
	 void deleteComment(int bcNo);		
	 void updateComment(BoardComment bcmt) ;
		
	// 첨부파일 저장
	 void boardAddAttach(BoardPhoto boardPhoto) throws Exception;	
	// paging test 
	List<Board> lisPage(int page) ;		
	 List<BoardComment> replyListPage(int bNo, Criteria cri) throws Exception;
	int count(int bNo) throws Exception;
	int boardbNoMax() ;

}
