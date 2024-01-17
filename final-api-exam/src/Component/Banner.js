import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Banner.css";

const KakaoMap = () => {
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
      //"https://dapi.kakao.com/v2/maps/sdk.js?appkey=89730aca4ca56bd725e48019977366cc&autoload=false";
      // "https://dapi.kakao.com/v2/local/geo/coord2address.{format}"
      // "https://dapi.kakao.com/v2/maps/sdk.js?appkey=055c0b47b89c99ddb22be1896a688442&autoload=false";
      "https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=127.0337&y=37.4994&input_coord=WGS84&appkey=055c0b47b89c99ddb22be1896a688442";

    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        // Kakao 지도 API 로드 후 실행되는 코드

        const mapContainer = document.getElementById("map");
        const mapOption = {
          center: new window.kakao.maps.LatLng(37.4994, 127.0337),
          level: 3,
        };
        const map = new window.kakao.maps.Map(mapContainer, mapOption);

        const positions = [
          new window.kakao.maps.LatLng(37.4993, 127.0332),
          new window.kakao.maps.LatLng(37.4996, 127.0336),
          new window.kakao.maps.LatLng(37.499, 137.0329),
        ];

        const geocoder = new window.kakao.maps.services.Geocoder();

        positions.forEach((position) => {
          geocoder.coord2RegionCode(
            position.getLng(),
            position.getLat(),
            (result, status) => {
              if (status === window.kakao.maps.services.Status.OK) {
                console.log("지역 명칭 : " + result[0].address_name);
                console.log("행정구역 코드 : " + result[0].code);
              }
            }
          );
        });
        const markerSize = new window.kakao.maps.Size(
          MARKER_WIDTH,
          MARKER_HEIGHT
        ); // 기본, 클릭 마커의 크기
        const markerOffset = new window.kakao.maps.Point(OFFSET_X, OFFSET_Y); // 기본, 클릭 마커의 기준좌표
        const overMarkerSize = new window.kakao.maps.Size(
          OVER_MARKER_WIDTH,
          OVER_MARKER_HEIGHT
        ); // 오버 마커의 크기
        const overMarkerOffset = new window.kakao.maps.Point(
          OVER_OFFSET_X,
          OVER_OFFSET_Y
        ); // 오버 마커의 기준 좌표
        const spriteImageSize = new window.kakao.maps.Size(
          SPRITE_WIDTH,
          SPRITE_HEIGHT
        ); // 스프라이트 이미지의 크기

        var selectedMarker = null; // 클릭한 마커를 담을 변수

        // 지도 위에 마커를 표시합니다
        for (var i = 0, len = positions.length; i < len; i++) {
          const gapX = MARKER_WIDTH + SPRITE_GAP; // 스프라이트 이미지에서 마커로 사용할 이미지 X좌표 간격 값
          const originY = (MARKER_HEIGHT + SPRITE_GAP) * i; // 스프라이트 이미지에서 기본, 클릭 마커로 사용할 Y좌표 값
          const overOriginY = (OVER_MARKER_HEIGHT + SPRITE_GAP) * i; // 스프라이트 이미지에서 오버 마커로 사용할 Y좌표 값
          const normalOrigin = new window.kakao.maps.Point(0, originY); // 스프라이트 이미지에서 기본 마커로 사용할 영역의 좌상단 좌표
          const clickOrigin = new window.kakao.maps.Point(gapX, originY); // 스프라이트 이미지에서 마우스오버 마커로 사용할 영역의 좌상단 좌표
          const overOrigin = new window.kakao.maps.Point(gapX * 2, overOriginY); // 스프라이트 이미지에서 클릭 마커로 사용할 영역의 좌상단 좌표

          // 마커를 생성하고 지도위에 표시합니다
          addMarker(positions[i], normalOrigin, overOrigin, clickOrigin);
        }

        // 마커를 생성하고 지도 위에 표시하고, 마커에 mouseover, mouseout, click 이벤트를 등록하는 함수입니다
        function addMarker(position, normalOrigin, overOrigin, clickOrigin) {
          // 기본 마커이미지, 오버 마커이미지, 클릭 마커이미지를 생성합니다
          const normalImage = createMarkerImage(
            markerSize,
            markerOffset,
            normalOrigin
          );
          const overImage = createMarkerImage(
            overMarkerSize,
            overMarkerOffset,
            overOrigin
          );
          const clickImage = createMarkerImage(
            markerSize,
            markerOffset,
            clickOrigin
          );

          // 마커를 생성하고 이미지는 기본 마커 이미지를 사용합니다
          const marker = new window.kakao.maps.Marker({
            map: map,
            position: position,
            image: normalImage,
          });

          // 마커 객체에 마커아이디와 마커의 기본 이미지를 추가합니다
          marker.normalImage = normalImage;

          // 마커에 mouseover 이벤트를 등록합니다
          window.kakao.maps.event.addListener(marker, "mouseover", function () {
            // 클릭된 마커가 없고, mouseover된 마커가 클릭된 마커가 아니면
            // 마커의 이미지를 오버 이미지로 변경합니다
            if (!selectedMarker || selectedMarker !== marker) {
              marker.setImage(overImage);
            }
          });

          // 마커에 mouseout 이벤트를 등록합니다
          window.kakao.maps.event.addListener(marker, "mouseout", function () {
            // 클릭된 마커가 없고, mouseout된 마커가 클릭된 마커가 아니면
            // 마커의 이미지를 기본 이미지로 변경합니다
            if (!selectedMarker || selectedMarker !== marker) {
              marker.setImage(normalImage);
            }
          });

          // 마커에 click 이벤트를 등록합니다
          window.kakao.maps.event.addListener(marker, "click", function () {
            // 클릭된 마커가 없고, click 마커가 클릭된 마커가 아니면
            // 마커의 이미지를 클릭 이미지로 변경합니다
            if (!selectedMarker || selectedMarker !== marker) {
              // 클릭된 마커 객체가 null이 아니면
              // 클릭된 마커의 이미지를 기본 이미지로 변경하고
              !!selectedMarker &&
                selectedMarker.setImage(selectedMarker.normalImage);

              // 현재 클릭된 마커의 이미지는 클릭 이미지로 변경합니다
              marker.setImage(clickImage);
            }

            // 클릭된 마커를 현재 클릭된 마커 객체로 설정합니다
            selectedMarker = marker;
          });
        }

        // MakrerImage 객체를 생성하여 반환하는 함수입니다
        function createMarkerImage(markerSize, offset, spriteOrigin) {
          const markerImage = new window.kakao.maps.MarkerImage(
            SPRITE_MARKER_URL, // 스프라이트 마커 이미지 URL
            markerSize, // 마커의 크기
            {
              offset: offset, // 마커 이미지에서의 기준 좌표
              spriteOrigin: spriteOrigin, // 스트라이프 이미지 중 사용할 영역의 좌상단 좌표
              spriteSize: spriteImageSize, // 스프라이트 이미지의 크기
            }
          );
          return markerImage;
        }
      });
    };
  });

  return (
    <div className="container">
      <div className="mt-5 px-5">
        <div id="map" style={{ width: "100%", height: "350px" }}></div>
      </div>
    </div>
  );
};

export default KakaoMap;
