import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/KakaoMap.css";
import usersUserinfoAxios from "../token/tokenAxios";

const KakaoMap = () => {
  const [userData, setUserData] = useState([]);
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

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=89730aca4ca56bd725e48019977366cc&autoload=false";

    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        var mapContainer = document.getElementById("map");

        var mapOption = {
          //맵
          center: new window.kakao.maps.LatLng(37.502, 127.026581),
          level: 4,
        };
        var map = new window.kakao.maps.Map(mapContainer, mapOption);
        var geocoder = new window.kakao.maps.services.Geocoder(); //입력한 주소에 마커
        geocoder.addressSearch(userData.useraddress, (result, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

            var marker = new window.kakao.maps.Marker({
              //마커로 표시
              map: map,
              position: coords,
            });
            // 장소에 대한 설명을 표시합니다
            var infowindow = new window.kakao.maps.InfoWindow({
              content:
                '<div style="width:150px;text-align:center;padding:6px 0;">나의 집</div>',
            });
            infowindow.open(map, marker);
            map.setCenter(coords);
          }
        });

        var content =
          '<div class="overlaybox">' +
          '    <div class="boxtitle">금주 영화순위</div>' +
          '    <div class="first">' +
          '        <div class="triangle text">1</div>' +
          '        <div class="movietitle text">드래곤 길들이기2</div>' +
          "    </div>" +
          "    <ul>" +
          '        <li class="up">' +
          '            <span class="number">2</span>' +
          '            <span class="title">명량</span>' +
          '            <span class="arrow up"></span>' +
          '            <span class="count">2</span>' +
          "        </li>" +
          "        <li>" +
          '            <span class="number">3</span>' +
          '            <span class="title">해적(바다로 간 산적)</span>' +
          '            <span class="arrow up"></span>' +
          '            <span class="count">6</span>' +
          "        </li>" +
          "        <li>" +
          '            <span class="number">4</span>' +
          '            <span class="title">해무</span>' +
          '            <span class="arrow up"></span>' +
          '            <span class="count">3</span>' +
          "        </li>" +
          "        <li>" +
          '            <span class="number">5</span>' +
          '            <span class="title">안녕, 헤이즐</span>' +
          '            <span class="arrow down"></span>' +
          '            <span class="count">1</span>' +
          "        </li>" +
          "    </ul>" +
          "</div>";

        const position = new window.kakao.maps.LatLng(37.49887, 127.026581);

        const customOverlay = new window.kakao.maps.CustomOverlay({
          position: position,
          content: content,
          xAnchor: 0.3,
          yAnchor: 0.91,
        });

        customOverlay.setMap(map);
      });
    };
  }, []);

  return (
    <div className="container">
      <div className="mt-5 px-5">
        <div className="adress_section">
          <h1 className="banner_font">{userData.useraddress}</h1>
          <br />
        </div>

        <div
          id="map"
          style={{
            width: "100%",
            height: "450px",
            borderRadius: "30px",
            border: "5px solid #b9eeff",
          }}
        ></div>
      </div>
    </div>
  );
};

export default KakaoMap;
