package kr.co.mdeal.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import kr.co.mdeal.domain.Board;
import kr.co.mdeal.domain.BoardComment;
import kr.co.mdeal.domain.BoardPhoto;
import kr.co.mdeal.domain.Criteria;

public interface BoardDao {

	int insertBoard(Board board) ; // 등록
	List<Board> selectList();  // 목록	
	List<Board> boardListPage(Map<String, Object> map); // 목록 + 페이징
	int boardCount(); // 현재 전체 보드 게시글
	Board selectOne(int no); // 상세
	int updateBoard(Board board);  // 수정
	void deleteBoard(int no);  // 삭제
	
	// 이하 댓글 관련 ----------------------
	List<BoardComment> selectCommentList(int bno);  // 댓글 목록
	void  insertComment(BoardComment bcmt);  // 댓글 등록
	BoardComment selectCommentBybcNo(int bcNo);
	int selectCommentMaxbcNo(int bNo);
	void deleteComment(int bcNo);
	int updateComment(BoardComment bcmt);
	ArrayList selectCommentCnt();  // 댓글수 가져오기	
	public void boardAddAttach(BoardPhoto boardPhoto) throws Exception; // board 첨부파일 저장하기

	List<Board> listPage(int page); // test용 페이지	
	List<Board> listCriteria(Map<String, Object> map) throws Exception;	
	public List<BoardComment> replyListPage(Map<String, Object> paramMap) throws Exception;	
	public int count(int bNo) throws Exception;
	int boardbNoMax();  // 새글 입력시 현재 bNo최고 값 가져오기

}
