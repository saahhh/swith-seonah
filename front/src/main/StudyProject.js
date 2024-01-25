import React, { useState, useEffect } from "react";
import "../css/NewBoard.css";
import FormFour from "./FormFour";
import usersUserinfoAxios from "../token/tokenAxios";
import axios from "axios";
import Modal from "react-modal";

export default function StuduyProject() {
  const customStyles = {
    content: {
      width: "50%", // 모달의 가로 크기를 조절합니다.
      height: "50%", // 모달의 세로 크기를 조절합니다.
      margin: "auto", // 화면 중앙에 모달을 배치합니다.
    },
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [cafes, setCafes] = useState([]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleButtonClick = () => {
    if (!isModalOpen) {
      openModal();
    } else {
      closeModal();
    }
  };

  const handleSearch = async () => {
    try {
      const response = await usersUserinfoAxios.get(
        `/KeywordCafes?keyword=${keyword}`
      );
      setCafes(response.data);
    } catch (error) {
      console.error("Error searching cafes:", error);
    }
  };
  const handleItemClick = (cafe) => {
    setKeyword(cafe.bplcnm);
    closeModal();
  };
  const [recruitmentCount, setRecruitmentCount] = useState("");

  const [duration, setDuration] = useState("");
  const [techStack, setTechStack] = useState([]);
  const [deadline, setDeadline] = useState("");
  const [startDate, setStartDate] = useState("");
  const [region, setRegion] = useState("");
  const [study_place, setStudy_place] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  const [selectedItem2, setSelectedItem2] = useState(null);

  const handleItem2Click = (item2) => {
    if (selectedItem2 === item2) {
      // 클릭된 아이템이 현재 선택된 아이템과 같으면 선택 해제
      setSelectedItem2(null);
    } else {
      // 아니면 새로운 아이템 선택
      setSelectedItem2(item2);
    }
  };

  return (
    <div>
      <div className="post_1">
        <span className="post_1_title">2</span>
        <h2 className="post_title">S.With 진행 방식을 골라주세요.</h2>
      </div>
      <ul className="postToggle_ul">
        <li
          className={`postToggle ${
            selectedItem2 === "온라인" ? "clicked" : ""
          }`}
          onClick={() => handleItem2Click("온라인")}
        >
          <span className="postToggle_text">온라인</span>
        </li>
        <li
          className={`postToggle ${
            selectedItem2 === "오프라인" ? "clicked" : ""
          }`}
          onClick={() => handleItem2Click("오프라인")}
        >
          <span className="postToggle_text">오프라인</span>
        </li>
        <li
          className={`postToggle ${
            selectedItem2 === "온/오프병행" ? "clicked" : ""
          }`}
          onClick={() => handleItem2Click("온/오프병행")}
        >
          <span className="postToggle_text">온/오프병행</span>
        </li>
      </ul>
      <br />
      <br />
      <div className="post_1">
        <span className="post_1_title">3</span>
        <h2 className="post_title">S.With 기본 정보를 입력해주세요.</h2>
      </div>
      <form onSubmit={handleFormSubmit} className="all_form">
        <div className="all_form_div">
          <label className="post_3_label">
            모집인원 :
            <input
              type="number"
              value={recruitmentCount}
              onChange={(e) => setRecruitmentCount(e.target.value)}
            />
          </label>

          <label className="post_3_label">
            진행기간 :
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </label>

          <label className="post_3_label">
            기술스택 :
            <select
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
            >
              <option value="Angular">Angular</option>
              <option value="bell">bell</option>
              <option value="C">C</option>
              <option value="C++">C++</option>
              <option value="Django">Django</option>
              <option value="Docker">Docker</option>
              <option value="Express">Express</option>
              <option value="Figma">Figma</option>
              <option value="Firebase">Firebase</option>
              <option value="Flask">Flask</option>
              <option value="Flask">Flutter</option>
              <option value="Flask">Git</option>
              <option value="Flask">Go</option>
              <option value="Flask">GraphQL</option>
              <option value="Flask">Java Script</option>
              <option value="Flask">Java</option>
              <option value="Flask">Kubernetes</option>
              <option value="Flask">MongoDB</option>
              <option value="Flask">mySql</option>
              <option value="Flask">NestJS</option>
              <option value="Flask">NodeJS</option>
              <option value="Flask">Php</option>
              <option value="Flask">Python</option>
              <option value="Flask">R</option>
              <option value="Flask">React</option>
              <option value="Flask">React Native</option>
              <option value="Flask">Spring</option>
              <option value="Flask">Svelte</option>
              <option value="Flask">Swift</option>
              <option value="Flask">Type Script</option>
              <option value="Flask">Unity</option>
              <option value="Flask">Vue</option>
              <option value="Flask">Zeplin</option>
            </select>
          </label>

          <label className="post_3_label">
            모집마감 :
            <input
              type="text"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </label>
          <label className="post_3_label">
            지역구분 :
            <select value={region} onChange={(e) => setRegion(e.target.value)}>
              <option value="Gangnam">강남/역삼/삼성</option>
              <option value="Sinsa">신사/청담/압구정</option>
              <option value="Seocho">서초/교대/사당</option>
              <option value="Jamsil">잠실/송파/강동</option>
              <option value="Euljiro">을지로/명동/중구/동대문</option>
              <option value="SeoulStation">서울역/이태원/용산</option>
              <option value="Jonro">종로/인사동</option>
              <option value="Hongdae">홍대/합정/마포/서대문</option>
              <option value="Yeouido">여의도</option>
              <option value="Guro">구로/신도림/금천</option>
              <option value="KonkukUniversity">건대입구/성수/왕십리</option>
              <option value="Seongbuk">성북/강북/노원/도봉</option>
              <option value="Etc">기타</option>
            </select>
          </label>
          {selectedItem2 === "오프라인" || selectedItem2 === "온/오프병행" ? (
            <label className="post_3_label">
              첫모임장소 :
              <div className="cafeModal">
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="cafeSearchInput"
                  placeholder="카페이름이나 지역을 입력하세요."
                />
                <button
                  onClick={() => {
                    handleButtonClick();
                    handleSearch();
                  }}
                >
                  Search
                </button>
                <div>
                  <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                  >
                    <button
                      onClick={() => {
                        closeModal();
                      }}
                      id="modalCloseBtn"
                    >
                      ✖
                    </button>
                    <ul>
                      {cafes.map((cafe) => (
                        <li
                          key={cafe.id}
                          onClick={() => handleItemClick(cafe)}
                          className="cafe_p"
                        >
                          <p className="cafe_p">
                            {cafe.bplcnm} ( {cafe.sitewhladdr} )
                          </p>
                        </li>
                      ))}
                    </ul>
                  </Modal>
                </div>
              </div>
            </label>
          ) : null}
        </div>
      </form>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <FormFour />
    </div>
  );
}
