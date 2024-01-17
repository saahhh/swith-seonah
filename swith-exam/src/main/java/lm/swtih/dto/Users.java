package lm.swtih.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Users {
	
	private long user_no;
	
	private String email;
	private String nickname;
	private String user_password;
	private String user_name;
	private String user_profile;
	private String user_introduction;
	private String user_role;
}
