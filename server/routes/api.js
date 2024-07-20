// backend/routes/api.js
/*
const express = require('express');
const axios = require('axios');
const router = express.Router();

// API 엔드포인트 및 키
const safeFoodingApiUrl = 'https://apis.data.go.kr/3450000/safeRestDesigStatService_new/getSafeRestDesigStat_v2?serviceKey=VVpvt9iuatbgJsuIGPNqH%252BT5H171O3TsdttEJsgipVm%252F7u1eL9HCAhYhS79mlJOv53ae3mAEjmcSCAHvgDlDAQ%253D%253D&currentPage=1&perPage=500';
const safeFoodingApiKey = 'VVpvt9iuatbgJsuIGPNqH+T5H171O3TsdttEJsgipVm/7u1eL9HCAhYhS79mlJOv53ae3mAEjmcSCAHvgDlDAQ==';


router.get('/safefood/:region', async (req, res) => {
    const region = req.params.region;

    try {
        const response = await axios.get(`${safeFoodingApiUrl}?region=${region}&apiKey=${safeFoodingApiKey}`);

    //   
    console.log('API Response:', response.data);
    //

        
        // 응답 데이터를 검토하고 JSON으로 반환
        if (response.headers['content-type'].includes('application/json')) {
            res.json(response.data);
        } else {
            console.error('API returned non-JSON response:', response.data);
            res.status(500).send('Server returned non-JSON response');
        }
    } catch (error) {
        console.error('Error fetching data from API:', error.message);
        res.status(500).send('Error fetching data from API');
    }
});

module.exports = router;

*/

// backend/routes/api.js
// backend/routes/api.js
/*
const express = require('express');
const axios = require('axios');
const xml2js = require('xml2js');
const router = express.Router();

const safeFoodingApiUrl = 'https://apis.data.go.kr/3450000/safeRestDesigStatService_new/getSafeRestDesigStat_v2?';
const safeFoodingApiKey = 'VVpvt9iuatbgJsuIGPNqH%2BT5H171O3TsdttEJsgipVm%2F7u1eL9HCAhYhS79mlJOv53ae3mAEjmcSCAHvgDlDAQ%3D%3D&currentPage=1&perPage=500';
router.get('/safefood/:region', async (req, res) => {
    const region = req.params.region;

    try {
        const response = await axios.get(`${safeFoodingApiUrl}?region=${region}&apiKey=${safeFoodingApiKey}`, {
            responseType: 'text' // XML 응답을 텍스트로 받기
        });

        xml2js.parseString(response.data, (err, result) => {
            if (err) {
                console.error('Error parsing XML:', err);
                return res.status(500).send('Error parsing XML');
            }

            console.log('Parsed JSON:', JSON.stringify(result, null, 2)); // JSON 구조 확인

            // 변환된 JSON 응답을 클라이언트에 전달
            // XML 응답 구조에 따라 변환된 데이터에서 원하는 정보를 추출
            res.json(result);
        });

    } catch (error) {
        console.error('Error fetching data from API:', error.message);
        res.status(500).send('Error fetching data from API');
    }
});

module.exports = router;
*/
// backend/routes/api.js
/*
const express = require('express');
const axios = require('axios');
const router = express.Router();

const safeFoodingApiUrl = 'https://apis.data.go.kr/3450000/safeRestDesigStatService_new/getSafeRestDesigStat_v2';
const safeFoodingApiKey = 'VVpvt9iuatbgJsuIGPNqH+T5H171O3TsdttEJsgipVm/7u1eL9HCAhYhS79mlJOv53ae3mAEjmcSCAHvgDlDAQ=='; // 실제 API 키

router.get('/safefood/:region', async (req, res) => {
    const region = req.params.region;
    console.log(`Request received for region: ${region}`);


    try {
        const response = await axios.get(safeFoodingApiUrl, {
            params: {
                serviceKey: safeFoodingApiKey,
                currentPage: 1,
                perPage: 500
            },
            headers: {
                'Accept': 'application/json'
            }
        });

        const data = response.data;

        // 로그로 응답 데이터 확인
        console.log('Received data:', data);

        // 서비스 키 오류 처리
        if (data.header && data.header.resultCode !== '00') {
            console.error('API Error:', data.header.resultMsg);
            return res.status(500).send('API Error: ' + data.header.resultMsg);
        }

        // 데이터 구조 확인
        const items = data.body && data.body.items && data.body.items.item ? data.body.items.item : [];
        if (Array.isArray(items)) {
            res.json(items);
        } else if (typeof items === 'object') {
            res.json([items]); // 단일 객체일 경우 배열로 변환
        } else {
            console.error('Invalid data format: "items" is not an array or object');
            res.status(500).send('Invalid data format');
        }
    } catch (error) {
        console.error('Error fetching data from API:', error.message);
        res.status(500).send('Error fetching data from API');
    }
});

module.exports = router;
*/

