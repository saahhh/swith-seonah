package lm.swith.main.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lm.swith.main.mapper.StudyPostMapper;
import lm.swith.main.model.Cafes;
import lm.swith.main.model.Comments;
import lm.swith.main.model.PostTechStacks;
import lm.swith.main.model.StudyApplication;
import lm.swith.main.model.StudyPost;

@Service
public class StudyPostService {
	@Autowired
	private final StudyPostMapper studyPostMapper;
	
    @Autowired
    public StudyPostService(StudyPostMapper studyPostMapper) {
        this.studyPostMapper = studyPostMapper;
    }
	// Main Part
    
    // 스터디 등록하기
	public void insertStudyPost (StudyPost studyPost) {
		studyPostMapper.insertStudyPosts(studyPost);
	}
	
	// 스터디 목록 불러오기	
    public List<StudyPost> getAllStudyPostWithSkills() {
        return studyPostMapper.getAllStudyPostWithSkills();
    }
    
    // 스터디 조건 검색
    public List<StudyPost> getStudiesBySelect(String recruit_type, String study_method, String study_location, Long skill_no) {
        return studyPostMapper.getStudiesBySelect(recruit_type, study_method, study_location, skill_no);
    }
    
    // 스터디 키워드 검색
    public List<StudyPost> getStudiesByKeyword(String keyword) {
        return studyPostMapper.getStudiesByKeyword(keyword);}
    
    
	
    
    
    // Detail Part
    // 스터디 상세 페이지 불러오기
    public StudyPost getStudyPostByPostNo(Long post_no) {
        StudyPost studyPost = studyPostMapper.getStudyPostByPostNo(post_no);

        if (studyPost != null) {
            List<Comments> comments = studyPostMapper.getCommentsByPostNo(post_no);
            studyPost.setComments(comments);
        }

        return studyPost;
    }
    

    // 스터디 수정
    public void updateStudyPost(StudyPost studyPost) {
    	studyPostMapper.updateStudyPost(studyPost);
    }
    
    // 스터디 삭제
    @Transactional
    public void deleteStudyPost(Long post_no) {
    	studyPostMapper.deleteComments(post_no);
    	studyPostMapper.deleteStudyApplication(post_no);
    	studyPostMapper.deletePostTechStacks(post_no);
    	studyPostMapper.deleteStudyPost(post_no);
    }
    
    // 스터디 게시글 작성 내 첫모임 장소 카페 리스트
    public List<Cafes> getAllCafes(String bplcnm, String sitewhladdr, String x, String y) {
        return studyPostMapper.getAllCafes(bplcnm, sitewhladdr, x, y);
    }
    
    // 스터디 게시글 작성 내 첫모임 장소 검색
    public List<Cafes> searchCafes(String keyword) {
        return studyPostMapper.searchCafes(keyword);
    }
    
    // 메인페이지 카페 좌표 가져오기
    public List<Cafes> getLatLngCafes(String bplcnm){
    	return studyPostMapper.getLatLngCafes(bplcnm);
    }
   
    @Transactional
    public void insertTestStudyPost(StudyPost studyPost) {
        try {
            // StudyPost 삽입
            studyPostMapper.insertStudyPosts(studyPost);

            // PostTechStacks 삽입
            System.out.println("Original skill_no list: " + studyPost.getSkill_no());
            List<Long> postTechStacksList = studyPost.getSkill_no();
            System.out.println("postTechStacksList size: " + postTechStacksList.size());
            for (Long skill_no : postTechStacksList) {
                System.out.println("Current skill_no: " + skill_no);
                PostTechStacks postTechStacks = new PostTechStacks();
                postTechStacks.setPost_no(studyPost.getPost_no());
                postTechStacks.setSkill_no(skill_no);
                System.out.println("PostTechStacks skill_no: " + postTechStacks.getSkill_no());
                // PostTechStacks를 삽입
                studyPostMapper.insertPostTechStacks(postTechStacks);
            }

            // StudyApplication 삽입
            StudyApplication studyApplication = new StudyApplication();
            studyApplication.setPost_no(studyPost.getPost_no());
            studyApplication.setUser_no(studyPost.getUser_no());
            studyPostMapper.insertStudyApplication(studyApplication);
        } catch (Exception e) {
            // 롤백 여부 확인을 위해 예외 발생
            throw new RuntimeException("Transaction rolled back", e);
        }
    }
    
    // Comments Part
    // 댓글 등록
    public void insertComment(Comments comments) {
    	studyPostMapper.insertComment(comments);
    }
    
    // 댓글 불러오기
    public List<Comments> getCommentsByPostNo(Long post_no) {
    	return studyPostMapper.getCommentsByPostNo(post_no);
    }
    
    // 댓글 수정
    public void updateComment(Comments comments) {
    	studyPostMapper.updateComment(comments);
    }
    
    
    // 댓글 삭제
    public void deleteComment(Long post_no, Long user_no) {
    	studyPostMapper.deleteComment(post_no, user_no);
    }
}