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
        <ul>
          {attendingStudy && attendingStudy.length > 0 && (
            <li>
              <p>내가 신청한 스터디 목록</p>
              <ul>
                {attendingStudy.map((study, index) => (
                  <li key={index}>
                    {study.study_method}
                    <p>{study.study_title}</p>
                    <p>{study.study_start}</p>
                    <p>{study.user_profile}</p>
                    <ul>
                      {study.studyPostWithSkills.map((skill, skillIndex) => (
                        <li key={skillIndex}>{skill.skill_name}</li>
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
        <ul className="board_box_section">
          {myOwnStudy &&
            myOwnStudy
              // .filter((study) => study.user_no === userData.user_no)
              .map((study, index) => (
                <li key={index}>
                  <p>내가 작성한 스터디 목록</p>
                  {study.study_method}
                  <p>{study.study_title}</p>
                  <p>{study.study_start}</p>
                  <p>{study.user_profile}</p>
                  <ul>
                    {study.studyPostWithSkills.map((skill, skillIndex) => (
                      <li key={skillIndex}>{skill.skill_name}</li>
                    ))}
                  </ul>
                  <br />
                  <br />
                </li>
              ))}
        </ul>
      </div>
      <div>
        <ul className="board_box_section">
          {likedStudy &&
            likedStudy
              // .filter((study) => study.user_no === userData.user_no)
              .map((study, index) => (
                <li key={index}>
                  <p>내가 찜한 스터디 목록</p>
                  {study.study_method}
                  <p>{study.study_title}</p>
                  <p>{study.study_start}</p>
                  <p>{study.user_profile}</p>
                  <ul>
                    {study.studyPostWithSkills.map((skill, skillIndex) => (
                      <li key={skillIndex}>{skill.skill_name}</li>
                    ))}
                  </ul>
                  <br />
                  <br />
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
}

export default MyPage;
