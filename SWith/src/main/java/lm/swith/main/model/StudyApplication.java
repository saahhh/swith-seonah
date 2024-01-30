package lm.swith.main.model;

import lombok.*;

@Getter @Setter
public class StudyApplication {
	private Long post_no;
	private Long user_no;
	private String status;
	private Long max_study_applicants;
}