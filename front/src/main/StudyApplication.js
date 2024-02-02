//참가현황
//유저프로필 - 해당 게시글의 승낙, 거절 기능
//디테일 페이지에 신청버튼 만들어서 연결
import { useState } from "react";
import "../css/StudyDetail.css";

export default function StudyApplication() {
  const [action, setAction] = useState("");

  return (
    <div className="studyApplication">
      <div>스터디 신청 현황</div>
      <div className="commentItem_userImg">유저이름</div>
      <button name="accept">승낙</button>
      <button name="reject">거절</button>
    </div>
  );
}
