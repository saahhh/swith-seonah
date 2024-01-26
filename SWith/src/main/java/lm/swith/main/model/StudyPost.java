package lm.swith.main.model;

import java.sql.Date;
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
	private Date study_start;
	private Date recruit_deadline;
	private char study_status;
	private Long study_likes;
	private String study_location;
	private String first_study;
	private Date study_post_time;
    private int mentorCount;
    private int menteeCount;
    private int applicationCount;
    private String skill_name;

	
	private List<Skill> studyPostWithSkills;
	
	private Users user;
	
    private Mentor mentor;
    private Mentee mentee;
    private StudyApplication studyApplication;

}