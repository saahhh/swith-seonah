package lm.swith.main.model;


import java.sql.Date;
import java.sql.Timestamp;

import java.util.List;

import lombok.Getter;
import lombok.Setter;


@Getter @Setter
public class StudyPost {
	private Long post_no;
	private Long user_no;
	private Long comment_no;
	private String nickname;
	private String study_title;
	private String study_content;
	private String study_method;
	private String recruit_type;
	private String study_period;
	private String study_start;
	private String recruit_deadline;
	private String study_status;
	private String study_location;
	private String first_study;
	private Timestamp  study_post_time;
    private int mentor_count;
    private int mentee_count;
    private int application_count;
    private int likes_count; // likes count
    private List<Long> skill_no;
    private List<PostTechStacks> postTechStacks; 
    private String study_likes;
    
    private List<Skill> studyPostWithSkills;
    private String skill_name; // join 했을 때 skill 이름 받을 곳
    private String skill_img; // join 했을 때 skill img 받을 곳
    
    private List<Comments> comments; // 댓글들 담을 곳
    private Long commnet_no;
    private String commnet_content;
	
	private Users user; // 유저 테이블
	private Likes likes; // 찜 테이블
	
    private Mentor mentor; // 멘토 테이블
    private Mentee mentee; // 멘티 테이블
    private StudyApplication studyApplication; // 스터디 참가 현황 테이블
}