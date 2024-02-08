package lm.swith.alarm.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lm.swith.alarm.model.Alarm;
import lm.swith.alarm.service.AlarmService;
import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins="http://localhost:3000", allowCredentials="true", allowedHeaders="*")
@RequiredArgsConstructor
public class AlarmController {
	private final AlarmService alarmService;
	
	
	@GetMapping("/alarm_List/{user_no}")
	public ResponseEntity<?> getAlarmByUserNo(@PathVariable Long user_no){
		List<Alarm> alarm = alarmService.getAlarmByUserNo(user_no);
		if(!alarm.isEmpty()) {
			return ResponseEntity.ok(alarm);	
		}else {
			return ResponseEntity.ok("error");
		}	
	}
	
	@PostMapping("/add_alarm")
	public ResponseEntity<?> InsertAlarm(@RequestBody Alarm alarm){
		System.out.println(alarm.getAlarm_message());
		System.out.println(alarm.getPost_no());
		System.out.println(alarm.getUser_no());
		alarmService.InsertAlarm(alarm);
		return ResponseEntity.ok("success");
	}
}
