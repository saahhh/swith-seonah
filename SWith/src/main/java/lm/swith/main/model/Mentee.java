package lm.swith.main.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Mentee {
	private Long mentee_no;
	private Long uesr_no;
	private Long post_no;
	private int max_mentee_applicants;
	private String mentee_status;
}
