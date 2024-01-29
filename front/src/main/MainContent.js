import { useState, useEffect, useRef } from "react";
import "../css/MainPageCss.css";
import KakaoMap from "./KakaoMap";
import "../css/KakaoMap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HeartButton from "./HeartButton";
import SearchIcon from "./img/search.png";
import DeleteIcon from "./img/delete.png";
import axios from "axios";
import usersUserinfoAxios from "../token/tokenAxios";
import StudyDetail from "./StudyDetail";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useParams, Link } from "react-router-dom";

function MainContent() {
  const [isSkillVisible, setSkillVisible] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState([]);

  const [isCityVisible, setCityVisible] = useState(false);
  const [selectedCity, setSelectedCity] = useState([]);

  const [isRecruitVisible, setRecruitVisible] = useState(false);
  const [selectedRecruit, setSelectedRecruit] = useState([]);

  const [isMethodVisible, setMethodVisible] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState([]);

  const [like, setLike] = useState(false);

  const [filteredBoards, setFilteredBoards] = useState([]);
  const modalEl = useRef();

  useEffect(() => {
    if (modalEl.current && isSkillVisible) {
      // modalEl이 정의되었고, isSkillVisible이 true일 때만 ref를 적용
      // 예를 들어, modalEl.current를 출력하여 확인할 수 있습니다.
      console.log(modalEl.current);
    }
  }, [isSkillVisible]);

  const handleClickOutside = ({ target }) => {
    if (isSkillVisible && !modalEl.current.contains(target))
      toggleContentSkill(); // 이미 토글 처리 함수 사용
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const [boards, setBoards] = useState([]);
  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await usersUserinfoAxios.get("/post_list");
        setBoards(response.data);
      } catch (error) {
        console.error("Error fetching boards:", error);
      }
    };
    fetchBoards();
  }, []);

  const [userData, setUserData] = useState("");
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // 서버에 사용자 정보를 가져오는 요청
        const response = await usersUserinfoAxios.get("/users/userinfo");
        setUserData(response.data);
        console.log(userData);
      } catch (error) {
        console.error("Failed to fetch user data.", error);
      }
    };

    fetchUserData();
  }, []);

  const toggleContentSkill = (skill) => {
    setSkillVisible(!isSkillVisible);
    if (skill) {
      setSelectedSkill([skill.skill_name]); // 객체의 프로퍼티를 사용하여 스킬 이름을 선택된 스킬로 설정
    }
  };

  const toggleContentCity = (city) => {
    setCityVisible(!isCityVisible);
    if (city) {
      setSelectedCity([city]); // 선택된 도시로 설정
    }
  };

  const toggleContentRecruit = (recruit) => {
    setRecruitVisible(!isRecruitVisible);
    if (recruit) {
      setSelectedRecruit([recruit]); // 선택된 모집구분으로 설정
    }
  };

  const toggleContentMethod = (method) => {
    setMethodVisible(!isMethodVisible);
    if (method) {
      setSelectedMethod([method]); // 선택된 진행방식으로 설정
    }
  };
  // 클릭된 상태를 관리하는 배열 추가
  const [clickedSkills, setClickedSkills] = useState([]);
  const [clickedCity, setClickedCity] = useState("");
  const [clickedRecruit, setClickedRecruit] = useState("");
  const [clickedMethod, setClickedMethod] = useState("");

  const [keyword, setKeyword] = useState("");

  const handleSearch = async () => {
    try {
      const response = await usersUserinfoAxios.get(
        `/KeywordStudy?keyword=${keyword}`
      );
      setBoards(response.data);
    } catch (error) {
      console.log("PostList 검색 시 오류", error);
    }
  };

  const searchItems = (searchvalue) => {
    const lowercaseKeyword = searchvalue.toLowerCase(); // 검색어를 소문자로 변환

    setKeyword(lowercaseKeyword); // 검색어 설정

    if (lowercaseKeyword !== "") {
      const filteredData = boards.filter((item) => {
        const values = Object.values(item).join("").toLowerCase(); // 게시글 내용을 소문자로 변환하여 비교
        return values.includes(lowercaseKeyword);
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(boards);
    }
  };

  console.log(keyword);

  const [filteredResults, setFilteredResults] = useState([]);

  const handleToggle = (toggle) => {
    setSelectedSkill((prevToggles) =>
      prevToggles.includes(toggle)
        ? prevToggles.filter((selected) => selected !== toggle)
        : [...prevToggles, toggle]
    );
  };

  const methods = ["온라인", "오프라인", "온/오프 병행"];

  const cities = [
    "강남/역삼/삼성",
    "신사/청담/압구정",
    "서초/교대/사당",
    "잠실/송파/강동",
    "을지로/명동/중구/동대문",
    "서울역/이태원/용산",
    "종로/인사동",
    "홍대/합정/마포/서대문",
    "여의도",
    "구로/신도림/금천",
    "건대입구/성수/왕십리",
    "성북/강북/노원/도봉",
    "기타",
  ];

  const skills = [
    "Angular",
    "C",
    "C++",
    "Django",
    "Docker",
    "Express",
    "Figma",
    "Firebase",
    "Flask",
    "Flutter",
    "Git",
    "Flask",
    "Go",
    "GraphQL",
    "Java Script",
    "Java",
    "Kubernetes",
    "MongoDB",
    "mySql",
    "NestJS",
    "NodeJS",
    "Php",
    "Python",
    "R",
    "React",
    "React Native",
    "Spring",
    "Svelte",
    "Swift",
    "Type Script",
    "Unity",
    "Vue",
    "Zeplin",
  ];

  // 각 스킬에 대해 skill_no를 부여합니다.
  skills.forEach((skill, index) => {
    skills[index] = { skill_no: index + 1, skill_name: skill };
  });

  console.log(skills);

  const recruits = ["프로젝트", "스터디", "멘토/멘티"];

  const toggleLike = () => {
    setLike(!like);
  };
  // 기술스택 핸들러
  const handleClickSkill = (skill) => {
    if (typeof skill === "object" && skill !== null && "skill_no" in skill) {
      skill = skill.skill_no; // 객체일 경우 스킬 이름으로 설정
    }

    if (clickedSkills.includes(skill)) {
      setClickedSkills(clickedSkills.filter((clicked) => clicked !== skill));
    } else {
      if (clickedSkills.length > 4) {
        alert("최대 5개까지만 선택 가능합니다.");
      } else {
        setClickedSkills([...clickedSkills, skill]);
      }
    }
    setSelectedSkill(clickedSkills);
  };

  console.log("selectedSkill: ", selectedSkill);
  console.log("selectedCity: ", selectedCity);
  console.log("selectedRecruit: ", selectedRecruit);
  console.log("selectedMethod: ", selectedMethod);

  useEffect(() => {
    // 모든 클릭된 스킬을 선택된 스킬로 설정
    setSelectedSkill(clickedSkills);
  }, [clickedSkills]);

  // 지역 핸들러
  const handleClickCity = (city) => {
    // 클릭된 지역을 선택된 지역으로 설정
    setClickedCity(city);
  };

  useEffect(() => {
    // 클릭된 지역을 선택된 지역으로 설정
    setSelectedCity(clickedCity ? [clickedCity] : []);
  }, [clickedCity]);

  //모집구분핸들러
  const handleClickRecruit = (recruit) => {
    setClickedRecruit(recruit);
  };

  useEffect(() => {
    setSelectedRecruit(clickedRecruit ? [clickedRecruit] : []);
  }, [clickedRecruit]);

  //진행방식 핸들러
  const handleClickMethod = (method) => {
    setClickedMethod(method);
  };

  useEffect(() => {
    setSelectedMethod(clickedMethod ? [clickedMethod] : []);
  }, [clickedMethod]);

  //단어 길이 ...표현하는 함수
  const EllipsisText = ({ text, maxLength }) => {
    const [displayText, setDisplayText] = useState(text);

    useEffect(() => {
      if (text.length > maxLength) {
        setDisplayText(`${text.substring(0, maxLength)}...`);
      }
    }, [text, maxLength]);

    return <span>{displayText}</span>;
  };

  return (
    <div className="Welcome">
      <h2>Dashboard</h2>
      {userData ? (
        <div>
          <p>
            Welcome to the Dashboard, {userData.nickname}님! You are logged in.
          </p>
        </div>
      ) : (
        <p>You are not logged in.</p>
      )}

      <div className="banner">
        <div className="banner_all">
          <KakaoMap />
        </div>
      </div>
      <br />
      <br />
      <br />
      <main className="main_board_list">
        <div className="toggle_section">
          <div className="category_section">
            <div className="category_section_set">
              <div className="all_toggle">
                <div className="all_toggle_2">
                  <div className="all_toggle_3">
                    <button
                      className="region_toggle_button"
                      type="button"
                      aria-expanded={isSkillVisible ? "true" : "false"}
                      onClick={() => toggleContentSkill("")}
                    >
                      {clickedSkills.length <= 0 ? (
                        "기술스택"
                      ) : (
                        <EllipsisText
                          text={clickedSkills
                            .map(
                              (skillNo) =>
                                skills.find(
                                  (skill) => skill.skill_no === skillNo
                                )?.skill_name
                            )
                            .join(", ")}
                          maxLength={8}
                        />
                      )}
                      <svg
                        height="20"
                        width="20"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                        focusable="false"
                        class="css-8mmkcg"
                      >
                        <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                      </svg>
                    </button>
                  </div>

                  <div>
                    <button
                      className="region_toggle_button"
                      type="button"
                      aria-expanded={isCityVisible ? "true" : "false"}
                      onClick={() => toggleContentCity("")}
                    >
                      {clickedCity ? (
                        <EllipsisText text={clickedCity} maxLength={4} />
                      ) : (
                        "지역"
                      )}
                      <svg
                        height="20"
                        width="20"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                        focusable="false"
                        class="css-8mmkcg"
                      >
                        <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                      </svg>
                    </button>
                  </div>

                  <div>
                    <button
                      className="region_toggle_button"
                      type="button"
                      aria-expanded={isMethodVisible ? "true" : "false"}
                      onClick={() => toggleContentMethod("")}
                    >
                      {clickedMethod ? (
                        <EllipsisText text={clickedMethod} maxLength={4} />
                      ) : (
                        "진행방식"
                      )}
                      <svg
                        height="20"
                        width="20"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                        focusable="false"
                        class="css-8mmkcg"
                      >
                        <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                      </svg>
                    </button>
                  </div>

                  <div>
                    <button
                      className="region_toggle_button"
                      type="button"
                      aria-expanded={isRecruitVisible ? "true" : "false"}
                      onClick={() => toggleContentRecruit("")}
                    >
                      {clickedRecruit ? (
                        <EllipsisText text={clickedRecruit} maxLength={4} />
                      ) : (
                        "모집구분"
                      )}
                      <svg
                        height="20"
                        width="20"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                        focusable="false"
                        class="css-8mmkcg"
                      >
                        <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="search_container">
              <img className="search_img" src={SearchIcon} alt="search_icon" />
              <input
                placeholder="제목, 글 내용을 검색"
                class="searchInput"
                type="text"
                value={keyword}
                onChange={(e) => searchItems(e.target.value)}
              ></input>
            </div>
          </div>

          {/* 진행방식 */}
          <div
            id="region_section"
            className={
              isMethodVisible ? "method-content active" : "method-content"
            }
          >
            {isMethodVisible && (
              <div className="region_section">
                <ul className="region_seoul">
                  {methods.map((method) => (
                    <li
                      key={method}
                      className={`seoulToggle ${
                        clickedMethod.includes(method) ? "clicked" : ""
                      }`}
                      onClick={() => {
                        toggleContentMethod(method);
                        handleClickMethod(method);
                        setMethodVisible(true);
                      }}
                    >
                      {method}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* 모집구분 */}
          <div
            id="region_section"
            className={
              isRecruitVisible ? "recruit-content active" : "recruit-content"
            }
          >
            {isRecruitVisible && (
              <div className="region_section">
                <ul className="region_seoul">
                  {recruits.map((recruit) => (
                    <li
                      key={recruit}
                      className={`seoulToggle ${
                        clickedRecruit.includes(recruit) ? "clicked" : ""
                      }`}
                      onClick={() => {
                        toggleContentRecruit(recruit);
                        handleClickRecruit(recruit);
                        setRecruitVisible(true);
                      }}
                    >
                      {recruit}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* 지역 */}
          <div
            id="region_section"
            className={isCityVisible ? "city-content active" : "city-content"}
          >
            {isCityVisible && (
              <div className="region_section">
                <ul className="region_seoul">
                  {cities.map((city) => (
                    <li
                      key={city}
                      className={`seoulToggle ${
                        clickedCity.includes(city) ? "clicked" : ""
                      }`}
                      onClick={() => {
                        toggleContentCity(city);
                        handleClickCity(city);
                        setCityVisible(true);
                      }}
                    >
                      {city}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* 기술스택 */}
          <div
            id="region_section"
            className={
              isSkillVisible ? "skill-content active" : "skill-content"
            }
          >
            {isSkillVisible && (
              <div className="region_section">
                <ul className="skill">
                  {skills.map((skill) => (
                    <li
                      key={skill.skill_no}
                      className={`skillToggle ${
                        clickedSkills.includes(skill) ? "clicked" : ""
                      }`}
                      onClick={() => {
                        toggleContentSkill(skill);
                        handleClickSkill(skill);
                        setSkillVisible(true);
                      }}
                    >
                      <img
                        className="skill_logo"
                        src={`${process.env.PUBLIC_URL}/img/${skill.skill_name}.png`}
                        alt="skillLogo"
                      />
                      <span className="skill_text">{skill.skill_name}</span>
                    </li>
                  ))}
                </ul>
                <div className="selected">
                  <ul className="selected_1">
                    {Array.isArray(selectedSkill) &&
                    selectedSkill.length > 0 ? (
                      selectedSkill.map((selectedSkillItem, index) => (
                        <li key={index} className="selected_2">
                          <span className="selected_text">
                            {
                              skills.find(
                                (skill) => skill.skill_no === selectedSkillItem
                              )?.skill_name
                            }
                          </span>
                          <img
                            src={DeleteIcon}
                            className="delete_img"
                            alt="deleteButton"
                            onClick={() => handleClickSkill(selectedSkillItem)}
                          />
                        </li>
                      ))
                    ) : (
                      // 그렇지 않으면 선택된 값이 없음을 나타내는 메시지 표시
                      <p>선택된 값이 없습니다.</p>
                    )}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        <ul className="board_box_section">
          {keyword.length > 1
            ? filteredResults.map((board) => (
                <a
                  key={board.post_no}
                  className="board_box"
                  href={`/post_detail/${board.post_no}`}
                >
                  <li>
                    <div className="study_sort_badge">
                      <div className="study_sort_badge_content">
                        {board.recruit_type}
                      </div>
                      <HeartButton
                        className="heart_button"
                        like={like}
                        onClick={toggleLike}
                      />
                    </div>
                    <div className="study_schedule">
                      <p className="">마감일</p>
                      <p>|</p>
                      <p>{board.recruit_deadline}</p>
                    </div>
                    <div>
                      <h1 className="board_title">{board.study_title}</h1>
                    </div>
                    <ul className="skill_icon_section">
                      {board.studyPostWithSkills.map((skill, index) => (
                        <li key={index}>{skill.skill_name.skill_name}</li>
                      ))}
                    </ul>
                    <div className="board_content_border"></div>
                    <section className="board_info_section">
                      <div className="board_info_left">
                        <div className="user_profile_img">
                          <img
                            className="user_profile_img_set"
                            width="30px"
                            height="30px"
                            src={board.profileImg}
                            alt="Profile"
                          />
                        </div>
                        <div>{board.nickname}</div>
                      </div>
                      <div className="board_info_right">
                        <div className="comment_count_section">
                          <p>댓글아이콘</p>
                          <p>{board.commentCount}</p>
                        </div>
                      </div>
                    </section>
                  </li>
                </a>
              ))
            : boards.map((board) => (
                <a
                  key={board.post_no}
                  className="board_box"
                  href={`/post_detail/${board.post_no}`}
                >
                  <li>
                    <div className="study_sort_badge">
                      <div className="study_sort_badge_content">
                        {board.recruit_type}
                      </div>
                      <HeartButton
                        className="heart_button"
                        like={like}
                        onClick={toggleLike}
                      />
                    </div>
                    <div className="study_schedule">
                      <p className="">마감일</p>
                      <p>|</p>
                      <p>{board.recruit_deadline}</p>
                    </div>
                    <div>
                      <h1 className="board_title">{board.study_title}</h1>
                    </div>
                    <ul className="skill_icon_section">
                      {board.studyPostWithSkills.map((skill, index) => (
                        <li key={index}>{skill.skill_name}</li>
                      ))}
                    </ul>
                    <div className="board_content_border"></div>
                    <section className="board_info_section">
                      <div className="board_info_left">
                        <div className="user_profile_img">
                          <img
                            className="user_profile_img_set"
                            width="30px"
                            height="30px"
                            src={board.profileImg}
                            alt="Profile"
                          />
                        </div>
                        <div>{board.nickname}</div>
                      </div>
                      <div className="board_info_right">
                        <div className="comment_count_section">
                          <p>댓글아이콘</p>
                          <p>{board.commentCount}</p>
                        </div>
                      </div>
                    </section>
                  </li>
                </a>
              ))}
        </ul>
      </main>
    </div>
  );
}

export default MainContent;