// backend/routes/api.js
/* 이게 원래 거
const express = require('express');
const axios = require('axios');
const router = express.Router();

const safeFoodingApiUrl = 'https://apis.data.go.kr/3450000/safeRestDesigStatService_new/getSafeRestDesigStat_v2';
const safeFoodingApiKey = 'VVpvt9iuatbgJsuIGPNqH+T5H171O3TsdttEJsgipVm/7u1eL9HCAhYhS79mlJOv53ae3mAEjmcSCAHvgDlDAQ==';


router.get('/safefood/:region', async (req, res) => {
    const region = req.params.region;
    console.log(`Request received for region: ${region}`);
    
    try {
        const response = await axios.get(safeFoodingApiUrl, {
            params: {
                serviceKey: safeFoodingApiKey,
                currentPage: 1,
                perPage: 500
            }
        });
        
        console.log('Data received from API:', response.data);
        
        if (response.data && response.data.body && response.data.body.items) {
            const items = response.data.body.items.item;
            const filteredItems = items.filter(item => item.LOCPLC.includes(region));
            console.log(`Filtered items for region ${region}:`, filteredItems);
            res.json(filteredItems);
        } else {
            console.error('Invalid response format:', response.data);
            res.status(500).json({ error: 'Invalid response format' });
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
    }
});
*/

// server/routes/api.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

// 영어와 한국어 간의 변환 사전
const regionMap = {
    'busan': '부산',
    'daegu': '대구',
    // 필요한 다른 지역도 추가할 수 있습니다.
};

// Naver API 설정
const naverGeocodingApiUrl = 'https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode';
const naverApiKey = 'a6toe5l47k';
const naverApiSecret = 'ZxCjqJZYz9gGSv4XoPcV1Ui3vQuZMivBB0QE4yHG';

// Safe Fooding API 설정
const safeFoodingApiUrl = 'https://apis.data.go.kr/3450000/safeRestDesigStatService_new/getSafeRestDesigStat_v2';
const safeFoodingApiKey = 'VVpvt9iuatbgJsuIGPNqH+T5H171O3TsdttEJsgipVm/7u1eL9HCAhYhS79mlJOv53ae3mAEjmcSCAHvgDlDAQ==';

// Naver Geocoding API 프록시
router.get('/geocode', async (req, res) => {
    const { query } = req.query;

    try {
        const response = await axios.get(naverGeocodingApiUrl, {
            params: { query },
            headers: {
                'X-NCP-APIGW-API-KEY-ID': naverApiKey,
                'X-NCP-APIGW-API-KEY': naverApiSecret
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching geocoding data:', error);
        res.status(500).json({ error: 'Error fetching geocoding data' });
    }
});

// Safe Fooding API 프록시
router.get('/safefood/:region', async (req, res) => {
    const region = req.params.region.toLowerCase();
    const koreanRegion = regionMap[region] || region; // 영어를 한국어로 변환
    console.log(`Request received for region: ${region} (${koreanRegion})`);

    const perPage = 389; // 페이지당 항목 수를 389로 설정
    let currentPage = 1;
    let allItems = [];
    let totalRows = 0;

    try {
        while (true) {
            const response = await axios.get(safeFoodingApiUrl, {
                params: {
                    serviceKey: safeFoodingApiKey,
                    currentPage: currentPage.toString(),
                    perPage: perPage.toString(),
                }
            });

            const { header, body } = response.data;
            console.log('Data received from API:', response.data);

            if (header && header.resultCode === '00') {
                const items = body.items && body.items.item;
                const itemArray = Array.isArray(items) ? items : [];

                // Log raw items
                console.log('Raw items:', itemArray);

                // Filter items
                const filteredItems = itemArray.filter(item => {
                    // Log each item being filtered
                    console.log('Filtering item:', item);
                    const locplcLower = item.LOCPLC ? item.LOCPLC.toLowerCase() : '';
                    console.log(`Checking if "${locplcLower}" includes "${koreanRegion.toLowerCase()}"`);
                    return locplcLower.includes(koreanRegion.toLowerCase());
                });

                // Log filtered items
                console.log('Filtered items:', filteredItems);

                allItems = allItems.concat(filteredItems);

                // Check if we have processed all pages
                if (itemArray.length < perPage || allItems.length >= (totalRows || body.totalRows)) {
                    // If the number of items is less than perPage, this is the last page
                    break;
                }
                
                totalRows = body.totalRows; // Update totalRows from the first page response
                currentPage += 1;
            } else {
                const errorMsg = header ? header.resultMsg : 'Unknown error';
                console.error('Error from API:', errorMsg);
                return res.status(500).json({ error: errorMsg });
            }
        }

        console.log(`Filtered items for region ${region}:`, allItems);
        res.json(allItems);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
    }
});

module.exports = router;
