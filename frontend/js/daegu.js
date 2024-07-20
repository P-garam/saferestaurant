// daegu.js
/*
document.addEventListener('DOMContentLoaded', function() {
    kakao.maps.load(function() {
        const mapContainer = document.getElementById('map'); // Container for Kakao Map
        const mapOption = {
            center: new kakao.maps.LatLng(35.8722, 128.6025), // Center of Daegu
            level: 8
        };
        const map = new kakao.maps.Map(mapContainer, mapOption);
        
        // Fetch and add markers for Safe Food data
        fetch('/api/daegu')
            .then(response => {
                if (!response.ok) {
                    throw new Error('네트워크 응답이 올바르지 않습니다.');
                }
                return response.json();
            })
            .then(data => {
                data.forEach(location => {
                    const markerPosition = new kakao.maps.LatLng(location.latitude, location.longitude);
                    const marker = new kakao.maps.Marker({
                        position: markerPosition
                    });
                    marker.setMap(map);

                    // 마커에 클릭 이벤트를 등록합니다
                    kakao.maps.event.addListener(marker, 'click', function() {
                        const infoWindow = new kakao.maps.InfoWindow({
                            content: `<div style="padding:5px;">${location.name}<br>${location.location}</div>`
                        });
                        infoWindow.open(map, marker);
                    });
                });
            })
            .catch(error => {
                console.error('데이터 처리 중 오류 발생:', error);
                // 사용자에게 오류 메시지 표시
            });
    });
});
*/

document.addEventListener('DOMContentLoaded', function() {
    kakao.maps.load(function() {
        const mapContainer = document.getElementById('map'); // Container for Kakao Map
        const mapOption = {
            center: new kakao.maps.LatLng(35.8722, 128.6025), // Center of Daegu
            level: 8
        };
        const map = new kakao.maps.Map(mapContainer, mapOption);

        // Geocode address using Naver Maps Geocoding API
        function geocodeAddress(address, callback) {
            const apiKey = 'YOUR_NAVER_API_KEY'; // 발급받은 Naver API 키
            const secretKey = 'YOUR_NAVER_SECRET_KEY'; // 발급받은 Naver Secret Key
            const encodedAddress = encodeURIComponent(address);
            const url = `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${encodedAddress}`;

            fetch(url, {
                method: 'GET',
                headers: {
                    'a6toe5l47k': apiKey,
                    'ZxCjqJZYz9gGSv4XoPcV1Ui3vQuZMivBB0QE4yHG': secretKey
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data && data.addresses && data.addresses.length > 0) {
                    const latlng = new kakao.maps.LatLng(data.addresses[0].y, data.addresses[0].x);
                    callback(latlng);
                } else {
                    console.error('Geocoding failed:', data);
                    callback(null);
                }
            })
            .catch(error => {
                console.error('Error fetching geocoding data:', error);
                callback(null);
            });
        }

        // Fetch and add markers for Safe Food data
        fetch('/api/daegu')
            .then(response => {
                if (!response.ok) {
                    throw new Error('네트워크 응답이 올바르지 않습니다.');
                }
                return response.json();
            })
            .then(data => {
                data.forEach(location => {
                    const address = location.LOCPLC; // 주소를 가져옵니다.
                    geocodeAddress(address, (latlng) => {
                        if (latlng) {
                            const marker = new kakao.maps.Marker({
                                position: latlng,
                                map: map
                            });

                            // 마커에 클릭 이벤트를 등록합니다
                            kakao.maps.event.addListener(marker, 'click', function() {
                                const infoWindow = new kakao.maps.InfoWindow({
                                    content: `<div style="padding:5px;">${location.BSSH_NM}<br>${location.LOCPLC}</div>`
                                });
                                infoWindow.open(map, marker);
                            });
                        } else {
                            console.error('Invalid coordinates for address:', address);
                        }
                    });
                });
            })
            .catch(error => {
                console.error('데이터 처리 중 오류 발생:', error);
                // 사용자에게 오류 메시지 표시
            });
    });
});
