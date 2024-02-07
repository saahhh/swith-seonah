//admin page, 1. user list  2.post list 3. rating/qna answer
import { useState, useEffect, useRef } from "react";
import "../css/Admin.css";
import Header from "./Header";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchIcon from "./img/search.png";
import DeleteIcon from "./img/delete.png";
import axios from "axios";
import usersUserinfoAxios from "../token/tokenAxios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useParams, Link } from "react-router-dom";

export default function Admin() {
  const [nickname, setNickname] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [boards, setBoards] = useState([]);
  const [filterComments, setFilteredComments] = useState([]);
  const [comment, setComment] = useState([]);

  const handleSearch = async () => {
    try {
      const postResponse = await usersUserinfoAxios.get(
        `/nicknameStudies?nickname=${nickname}`
      );

      const data = postResponse.data || []; // 데이터가 없을 경우 빈 배열로 초기화
      setBoards(data);

      if (data !== null) {
        // board가 null이 아닐 때만 setFilteredResults 호출
        setFilteredResults(data); // 검색 결과를 바로 filteredResults 상태에 업데이트
      }

      const commentResponse = await usersUserinfoAxios.get(
        `/nicknameComments?nickname=${nickname}`
      );

      setFilteredComments(commentResponse.data);
    } catch (error) {
      console.log("닉네임, 댓글 검색 시 오류", error);
    }
  };

  // useEffect를 사용하여 검색어(nickname)가 변경될 때마다 handleSearch 함수를 호출하도록 수정
  useEffect(() => {
    if (nickname.trim() !== "") {
      handleSearch();
    } else {
      setFilteredComments([]);
      setFilteredResults([]); // 검색어가 없을 경우 검색 결과를 초기화
    }
  }, [nickname]);

  const searchItems = (searchvalue) => {
    const lowercaseKeyword = searchvalue.toLowerCase(); // 검색어를 소문자로 변환
    setNickname(lowercaseKeyword); // 검색어 설정

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

  return (
    <div className="admin_page">
      <Header />
      <h2 className="admin_page_margin">Admin Page</h2>
      <div className="admin_search_box">
        <div className="admin_search_container">
          <img className="search_img" src={SearchIcon} alt="search_icon" />
          <input
            placeholder="닉네임을 입력하세요."
            class="searchInput"
            type="text"
            value={nickname}
            onChange={(e) => searchItems(e.target.value)}
          />
        </div>
      </div>
      <div>
        <h2 className="admin_page_margin">게시글 목록</h2>
        <table className="admin_page_margin">
          <thead>
            <tr>
              <th>게시글 번호</th>
              <th>제목</th>
              <th>닉네임</th>
            </tr>
          </thead>
          <tbody>
            {nickname.length > 0 ? (
              filteredResults.length > 0 ? (
                filteredResults.map((board) => (
                  <tr key={board.post_no} onClick={(e) => e.stopPropagation()}>
                    <td>{board.post_no}</td>
                    <td>
                      <Link
                        to={`/post_detail/${board.post_no}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log("Link Clicked");
                        }}
                      >
                        {board.study_title}
                      </Link>
                    </td>
                    <td>{board.nickname}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">조건에 해당하는 게시물이 없습니다.</td>
                </tr>
              )
            ) : (
              boards.map((board) => (
                <tr key={board.post_no} onClick={(e) => e.stopPropagation()}>
                  <td>{board.post_no}</td>
                  <td>{board.study_title}</td>
                  <td>{board.nickname}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div>
        <h2 className="admin_page_margin">댓글 목록</h2>
        <table className="admin_page_margin">
          <thead>
            <tr>
              <th>게시글 번호</th>
              <th>댓글 내용</th>
              <th>닉네임</th>
            </tr>
          </thead>
          <tbody>
            {nickname.length > 0 ? (
              filterComments.length > 0 ? (
                filterComments.map((comments) => (
                  <tr key={comments.post_no}>
                    <td>{comments.post_no}</td>
                    <td>
                      <Link to={`/post_detail/${comments.post_no}`}>
                        {comments.comment_content}
                      </Link>
                    </td>
                    <td>{comments.nickname}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">조건에 해당하는 댓글이 없습니다.</td>
                </tr>
              )
            ) : (
              comment.length > 0 &&
              comment.map((comments) => (
                <tr key={comments.post_no}>
                  <td>{comments.post_no}</td>
                  <td>{comments.comment_content}</td>
                  <td>{comments.nickname}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
