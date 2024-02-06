import axios from "axios";
import Header from "./Header";
import React, { useState, useEffect } from "react";
import { Carousel, Pagination } from "react-bootstrap";
import usersUserinfoAxios from "../token/tokenAxios";

function MyPage() {
  const [attendingStudy, setAttendingStudy] = useState([]);
  const [myOwnStudy, setMyOwnStudy] = useState([]);
  const [likedStudy, setLikedStudy] = useState([]);

  // const [currentPage, setCurrentPage] = useState(1);
  // const [attendingStudyPerPage] = useState(2);

  // const indexOfLastAttendingPage = currentPage * attendingStudyPerPage;
  // const indexOfFirstAttendingPage =
  //   indexOfLastAttendingPage - attendingStudyPerPage;
  // const currentAttendingPage = attendingStudy.slice(
  //   indexOfFirstAttendingPage,
  //   indexOfFirstAttendingPage
  // );

  // const handlePageChange = (pageNumber) => {
  //   setAttendingStudy(pageNumber);
  // };

  // 유저 데이터 가져오기
  // 로그인된 유저 = userData
  const [userData, setUserData] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // 서버에 사용자 정보를 가져오는 요청
        const response = await usersUserinfoAxios.get("/users/userinfo");
        setUserData(response.data);
        console.log(userData.user_no);
      } catch (error) {
        console.error("Failed to fetch user data.", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (userData && userData.user_no) {
      const attendingStudies = async () => {
        try {
          const response = await usersUserinfoAxios.get(
            `/attending_studies/${userData.user_no}`
          );
          setAttendingStudy(response.data);

          console.log("response.data[0].user_no : " + response.data[0].user_no);
          console.log("userData.user_no : " + userData.user_no);
        } catch (error) {
          console.log("내가 '신청한' 스터디 목록 가져오기 오류", error);
        }
      };
      attendingStudies();
    }
  }, [userData]);

  useEffect(() => {
    if (userData && userData.user_no) {
      const myOwnStudies = async () => {
        try {
          const response = await usersUserinfoAxios.get(
            `/my_own_studies/${userData.user_no}`
          );
          setMyOwnStudy(response.data);
        } catch (error) {
          console.log("내가 '작성한' 스터디 목록 가져오기 오류", error);
        }
      };
      myOwnStudies();
    }
  }, [userData]);

  useEffect(() => {
    if (userData && userData.user_no) {
      const likedStudies = async () => {
        try {
          const response = await usersUserinfoAxios.get(
            `/liked_studies/${userData.user_no}`
          );
          setLikedStudy(response.data);
        } catch (error) {
          console.log("내가 '찜한' 스터디 목록 가져오기 오류", error);
        }
      };
      likedStudies();
    }
  }, [userData]);

  return (
    <div>
      <Header />
      <div>
        <h1>My Page</h1>
      </div>
      <div>
        <div className="">
          <ul className="mypage_list">
            {attendingStudy && attendingStudy.length > 0 && (
              <li className="">
                <div className="mypageItem_box">
                  <p className="">내가 신청한 스터디 목록</p>
                </div>
                <ul>
                  {attendingStudy.map((study, index) => (
                    <li key={index}>
                      <div className="">
                        <div className="">
                          {"✏️"}
                          {"🍰"}
                          {study.study_method}
                        </div>
                      </div>
                      <h1 className="">{study.study_title}</h1>
                      <div>
                        <p className="">시작일 | {study.study_start}</p>
                      </div>
                      <p>{study.user_profile}</p>
                      <ul className="">
                        {study.studyPostWithSkills.map((skill, skillIndex) => (
                          <li className="" key={skillIndex}>
                            {skill.skill_name}
                          </li>
                        ))}
                      </ul>
                      <br />
                      <br />
                    </li>
                  ))}
                </ul>
              </li>
            )}
          </ul>
        </div>
        <div>
          <ul>
            <div className="mypageItem_box">
              {myOwnStudy &&
                myOwnStudy

                  // .filter((study) => study.user_no === userData.user_no)
                  .map((study, index) => (
                    <li key={index}>
                      <div className="mypage_title_list">
                        <p className="mypage_list_content">
                          내가 작성한 스터디 목록
                        </p>
                      </div>
                      <div className="study_method_badge">
                        <div className="badge_study">{study.study_method}</div>
                      </div>
                      <h1 className="mypage_studyItem_title">
                        {study.study_title}
                      </h1>
                      <div>
                        <p className="mypage_schedule">
                          시작일 | {study.study_start}
                        </p>
                      </div>
                      <p>{study.user_profile}</p>
                      <ul className="mypage_skill_content">
                        {study.studyPostWithSkills.map((skill, skillIndex) => (
                          <li
                            className="mypage_skill_language"
                            key={skillIndex}
                          >
                            {skill.skill_name}
                          </li>
                        ))}
                      </ul>
                      <br />
                      <br />
                    </li>
                  ))}
            </div>
          </ul>
        </div>
        <div>
          <ul>
            <div className="mypageItem_box">
              {likedStudy &&
                likedStudy
                  // .filter((study) => study.user_no === userData.user_no)
                  .map((study, index) => (
                    <li key={index}>
                      <div className="mypage_title_list">
                        <p className="mypage_list_content">
                          내가 찜한 스터디 목록
                        </p>
                      </div>
                      <div className="study_method_badge">
                        <div className="badge_study">
                          {"✏️"}
                          {study.study_method}
                        </div>
                      </div>
                      <h1 className="mypage_studyItem_title">
                        {study.study_title}
                      </h1>
                      <div>
                        <p className="mypage_schedule">
                          시작일 | {study.study_start}
                        </p>
                      </div>
                      <p>{study.user_profile}</p>
                      <ul className="mypage_skill_content">
                        {study.studyPostWithSkills.map((skill, skillIndex) => (
                          <li
                            className="mypage_skill_language"
                            key={skillIndex}
                          >
                            {skill.skill_name}
                          </li>
                        ))}
                      </ul>
                      <br />
                      <br />
                    </li>
                  ))}
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
