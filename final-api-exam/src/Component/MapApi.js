import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const MapApi = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=89730aca4ca56bd725e48019977366cc&autoload=false";
    // "https://dapi.kakao.com/v2/local/search/address.{format}";

    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById("map");
        const mapOption = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };
        const map = new window.kakao.maps.Map(mapContainer, mapOption);

        const geocoder = new window.kakao.maps.services.Geocoder();

        /*const callback = function (result, status) {
          if (status === window.kakao.maps.services.Status.OK) {
            console.log("지역 명칭 : " + result[0].address_name);
            console.log("행정구역 코드 : " + result[0].code);
          }
        };

        geocoder.coord2RegionCode(126.9786567, 37.566826, callback);*/

        geocoder.addressSearch(
          "경기 성남시 분당구 판교역로 235 에이치스퀘어",
          function (result, status) {
            if (status === window.kakao.maps.services.Status.OK) {
              const coords = new window.kakao.maps.LatLng(
                result[0].y,
                result[0].x
              );
              const message =
                "latlng : new window.kakao.maps.LatLng(" +
                result[0].y +
                ", " +
                result[0].x +
                ")";

              const resultDiv = document.getElementById("clickLatlng");
              resultDiv.innerHTML = message;
              // 결과값으로 받은 위치를 마커로 표시합니다
              const marker = new window.kakao.maps.Marker({
                map: map,
                position: coords,
              });
              // 인포윈도우로 장소에 대한 설명을 표시합니다
              const infowindow = new window.kakao.maps.InfoWindow({
                content:
                  '<div style="width:150px;text-align:center;padding:6px 0;">집</div>',
              });
              infowindow.open(map, marker);
              // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
              map.setCenter(coords);
            }
          }
        );
        window.kakao.maps.event.addListener(
          map,
          "click",
          function (mouseEvent) {
            const latlng = mouseEvent.latLng;
            const clickMessage = `Click latlng: new window.kakao.maps.LatLng(${latlng.getLat()}, ${latlng.getLng()})`;

            const clickResultDiv = document.getElementById("clickLatlng");
            clickResultDiv.innerHTML = clickMessage;
          }
        );
      });
    };
  }, []);

  return <div id="map" style={{ width: "100%", height: "350px" }}></div>;
};

export default MapApi;
