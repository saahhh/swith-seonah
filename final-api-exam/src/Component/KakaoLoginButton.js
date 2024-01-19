import React from "react";
import axios from "axios";

const handleKakaoLogin = async () => {
  try {
    // 서버로 Kakao 인증 코드 요청
    const response = await axios.get("http://localhost:8080/kakao/login", {
      withCredentials: true,
    });
    // 서버에서 받은 응답으로 Kakao 로그인 페이지로 리다이렉션
    window.location.href = response.data;
  } catch (error) {
    console.error("Kakao 로그인 중 오류 발생:", error);
  }
  return (
    <div>
      <button onClick={handleKakaoLogin}>Kakao Login</button>
    </div>
  );
};

export default handleKakaoLogin;
