package lm.swith.main.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import lm.swith.main.model.Cafes;
import lm.swith.main.model.Comments;
import lm.swith.main.model.PostTechStacks;
import lm.swith.main.model.Skill;
import lm.swith.main.model.StudyApplication;
import lm.swith.main.model.StudyPost;

@Mapper
public interface StudyPostMapper {
	
	// 스터디 목록
	List<StudyPost> getAllStudyPostWithSkills();
	
	// 스터디 등록
    void insertStudyPosts(StudyPost studyPost);
    void insertPostTechStacks(PostTechStacks postTechStacks);
   
    void insertSkill(List<Skill> skill);
    void insertStudyApplication(StudyApplication studyApplication);
	
	// 스터디 삭제
	void deleteStudyPost (@Param("post_no") Long post_no);
	void deleteComments(@Param("post_no") Long post_no);
	void deleteStudyApplication(@Param("post_no") Long post_no);
	void deletePostTechStacks(@Param("post_no") Long post_no);
	
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
	
	// Comment Part

		// 댓글 등록
		void insertComment (Comments comments);
		
		// 댓글 목록
		List<Comments> getCommentsByPostNo(@Param("post_no") Long post_no);
		
		// 댓글 수정
		void updateComment (Comments comments);
		
		// 댓글 삭제
		void deleteComment(@Param("post_no") Long post_no, @Param("user_no") Long user_no, @Param("comment_no") Long comment_no);

	
}