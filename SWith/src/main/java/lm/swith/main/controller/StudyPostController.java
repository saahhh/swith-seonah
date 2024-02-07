package lm.swith.main.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
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
import lm.swith.main.model.Likes;
import lm.swith.main.model.StudyApplication;
import lm.swith.main.model.StudyPost;
import lm.swith.main.service.StudyPostService;
import lm.swith.user.model.SwithUser;

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
        studyPostService.runUpdateStudyStatus();
        studyPostService.updateStudyStatus();
        if (!studyPost.isEmpty()) {
            return ResponseEntity.ok(studyPost);
        } else {
            return ResponseEntity.noContent().build();
        }
    }

    // 찜하기
    @PostMapping("/likesUpdate")
    public String likesUpdate( @RequestParam("SwithUser_no") Long SwithUser_no, @RequestParam("post_no") Long post_no) {
        studyPostService.likesUpdate(SwithUser_no, post_no);
        return "redirect:/post_list";
    }
    
    @GetMapping("/likesUpdate")
    public ResponseEntity<Boolean> isLiked(
            @RequestParam("SwithUser_no") Long SwithUser_no,
            @RequestParam("post_no") Long post_no) {
        
        List<Likes> likesList = studyPostService.isLiked(post_no, SwithUser_no);

        // 해당 post_no와 SwithUser_no에 대한 레코드가 존재하는지 여부 확인
        boolean isLiked = !likesList.isEmpty();

        return ResponseEntity.ok(isLiked);
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
    

	// 스터디 등록 페이지
	@GetMapping("/post")
	public String showPostForm (Model model) {
		return "/post_form";
	}
	
	// 스터디 신청
	@PostMapping("/add_applicants")
	public String addSwithUsersByPostNo ( @RequestParam("SwithUser_no") Long SwithUser_no, @RequestParam("post_no") Long post_no) {
		studyPostService.addUsersByPostNo(post_no, SwithUser_no);
		return "redirect:/post_detail/" + post_no;
	}
	
	

	// 스터디 신청자 목록
	@GetMapping("/application_update/{post_no}")
    public ResponseEntity<List<StudyApplication>> getAllApplicantsByPostNo(@PathVariable Long post_no) {
        List<StudyApplication> studyApplicants = studyPostService.getAllApplicants2(post_no);
        if (!studyApplicants.isEmpty()) {
            return ResponseEntity.ok(studyApplicants);
        } else {
            return ResponseEntity.noContent().build();
        }
    }
	
	// 스터디 신청 목록 업데이트 (승인/거절)
		@PostMapping("/application_update/{post_no}/{SwithUser_no}")
		public ResponseEntity<List<StudyApplication>> updateApplication(
				@PathVariable("post_no") Long post_no,
				@PathVariable("SwithUser_no") Long SwithUser_no,
				@RequestParam("action") String action) { // action은 HTTP 요청에서 "action"이라는 이름의 파라미터를 String 타입으로 받아옴 (accept 혹은 reject로)
		    List<StudyApplication> studyApplication = studyPostService.getAllApplicants(post_no);
	  
		    try {
		        boolean accept = true;
		        System.out.println("action: " + action);
		        if ("accept".equals(action)) {
		        
		            studyPostService.updateApplicantsStatus(SwithUser_no, post_no, accept);
		            List<StudyApplication> updatedApplications = studyPostService.getAllApplicants(post_no);
		            
		            return ResponseEntity.ok(updatedApplications); // 처리 성공
		        } else if("reject".equals(action)) {
		        	System.out.println("여기는 거절");
		            accept = false;
		            studyPostService.updateApplicantsStatus(SwithUser_no, post_no, accept);
		            List<StudyApplication> updatedApplications = studyPostService.getAllApplicants(post_no);
		            
		            return ResponseEntity.ok(updatedApplications); // 처리 성공
		        } else {
		        	 return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		        }
		        
		    } catch (Exception e) {
		        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); // 예외인 경우 HTTP 500 서버 에러 오류 상태코드 반환
		    }
		}

	
	  // 댓글 등록
    @PostMapping("/add_comment/{post_no}/{SwithUser_no}")
    public ResponseEntity<?> addComment(@PathVariable Long post_no, @PathVariable Long SwithUser_no, @RequestBody Comments comment) {
        Comments comm = new Comments();
        comm.setUser_no(SwithUser_no);
        comm.setPost_no(post_no);
        comm.setComment_no(SwithUser_no);
        comm.setComment_content(comment.getComment_content());
        studyPostService.insertComment(comm);
//        System.out.println(comment.getComment_content());

        return ResponseEntity.ok("댓글이 등록되었습니다.");
    }
    
    // 댓글 삭제
    @DeleteMapping("/delete_comment/{post_no}/{SwithUser_no}/{comment_no}")
    public String deleteComment(@PathVariable Long post_no, @PathVariable Long SwithUser_no, @PathVariable Long comment_no) {
        studyPostService.deleteComment(post_no, SwithUser_no, comment_no);
//        System.out.println(post_no);
//        System.out.println(SwithUser_no);
//        System.out.println(comment_no);
        return "redirect:/post_detail/" + post_no;
    }
    
    // 댓글 수정
    @PostMapping("/update_comment/{post_no}/{SwithUser_no}/{comment_no}")
    public String updateComment(@PathVariable Long post_no, @PathVariable Long SwithUser_no, @PathVariable Long comment_no ,@RequestBody Comments comments) {
//    	System.out.println(comment_no + " comment_no");
//    	System.out.println(post_no + " post");
//    	System.out.println(SwithUser_no + " SwithUser");
//    	System.out.println(comments.getComment_content() + " 내용!!!");
        studyPostService.updateComment(post_no, SwithUser_no, comment_no, comments.getComment_content());
        return "redirect:/post_detail/";
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
    
	
    // 스터디 생성 처리
     @PostMapping("/create")
     public String insertStudyPost(@RequestBody StudyPost studyPost) {
         studyPostService.insertStudyPost(studyPost);
         return "redirect:/";
     }
	
     // 내가 쓴 스터디 목록
     @GetMapping("/my_own_studies/{SwithUser_no}")
     public ResponseEntity<List<StudyPost>> getOwnStudiesWithSwithUserNo(@PathVariable Long SwithUser_no) {
     	List<StudyPost> studyPost = studyPostService.getAllStudiesWithUserNo(SwithUser_no);
         if (studyPost != null  && !studyPost.isEmpty()) {
             return ResponseEntity.ok(studyPost);
         } else {
             return ResponseEntity.noContent().build();
         }
     }
     
     
     // 찜한 스터디 목록
     @GetMapping("/liked_studies/{SwithUser_no}")
     public ResponseEntity<List<StudyPost>> getAllStudiesWithLikes(@PathVariable Long SwithUser_no) {
     	List<StudyPost> studyPost = studyPostService.getAllStudiesWithLikes(SwithUser_no);
         if (studyPost != null ) {
             return ResponseEntity.ok(studyPost);
         } else {
             return ResponseEntity.noContent().build();
         }
     }
     
     
     // 내가 참여한 스터디 목록
     @GetMapping("/attending_studies/{SwithUser_no}")
     public ResponseEntity<List<StudyPost>> getAllStudiesWithSwithUserNo(@PathVariable Long SwithUser_no) {
     	List<StudyPost> studyPost = studyPostService.getAllStudiesWithUserNo(SwithUser_no);
         if (!studyPost.isEmpty()) {
             return ResponseEntity.ok(studyPost);
         } else {
             return ResponseEntity.noContent().build();
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
    
	
    // 스터디 삭제
    @GetMapping("/delete/{post_no}")
    public String deleteStudyPost (@PathVariable Long post_no) {
    	studyPostService.deleteStudyPost(post_no);
        return "/";
    }

	// 스터디 수정 페이지 이동
	@GetMapping("/update/{post_no}")
	public String showUpdateFrom (@PathVariable Long post_no, Model model) {
        // 스터디 정보 및 관련 스킬 정보를 불러오는 서비스 메서드 호출
        StudyPost studyPost = studyPostService.getStudyPostByPostNo(post_no);
        model.addAttribute("studyPost", studyPost);
        return "/update_study";
	}
	
	// 스터디 수정 적용
	@PostMapping("/update/{post_no}")
	public String updateStudyPost(@ModelAttribute StudyPost studyPost, @PathVariable Long post_no) {
		  // 스터디 정보 및 관련 스킬 정보를 불러오는 서비스 메서드 호출
        studyPostService.getStudyPostByPostNo(post_no);
		studyPostService.updateStudyPost(studyPost);
		return "redirect:/post_detail/" + studyPost.getPost_no();
	}
	
	
	
	// 조건 스터디 목록    
    @GetMapping("/getSelectedList")
    public ResponseEntity<List<StudyPost>> getStudiesBySelect(@RequestParam Map<String, Object> params) {
        List<StudyPost> studyPost = studyPostService.getStudiesBySelect(params);
        if (!studyPost.isEmpty()) {
            return ResponseEntity.ok(studyPost);
        } else {
            return ResponseEntity.noContent().build();
        }
    }
    
    // 검색 스터디 목록
    @GetMapping("/KeywordStudy")
	public List<StudyPost> getStudiesByKeyword(@RequestParam(required = false) String keyword) { 	  	
    	return studyPostService.getStudiesByKeyword(keyword);
    }
      
    
    // 유저 프로필
    @GetMapping("/userProfile/{user_no}")
    public ResponseEntity<SwithUser> getSwithUserBySwithUserNo (@PathVariable Long user_no) {
    	SwithUser user = studyPostService.getUserByUserNo(user_no);
    	return ResponseEntity.ok(user);
    }

 // Admin Part
 	// 닉네임 검색 스터디 목록
 	@GetMapping("/nicknameStudies")
 	public List<StudyPost> getStudiesByNickname(@RequestParam(required = true) String nickname) {
 		return studyPostService.getStudiesByNickname(nickname);
 	}
 		
 	// 닉네임 검색 댓글 목록
 	@GetMapping("/nicknameComments")
 	public List<Comments> getCommentsByNickname(@RequestParam(required = false) String nickname) {
 		return studyPostService.getCommentsByNickname(nickname);
 	}
 	
 	// 유저 삭제
 	@DeleteMapping("/delete_comment/{nickname}")
 	public String deleteSwithUser(@PathVariable String nickname) {
 		studyPostService.deleteUser(nickname);
 		return "redirect:/nicknameStudies/" + nickname;
 	}

  
}