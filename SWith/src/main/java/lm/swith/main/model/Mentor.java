package lm.swith.main.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Mentor {
	private Long mentor_no;
	private Long uesr_no;
	private Long post_no;
	private int max_mentor_applicants;
	private String mentor_status;
}
