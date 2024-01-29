import React, { useState, useEffect } from "react";
import "../css/NewBoard.css";
import DeleteIcon from "./img/delete.png";
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
      // 선택된 기술스택 제거
      setTechStack(techStack.filter((tech) => tech !== item2));
    } else {
      // 아니면 새로운 아이템 선택
      setSelectedItem2(item2);
    }
  };

  // 기술스택 state를 배열로 변경
  const [techStack, setTechStack] = useState([]);

  const handleTechStackChange = (e) => {
    const selectedTech = e.target.value;

    // 이미 선택된 기술스택이 있는지 확인
    if (techStack.includes(selectedTech)) {
      // 이미 선택된 경우, 해당 기술스택을 배열에서 제거
      setTechStack(techStack.filter((tech) => tech !== selectedTech));
    } else if (techStack.length < 5) {
      // 선택된 기술스택이 5개 미만인 경우에만 추가
      setTechStack([...techStack, selectedTech]);
    } else {
      // 5개를 넘을 경우 알림창 표시
      alert("최대 5개까지만 선택 가능합니다.");
    }
  };

  const handleDeleteTech = (deletedTech) => {
    setTechStack(techStack.filter((tech) => tech !== deletedTech));
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
            모집마감 :
            <input
              type="text"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </label>

          <label className="post_3_label">
            기술스택 :
            <select value={techStack} onChange={handleTechStackChange}>
              <option>기술스택을 선택하세요</option>
              <option value={1}>Angular</option>
              <option value={2}>C</option>
              <option value={3}>C++</option>
              <option value={4}>Django</option>
              <option value={5}>Docker</option>
              <option value={6}>Express</option>
              <option value={7}>Figma</option>
              <option value={8}>Firebase</option>
              <option value={9}>Flask</option>
              <option value={10}>Flutter</option>
              <option value={11}>Git</option>
              <option value={12}>Go</option>
              <option value={13}>GraphQL</option>
              <option value={14}>Java Script</option>
              <option value={15}>Java</option>
              <option value={16}>Kubernetes</option>
              <option value={17}>MongoDB</option>
              <option value={18}>mySql</option>
              <option value={19}>NestJS</option>
              <option value={20}>NodeJS</option>
              <option value={21}>Php</option>
              <option value={22}>Python</option>
              <option value={23}>R</option>
              <option value={24}>React</option>
              <option value={25}>React Native</option>
              <option value={26}>Spring</option>
              <option value={27}>Svelte</option>
              <option value={28}>Swift</option>
              <option value={29}>Type Script</option>
              <option value={30}>Unity</option>
              <option value={31}>Vue</option>
              <option value={32}>Zeplin</option>

              {/* Add more options as needed */}
            </select>
          </label>

          <label className="stack_box">
            <div className="selected">
              <br />
              {techStack.map((stack, index) => (
                <div className="selected_2" key={index}>
                  <div className="tech-stack-item">{stack}</div>

                  <img
                    src={DeleteIcon}
                    className="delete_img"
                    alt="deleteButton"
                    onClick={() => handleDeleteTech(stack)}
                  />
                </div>
              ))}
            </div>
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
