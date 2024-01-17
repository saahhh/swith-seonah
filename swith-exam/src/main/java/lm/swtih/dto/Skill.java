package lm.swtih.dto;

import java.sql.Blob;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Skill {
	
	private long skill_no;
	private String skill_name;
	private Blob skill_img;
}
