import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Banner.css";

const KakaoMap2 = () => {
  const MARKER_WIDTH = 33; // 기본, 클릭 마커의 너비
  const MARKER_HEIGHT = 36; // 기본, 클릭 마커의 높이
  const OFFSET_X = 12; // 기본, 클릭 마커의 기준 X좌표
  const OFFSET_Y = MARKER_HEIGHT; // 기본, 클릭 마커의 기준 Y좌표
  const OVER_MARKER_WIDTH = 40; // 오버 마커의 너비
  const OVER_MARKER_HEIGHT = 42; // 오버 마커의 높이
  const OVER_OFFSET_X = 13; // 오버 마커의 기준 X좌표
  const OVER_OFFSET_Y = OVER_MARKER_HEIGHT; // 오버 마커의 기준 Y좌표
  const SPRITE_MARKER_URL =
    "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markers_sprites2.png"; // 스프라이트 마커 이미지 URL
  const SPRITE_WIDTH = 126; // 스프라이트 이미지 너비
  const SPRITE_HEIGHT = 146; // 스프라이트 이미지 높이
  const SPRITE_GAP = 10; // 스프라이트 이미지에서 마커간 간격

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=89730aca4ca56bd725e48019977366cc&autoload=false";

    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById("map");
        const mapOption = {
          center: new window.kakao.maps.LatLng(37.502, 127.026581),
          level: 4,
        };
        const map = new window.kakao.maps.Map(mapContainer, mapOption);
      });
    };
  });
};

export default KakaoMap2;
