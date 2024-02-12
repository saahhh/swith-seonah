import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "./Header";
import "../css/StudyDetail.css";
import "../css/NewBoard.css";
import usersUserinfoAxios from "../token/tokenAxios";
import axios from "axios";
import StudyApplication from "./StudyApplication";
import StudyDetail from "./StudyDetail";

function StudyDetailUpdate() {
  const { post_no } = useParams(); // 동적 라우트 매개변수 가져오기
  const [detailPages, setDetailPage] = useState({
    study_status: "", // 초기값으로 빈 문자열 설정
    max_study_applicants: "",
    // 나머지 데이터도 추가
    // // FormFour에서 온 데이터
    recruit_type: "",
    study_title: "",
    study_content: "",
    // StudyProject에서 온 데이터
    study_method: "",
    study_period: "",

    study_location: "",
    // first_study: "",
    study_start: "",
    recruit_deadline: "",
  });
  const [formFourData, setFormFourData] = useState({
    studyTitle: "",
    studyContent: "",
  });
  // StudyProject에서 사용하는 상태들을 초기화
  const [studyMethod, setStudyMethod] = useState("");

  const [duration, setDuration] = useState(detailPages.study_period);
  const [techStack, setTechStack] = useState(""); // 보류
  const [deadline, setDeadline] = useState(detailPages.recruit_deadline);
  const [region, setRegion] = useState(detailPages.study_location);
  const [study_place, setStudy_place] = useState(detailPages.study_start);
  const [studyStatus, setStudyStatus] = useState("O");
  const [studyLikes, setStudyLikes] = useState("1");
  const [studyLocation, setStudyLocation] = useState("1");
  const [firstStudy, setFirstStudy] = useState("1");
  const [mentorCount, setMentorCount] = useState("");
  const [menteeCount, setMenteeCount] = useState("");
  const [applicationCount, setApplicationCount] = useState(
    detailPages.max_study_applicants
  );
  const [selectedItem1, setSelectedItem1] = useState(null);
  const [submittedData, setSubmittedData] = useState(null);
  const [startDate, setStartDate] = useState("");

  const [updateData, setUpdateData] = useState({
    max_study_applicants: "",
    study_period: "",
    skills: "",
    recruit_deadline: "",
    study_location: "",
    first_study: "",
    study_method: "",
    study_title: "",
    study_content: "",
    study_start: "",
  });

  // 게시글 쓴 유저 = swithUser
  const [swithUser, setSwithUser] = useState("");

  // 유저 데이터 가져오기
  // 로그인된 유저 = userData
  const [userData, setUserData] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // 서버에 사용자 정보를 가져오는 요청
        const response = await usersUserinfoAxios.get("/users/userinfo");
        setUserData(response.data);
        // setUserNo(response.data.user_no); // user_no를 상태에 저장
        console.log("userData.user_role", userData.user_role);
      } catch (error) {
        console.error("Failed to fetch user data.", error);
      }
    };

    fetchUserData();
  }, []);
  const [application, setApplication] = useState([]);
  useEffect(() => {
    const fetchStudyDetail = async () => {
      try {
        const response = await usersUserinfoAxios.get(
          `/update/${post_no}`,

          {
            withCredentials: true,
          }
        );
        setDetailPage(response.data);

        const studyPostTime = response.data.study_post_time;
        setApplication(response.data.studyApplication);
        console.log("detailPages : ", response.data);
        console.log(response.data.comments);
      } catch (error) {
        console.log("Error fetching study detail: ", error);
      }
    };

    fetchStudyDetail();
  }, [post_no]); // post_no가 변경될 때마다 실행

  // 예시용 값 안맞으니깐 보고 직접 다시 바꾸셔요
  const handlePostUpdate = async (e) => {
    e.preventDefault();
    try {
      // 게시물 수정 요청 보내기
      const response = await usersUserinfoAxios.post(
        `/update/${post_no}`,
        {
          recruit_deadline: deadline,
        },
        {
          withCredentials: true,
        }
      );
      setUpdateData(response.data);
      setUpdateData((updateData) => [...updateData, response.data]);
      // window.location.reload();
      console.log("updateData : ", updateData);
      console.log("게시물 수정 완료:", response.data);
    } catch (error) {
      console.error("게시물 수정 실패:", error);
    }
  };

  const [uniqueSkills, setUniqueSkills] = useState([]);
  // studyPostWithSkills에 대한 중복제거 조건문 추가
  const getuniqueSkills = detailPages.studyPostWithSkills && [
    ...new Set(
      detailPages.studyPostWithSkills.map((skill) => skill.skill_name)
    ),
  ];

  return (
    <div>
      <div>
        <input value={detailPages.study_title}></input>
      </div>
      <section>
        <div className="application_totalWrapper">
          <div className="application_totalWrapper_2">
            <div className="application_totalWrapper_3"></div>
          </div>
        </div>
        <ul className="studyContent_grid">
          <li className="studyContent_contentWrapper">
            <span className="studyInfo_title">모집구분</span>
            <span className="studyInfo_title_a">
              <input value={detailPages.recruit_type}></input>
            </span>
          </li>
          <li className="studyContent_contentWrapper">
            <span className="studyInfo_title">진행방식</span>
            <span className="studyInfo_title_a">
              <input value={detailPages.study_method}></input>
            </span>
          </li>
          <li className="studyContent_contentWrapper">
            <span className="studyInfo_title">모집인원</span>
            <span className="studyInfo_title_a">
              <input
                type="number"
                name="max_study_applicants"
                value={application.max_study_applicants}
                onChange={handleInputChangeApp}
              />
            </span>
          </li>
          <li className="studyContent_contentWrapper">
            <span className="studyInfo_title">시작예정일</span>
            <span className="studyInfo_title_a">
              <input
                type="date"
                name="study_start"
                value={study_place} // [study, setStudy] -> value에는 study
                //                    onChange에는 setStudy로
                onChange={(e) => setStudy_place(e.target.value)}
              />
            </span>
          </li>
          <li className="studyContent_contentWrapper">
            <span className="studyInfo_title">예상기간</span>
            <span className="studyInfo_title_a">
              <input
                type="text"
                name="study_period"
                value={detailPages.study_period}
                onChange={handleInputChange}
              />
            </span>
          </li>
          <li className="studyContent_contentWrapper">
            <span className="studyInfo_title">모집마감</span>
            <span className="studyInfo_title_a">
              <input
                type="date"
                name="recruit_deadline"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </span>
          </li>
          <li className="studyContent_contentWrapper">
            <span className="studyInfo_title">지역</span>
            <span className="studyInfo_title_a">
              <input
                type="text"
                name="study_location"
                value={detailPages.study_location}
                onChange={handleInputChange}
              />
            </span>
          </li>
          {detailPages.study_method === "온라인" ? null : (
            <li className="studyContent_contentWrapper">
              <span className="studyInfo_title">첫모임장소</span>
              <span className="studyInfo_title_a">
                <input
                  type="text"
                  name="first_study"
                  value={detailPages.first_study}
                  onChange={handleInputChange}
                />
              </span>
            </li>
          )}
          <li className="studyContent_contentWrapper">
            <span className="studyInfo_title">기술스택</span>
            <span className="studyInfo_title_a">
              <input
                type="text"
                value={getuniqueSkills ? getuniqueSkills.join(", ") : ""}
                onChange={(e) => {
                  // 입력된 값을 배열로 분할하여 uniqueSkills 상태에 설정
                  setUniqueSkills(e.target.value.split(", "));
                }}
              />
            </span>
          </li>
        </ul>
      </section>

      <div className="postContent_wrapper">
        <p className="postInfo"></p>
        <p className="postContent">
          <input value={detailPages.study_content}></input>
        </p>
      </div>
      <button onClick={handlePostUpdate}>게시물 수정</button>
    </div>
  );
}

export default StudyDetailUpdate;
