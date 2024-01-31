package lm.swith.main.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lm.swith.main.model.Cafes;
import lm.swith.main.model.Comments;
import lm.swith.main.model.PostTechStacks;
import lm.swith.main.model.StudyApplication;
import lm.swith.main.model.StudyPost;
import lm.swith.main.service.StudyPostService;

@RestController
@RequestMapping("/")
@CrossOrigin(origins="http://localhost:3000", allowCredentials="true", allowedHeaders="*")
public class StudyPostController {
	private final StudyPostService studyPostService;
	
    public StudyPostController(StudyPostService studyPostService) {
        this.studyPostService = studyPostService;
    }
    
	
	// 스터디 목록
    @GetMapping("/post_list")
    public ResponseEntity<List<StudyPost>> getAllStudyPostWithSkills() {
        List<StudyPost> studyPost = studyPostService.getAllStudyPostWithSkills();
        if (studyPost != null) {
            return ResponseEntity.ok(studyPost);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
       

    // 스터디 상세 페이지 + 댓글
    @GetMapping("/post_detail/{post_no}")
    public ResponseEntity<StudyPost> getStudyPostByPostNo(@PathVariable Long post_no) {
        StudyPost studyPost = studyPostService.getStudyPostByPostNo(post_no); 
        List<Comments> comments = studyPostService.getCommentsByPostNo(post_no); // 댓글 목록 조회
        if (studyPost != null) {
            studyPost.setComments(comments); // 스터디 게시물에 댓글 목록 설정
            return ResponseEntity.ok(studyPost);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
	
    // 스터디룸 페이지
 		@GetMapping("/study_room/{post_no}")
 	    public ResponseEntity<StudyPost> getStudyRoomByPostNo(@PathVariable Long post_no) {
 	        StudyPost studyPost = studyPostService.getStudyPostByPostNo(post_no); 
 	        if (studyPost != null) {
 	            return ResponseEntity.ok(studyPost);
 	        } else {
 	            return ResponseEntity.notFound().build();
 	        }
 	    }
    
	// 스터디 등록 페이지
	@GetMapping("/post")
	public String showPostForm (Model model) {
		return "/post_form";
	}
	
	  // 스터디 생성 처리
    @PostMapping("/create")
    public ResponseEntity<?> insertStudyPost(@RequestBody StudyPost studyPost) {
//    	System.out.println("getUser_no : " + studyPost.getUser_no());
//    	System.out.println("getNickname : " +  studyPost.getNickname());
//    	System.out.println(" getStudy_title : " +studyPost.getStudy_title());
//    	System.out.println("getStudy_content : " + studyPost.getStudy_content());
//    	System.out.println("getStudy_method : " + studyPost.getStudy_method());
//    	System.out.println("getRecruit_type : " + studyPost.getRecruit_type());
//    	System.out.println("getStudy_period : " + studyPost.getStudy_period());
//    	System.out.println("getStudy_start : " +studyPost.getStudy_start());
//    	System.out.println("getRecruit_deadline : " +studyPost.getRecruit_deadline());
//    	System.out.println("getStudy_status : " + studyPost.getStudy_status());
//    	System.out.println("getStudy_likes : " +studyPost.getStudy_likes());
//    	System.out.println("getStudy_location : " +studyPost.getStudy_location());
//    	System.out.println("getFirst_study : " + studyPost.getFirst_study());
//    	System.out.println("getStudy_post_time : " +studyPost.getStudy_post_time());
//    	System.out.println("getSkill_no : " + studyPost.getSkill_no());
//    	System.out.println("getPostTechStacks : " + studyPost.getPostTechStacks());
        studyPostService.insertTestStudyPost(studyPost);
        return ResponseEntity.ok("ㅎㅇ");
    }
	
	
 // 스터디 삭제
    @GetMapping("/delete/{post_no}")
    public String deleteStudyPost (@PathVariable Long post_no) {
    	studyPostService.deleteStudyPost(post_no);
        return "/";
    }

	// 스터디 수정 페이지 이동
	@GetMapping("update/{post_no}")
	public String showUpdateFrom (@PathVariable Long post_no, Model model) {
        // 스터디 정보 및 관련 스킬 정보를 불러오는 서비스 메서드 호출
        StudyPost studyPost = studyPostService.getStudyPostByPostNo(post_no);
        model.addAttribute("studyPost", studyPost);
        return "/update_study";
	}
	
	// 스터디 수정 적용
	@PostMapping("update/{post_no}")
	public String updateStudyPost(@ModelAttribute StudyPost studyPost) {
		studyPostService.updateStudyPost(studyPost);
		return "redirect:/post_detail/" + studyPost.getPost_no();
	}
	
	
    // 조건 스터디 목록
    @GetMapping ("/getSelectedList")
    public List<StudyPost> getStudiesBySelect(@RequestParam(required = false) String recruit_type,
                                     @RequestParam(required = false) String study_method,
                                     @RequestParam(required = false) String study_location,
                                     @RequestParam(required = false) Long skill_no) {
    	return studyPostService.getStudiesBySelect(recruit_type, study_method, study_location, skill_no);

    }
    
    
    // 검색 스터디 목록
    @GetMapping("/KeywordStudy")
	public List<StudyPost> getStudiesByKeyword(@RequestParam(required = false) String keyword) { 	  	
    	return studyPostService.getStudiesByKeyword(keyword);
    }
      
    
    // 카페 리스트
    @GetMapping ("/cafe_list")
    public ResponseEntity<List<Cafes>> getAllCafes(String bplcnm, String sitewhladdr, String x, String y) {
        List<Cafes> cafes = studyPostService.getAllCafes(bplcnm, sitewhladdr, x, y);
        return ResponseEntity.ok(cafes);
    }
    
    // 검색 카페 목록
    @GetMapping("/KeywordCafes")
    public List<Cafes> searchCafes(@RequestParam String keyword) {
        return studyPostService.searchCafes(keyword);
    }
    
    //메인페이지 카페 좌표
    @GetMapping("/cafe_xy")
    public ResponseEntity<List<Cafes>> getLatLngCafes(@RequestParam(required = false)String bplcnm) {
    	List<Cafes> cafes = studyPostService.getLatLngCafes(bplcnm);
    	  if (cafes != null) {
              return ResponseEntity.ok(cafes);
          } else {
              return ResponseEntity.notFound().build();
          }
    	}
    // 댓글 등록
    @PostMapping("/add_comment/{post_no}/{user_no}")
    public ResponseEntity<?> addComment(@PathVariable Long post_no, @PathVariable Long user_no, @RequestBody Comments comment) {
        Comments comm = new Comments();
        comm.setUser_no(user_no);
        comm.setPost_no(post_no);
        comm.setComment_no(user_no);
        comm.setComment_content(comment.getComment_content());
        studyPostService.insertComment(comm);
        System.out.println(comment.getComment_content());

        return ResponseEntity.ok("댓글이 등록되었습니다.");
    }
    
    // 댓글 삭제
    @PostMapping("/delete_comment/{post_no}/{user_no}/{comment_no}")
    public String deleteComment(@PathVariable Long post_no, @PathVariable Long user_no, @RequestParam Long comment_no) {
        studyPostService.deleteComment(post_no, user_no, comment_no);
        System.out.println(post_no);
        System.out.println(user_no);
        System.out.println(comment_no);
        return "/";
        
    }
    
    // 댓글 수정
    @PostMapping("/update_comment/{post_no}/{user_no}")
    public String updateComment(@ModelAttribute Comments comments) {
    	studyPostService.updateComment(comments);
    	return "redirect:/post_detail/" + comments.getPost_no();
    }
}