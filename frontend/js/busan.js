// js/busan.js
document.addEventListener('DOMContentLoaded', function() {
    // Kakao 지도 API 로드
    kakao.maps.load(function() {
        const mapContainer = document.getElementById('map'); // Container for Kakao Map
        const mapOption = {
            center: new kakao.maps.LatLng(35.1796, 129.0756), // Center of Busan
            level: 8
        };
        const map = new kakao.maps.Map(mapContainer, mapOption);
        
        // Fetch and add markers for Safe Food data
        fetch('/api/busan')
            .then(response => response.json())
            .then(data => {
                data.forEach(location => {
                    const markerPosition = new kakao.maps.LatLng(location.latitude, location.longitude);
                    const marker = new kakao.maps.Marker({
                        position: markerPosition
                    });
                    marker.setMap(map);
                });
            });
    });
});
