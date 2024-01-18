import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const KakaoApi = () => {
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

        /*ajax({
          url: "https://dapi.kakao.com/v2/local/search/address.json?query=동홍동",
          type: "GET",
          headers: { Authorization: "KakaoAK 4fb67--------------0ad8fe" },
          success: function (data) {
            console.log(data);
          },
          error: function (e) {
            console.log(e);
          },
        });*/

        axios({
          method: "get",
          url: "https://dapi.kakao.com/v2/local/search/address.json",
          headers: { Authorization: "KakaoAK 4fb67--------------0ad8fe" },
          params: { query: "동홍동" },
        }).then(function (response) {
          console.log(JSON.stringify(response.data));
        });

        var url =
          "https://dapi.kakao.com/v2/local/search/address.json?query=동홍동";
        axios
          .get(url, "", {
            headers: { Authorization: "KakaoAK 4fb67--------------0ad8fe" },
          })
          .then(function (response) {
            console.log(JSON.stringify(response.data));
          });

        var url =
          "https://dapi.kakao.com/v2/local/search/address.json?query=동홍동";
        axios
          .get(url, {
            headers: { Authorization: "KakaoAK 4fb67--------------0ad8fe" },
          })
          .then(function (response) {
            console.log(JSON.stringify(response.data));
          });
      });
    };
  });
  return <div id="map" style={{ width: "500px", height: "400px" }}></div>;
};

export default KakaoApi;
