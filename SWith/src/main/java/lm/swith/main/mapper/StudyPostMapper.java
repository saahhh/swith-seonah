package lm.swith.main.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import lm.swith.main.model.Cafes;
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
	List<StudyPost> getStudiesBySearch(String study_title, String study_content);
	
	// 스터디 게시글 작성 내 첫모임 장소 카페 리스트
	List<Cafes> findAllCafes();

	// 스터디 게시글 작성 내 카페 검색
	List<Cafes> searchCafes(String keyword);
	
}