import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Cafes() {
  const [cafesData, setCafesData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/cafe", { withCredentials: true })
      .then((response) => {
        const cafesData = response.data.map((cafe) => ({
          id: cafe.cafe_no,
          naem: cafe.cafe_name,
          address: cafe.cafe_address,
          lat: cafe.cafe_lat,
          lng: cafe.cafe_lng,
        }));
        setCafesData(cafesData);
        console.log("데이터 있음", cafesData); // 받아온 데이터를 콘솔에 출력
      })
      .catch((error) => {
        console.log("데이터 없음", error);
      });
  }, []);

  const searchcafesData = async () => {
    try {
      setLoading(true);

      const response = await axios.get("http://localhost:8080/api/cafe");
      await axios.post("http://localhost:8080/cafeList", {
        cafes: response.data,
      });

      setCafesData(response.data);
    } catch (error) {
      console.error("카페 데이터를 가져오거나 저장하는 도중 오류 발생 : error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mt-5">
      <h2>카페 정보</h2>
      <div>
        <button className="btn btn-primary mt-2" onClick={searchcafesData}>
          카페 정보 불러오기
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {cafesData.length} 0 && (
      <div>
        <h3>카페 목록</h3>
        <ul>
          {cafesData.map((cafe) => (
            <li key={cafe.cafe_no}>
              <p>카페이름 : {cafe.cafe_name}</p>
              <p>카페주소 : {cafe.cafe_address}</p>
              <p>카페위도 : {cafe.cafe_lat}</p>
              <p>카페경도 : {cafe.cafe_lng}</p>
            </li>
          ))}
        </ul>
      </div>
      )
    </div>
  );
}

export default Cafes;
