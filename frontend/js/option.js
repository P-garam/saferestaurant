/*
function navigate() {
    var selectedRegion = document.getElementById("regionSelect").value;
    if (selectedRegion) {
        window.location.href = selectedRegion + ".html";
    }
}
*/

/*
function loadMap(region) {
    const mapContainer = document.getElementById('map');
    const mapOption = { 
        center: new kakao.maps.LatLng(35.1795543, 129.0756416), // Default location: Busan
        level: 5
    };

    const map = new kakao.maps.Map(mapContainer, mapOption);

    fetch(`/api/safefood/${region}`)
        .then(response => response.json())
        .then(data => {
            console.log('Fetched data:', data); // 로그 추가

            data.forEach(place => {
                const marker = new kakao.maps.Marker({
                    map: map,
                    position: new kakao.maps.LatLng(place.lat, place.lng)
                });

                const infowindow = new kakao.maps.InfoWindow({
                    content: `<div style="padding:5px;">${place.name}</div>`
                });

                kakao.maps.event.addListener(marker, 'mouseover', () => {
                    infowindow.open(map, marker);
                });

                kakao.maps.event.addListener(marker, 'mouseout', () => {
                    infowindow.close();
                });
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}
*/

// frontend/js/option.js
/*
function navigate() {
    const region = document.getElementById('regionSelect').value || document.getElementById('regionSelect1').value;
    if (region) {
        window.location.href = `${region}.html`;
    }
}

function loadMap(region) {
    const mapContainer = document.getElementById('map');
    const mapOption = { 
        center: new kakao.maps.LatLng(35.1795543, 129.0756416), // Default location: Busan
        level: 5
    };

    // 대구와 부산의 중심 위치를 설정합니다.
    const locations = {
        busan: new kakao.maps.LatLng(35.1795543, 129.0756416),
        daegu: new kakao.maps.LatLng(35.871435, 128.601445)
    };

    const map = new kakao.maps.Map(mapContainer, {
        ...mapOption,
        center: locations[region] || locations.busan // 지역에 따른 중심 좌표 설정
    });

    fetch(`/api/safefood/${region}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (Array.isArray(data)) {
            data.forEach(place => {
                const marker = new kakao.maps.Marker({
                    map: map,
                    position: new kakao.maps.LatLng(place.lat, place.lng)
                });

                const infowindow = new kakao.maps.InfoWindow({
                    content: `<div style="padding:5px;">${place.name}</div>`
                });

                kakao.maps.event.addListener(marker, 'mouseover', () => {
                    infowindow.open(map, marker);
                });

                kakao.maps.event.addListener(marker, 'mouseout', () => {
                    infowindow.close();
                });
            });
        } else {
            console.error('Invalid data format:', data);
            alert('Received data is not in the expected format.');
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        alert('Failed to load data. Please try again later.');
    });
}
*/
// frontend/js/option.js
/*잘 됐 던 거 야 !!
function navigate() {
    const region = document.getElementById('regionSelect').value || document.getElementById('regionSelect1').value;
    if (region) {
        window.location.href = `${region}.html`;
    }
}


function loadMap(region) {
    const mapContainer = document.getElementById('map');
    const mapOption = { 
        center: new kakao.maps.LatLng(35.1795543, 129.0756416), // Default location: Busan
        level: 5
    };

    const locations = {
        busan: new kakao.maps.LatLng(35.1795543, 129.0756416),
        daegu: new kakao.maps.LatLng(35.871435, 128.601445)
    };

    const map = new kakao.maps.Map(mapContainer, {
        ...mapOption,
        center: locations[region] || locations.busan // 지역에 따른 중심 좌표 설정
    });

    fetch(`/api/safefood/${region}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // JSON 응답을 기대
    })
    .then(data => {
        console.log('Received data:', data); // 데이터 형식 확인
        if (data && Array.isArray(data)) {
            data.forEach(place => {
                const lat = parseFloat(place.LAT); // LAT 필드가 없는 경우 수정 필요
                const lng = parseFloat(place.LNG); // LNG 필드가 없는 경우 수정 필요
                const name = place.BSSH_NM; // 장소 이름

                if (!isNaN(lat) && !isNaN(lng)) {
                    const marker = new kakao.maps.Marker({
                        map: map,
                        position: new kakao.maps.LatLng(lat, lng)
                    });

                    const infowindow = new kakao.maps.InfoWindow({
                        content: `<div style="padding:5px;">${name}</div>`
                    });

                    kakao.maps.event.addListener(marker, 'mouseover', () => {
                        infowindow.open(map, marker);
                    });

                    kakao.maps.event.addListener(marker, 'mouseout', () => {
                        infowindow.close();
                    });
                } else {
                    console.error('Invalid coordinates:', place);
                }
            });
        } else {
            console.error('Invalid data format:', data);
            alert('Received data is not in the expected format.');
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        alert('Failed to load data. Please try again later.');
    });
}
*/

// frontend/js/option.js

// 페이지 로드 시 지역에 맞는 지도 로드
document.addEventListener('DOMContentLoaded', function() {
    const region = window.location.pathname.split('/').pop().split('.').shift(); // 현재 파일 이름을 통해 지역을 추출
    if (region) {
        loadMap(region);
    }
});

// 지도 로드 및 마커 추가
function loadMap(region) {
    const mapContainer = document.getElementById('map');
    const mapOption = {
        center: new kakao.maps.LatLng(35.1795543, 129.0756416), // Default location: Busan
        level: 5
    };

    const locations = {
        busan: new kakao.maps.LatLng(35.1795543, 129.0756416),
        daegu: new kakao.maps.LatLng(35.871435, 128.601445)
    };

    // 지도 생성
    const map = new kakao.maps.Map(mapContainer, {
        ...mapOption,
        center: locations[region] || locations.busan // 지역에 따른 중심 좌표 설정
    });

    // API를 통해 데이터 가져오기
    fetch(`/api/safefood/${region}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // JSON 응답을 기대
        })
        .then(data => {
            console.log('Received data:', data); // 데이터 형식 확인
            if (data && Array.isArray(data)) {
                data.forEach(place => {
                    const address = place.LOCPLC; // 주소를 가져옵니다.
                    geocodeAddress(address, (latlng) => {
                        if (latlng) {
                            // 마커와 정보 창 설정
                            const marker = new kakao.maps.Marker({
                                map: map,
                                position: latlng
                            });

                            const infowindow = new kakao.maps.InfoWindow({
                                content: `<div style="padding:5px;">${place.BSSH_NM}<br>${place.LOCPLC}</div>`
                            });

                            kakao.maps.event.addListener(marker, 'mouseover', () => {
                                infowindow.open(map, marker);
                            });

                            kakao.maps.event.addListener(marker, 'mouseout', () => {
                                infowindow.close();
                            });
                        } else {
                            console.error('Invalid coordinates for address:', address);
                        }
                    });
                });
            } else {
                console.error('Invalid data format:', data);
                alert('Received data is not in the expected format.');
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('Failed to load data. Please try again later.');
        });
}

// 주소를 좌표로 변환하는 함수
function geocodeAddress(address, callback) {
    const encodedAddress = encodeURIComponent(address);
    const url = `/api/geocode?query=${encodedAddress}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
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

// 지역 선택 시 페이지 이동
function navigate() {
    const region = document.getElementById('regionSelect').value || document.getElementById('regionSelect1').value;
    if (region) {
        window.location.href = `${region}.html`;
    }
}
