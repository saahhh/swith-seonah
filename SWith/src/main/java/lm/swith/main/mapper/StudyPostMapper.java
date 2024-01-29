package lm.swith.main.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import lm.swith.main.model.Cafes;
import lm.swith.main.model.Comments;
import lm.swith.main.model.PostTechStacks;
import lm.swith.main.model.StudyApplication;
import lm.swith.main.model.StudyPost;

@Mapper
public interface StudyPostMapper {
	
	// 스터디 목록
	List<StudyPost> getAllStudyPostWithSkills();
	
	// 스터디 등록
	void insertStudyPost (StudyPost studyPost);
	
	// 스터디 삭제
	void deleteStudyPost (Long post_no);
	
	// 스터디 상세 페이지
	StudyPost getStudyPostByPostNo(@Param("post_no") Long post_no);
	
	// 스터디 수정
	void updateStudyPost (StudyPost studyPost);
	
	// 스터디 조건 검색
	List<StudyPost> getStudiesBySelect(String recruit_type, String study_method, String study_location, Long skill_no);
		
	// 스터디 제목+내용 검색
	List<StudyPost> getStudiesByKeyword(String keyword);
	
	// 카페 목록
	List<Cafes> getAllCafes(String bplcnm, String sitewhladdr, String x, String y);

	// 스터디 게시글 작성 내 카페 검색
	List<Cafes> searchCafes(String keyword);
	
	// 메인페이지 카페 좌표 가져오기
	List<Cafes> getLatLngCafes(@Param("bplcnm")String bplcnm); 
	
	
	// 댓글 불러오기
	List<Comments> getCommentsByPostNo(Long post_no);
	

	// test
    void insertStudyPosts(StudyPost studyPost);
    void insertPostTechStacks(PostTechStacks postTechStacks);
    void insertStudyApplication(StudyApplication studyApplication);
	
}