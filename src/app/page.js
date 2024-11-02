//src/app/page.js
'use client'

import { useState, useMemo, useEffect } from 'react';
import { GoogleMap, Marker, Polyline, useLoadScript } from '@react-google-maps/api';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import * as XLSX from 'xlsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import CityButtonList from './components/CityButtonList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';


const cities = [
  { name: 'Interlaken', lat: 46.6863, lng: 7.8632, image: '/images/interlaken.jpg', url: 'https://cafe.naver.com/swissfriends/59840', attractions: [
    { name: '융프라우 Jungfrau', lat: 46.5483, lng: 7.9395, price: 160, url: 'https://cafe.naver.com/swissfriends/57880' },
    { name: '피르스트 First', lat: 46.6589, lng: 8.0521, price: 91.6, url: 'https://cafe.naver.com/swissfriends/57960' },
    { name: '멘리헨 Mannlichen', lat: 46.6181, lng: 7.9380, price: 90, url: 'https://cafe.naver.com/swissfriends/55622' },
    { name: '뮈렌 Murren', lat: 46.5610, lng: 7.8827, price: 39.2, url: 'https://cafe.naver.com/swissfriends/60147' },
    { name: '쉬니케 플라테 Schynige', lat: 46.6552, lng: 7.8875, price: 71.6, url: 'https://cafe.naver.com/swissfriends/55816' },
    { name: '하더 쿨름 Harder Kulm', lat: 46.6974, lng: 7.8311, price: 38, url: 'https://cafe.naver.com/swissfriends/59997' },
  ] },
  { name: 'Grindelwald', lat: 46.6242, lng: 8.0414, image: '/images/grindelwald.jpg', url: 'https://cafe.naver.com/swissfriends/59687', attractions: [
    { name: '융프라우 Jungfrau', lat: 46.5483, lng: 7.9395, price: 160, url: 'https://cafe.naver.com/swissfriends/57880' },
    { name: '피르스트 First', lat: 46.6589, lng: 8.0521, price: 68, url: 'https://cafe.naver.com/swissfriends/57960' },
    { name: '멘리헨 Mannlichen', lat: 46.6181, lng: 7.9380, price: 74, url: 'https://cafe.naver.com/swissfriends/55622' },
    { name: '뮈렌 Murren', lat: 46.5610, lng: 7.8827, price: 42.4, url: 'https://cafe.naver.com/swissfriends/60147' },
    { name: '쉬니케 플라테 Schynige', lat: 46.6552, lng: 7.8875, price: 84.4, url: 'https://cafe.naver.com/swissfriends/55816' },
    { name: '하더 쿨름 Harder Kulm', lat: 46.6974, lng: 7.8311, price: 46, url: 'https://cafe.naver.com/swissfriends/59997' },
  ] },
  { name: 'Luzern', lat: 47.0502, lng: 8.3093, image: '/images/luzern.jpg', url: 'https://cafe.naver.com/swissfriends/45996', attractions: [
    { name: '리기산 Rigi', lat: 47.0449, lng: 8.4836, price: 78, url: 'https://cafe.naver.com/swissfriends/52888' },
    { name: '슈탄저호른 Stanserhorn', lat: 46.9784, lng: 8.2565, price: 82, url: 'https://cafe.naver.com/swissfriends/61349' },
    { name: '필라투스 Pilatus', lat: 46.9784, lng: 8.2565, price: 72, url: 'https://cafe.naver.com/swissfriends/61653' },
    { name: '티틀리스 Titlis', lat: 46.9784, lng: 8.2565, price: 96, url: 'https://cafe.naver.com/swissfriends/61592' },
    { name: '슈토스 Stoos', lat: 46.9784, lng: 8.2565, price: 56, url: 'https://cafe.naver.com/swissfriends/61619' },
  ] },
  { name: 'Zermatt', lat: 46.0207, lng: 7.7491, image: '/images/zermatt.jpg', url: 'https://cafe.naver.com/swissfriends/50186', attractions: [
    { name: '고르너그라트 Gornergrat', lat: 45.9836, lng: 7.7859, price: 126, url: 'https://cafe.naver.com/swissfriends/64892' },
    { name: '수네가 Sunnegga', lat: 46.0168, lng: 7.7692, price: 28.5, url: 'https://cafe.naver.com/swissfriends/44734' },
    { name: '블라우헤르트 Blauherd', lat: 46.0196, lng: 7.7682, price: 58.5, url: 'https://cafe.naver.com/swissfriends/44734' },
    { name: 'Matterhorn Glacier', lat: 45.9384, lng: 7.7275, price: 120, url: 'https://cafe.naver.com/swissfriends/28650' },
  ] },
  { name: 'Zurich', lat: 47.3769, lng: 8.5417, image: '/images/zurich.jpg', url: 'https://cafe.naver.com/swissfriends/52570' },
  { name: 'Basel', lat: 47.5596, lng: 7.5886, image: '/images/basel.jpg', url: 'https://cafe.naver.com/swissfriends/80' },
  { name: 'Bern', lat: 46.948, lng: 7.4474, image: '/images/bern.jpg', url: 'https://cafe.naver.com/swissfriends/45914' },
  { name: 'Montreux', lat: 46.4312, lng: 6.9107, image: '/images/montreux.jpg', url: 'https://cafe.naver.com/swissfriends/59653' },
  { name: 'Geneva', lat: 46.2044, lng: 6.1432, image: '/images/geneva.jpg', url: 'https://cafe.naver.com/swissfriends/22546' },
  { name: 'Lausanne', lat: 46.5197, lng: 6.6323, image: '/images/lausanne.jpg', url: 'https://cafe.naver.com/swissfriends/28715' },
];

const DraggableCity = ({ city, index, moveCity, deleteCity, handleAttractionChange }) => {
  const [, ref] = useDrag({
    type: 'city',
    item: { index },
  });

  const [, drop] = useDrop({
    accept: 'city',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveCity(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <li
      ref={(node) => ref(drop(node))}
      style={{
        marginBottom: '10px',
        padding: '10px',
        backgroundColor: '#fffccc',
        borderRadius: '4px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{
            fontSize: '18px', // 원하는 폰트 크기로 설정
            fontWeight: 'bold', // 필요 시 폰트 두께도 설정
          }}
          > 📍{city.name} <a 
              href={city.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-link"
            >
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="fa-fw" style={{ marginRight: '5px' }} />
          </a></span>

        <button
          onClick={() => deleteCity(city.id)}
          className="btn btn-danger btn-sm"
        >
          X
        </button>
      </div>
      {city.attractions && city.attractions.length > 0 && (
        <div style={{ marginTop: '10px' }}>
          {city.attractions.map((attraction) => (
            <div className="form-check" key={attraction.name}>
              <input
                className="form-check-input"
                type="checkbox"
                id={`${city.id}-${attraction.name}`}
                name={attraction.name}
                checked={attraction.selected}
                onChange={() => handleAttractionChange(city.id, attraction.name)}
              />
              <label className="form-check-label" htmlFor={`${city.id}-${attraction.name}`}>
                {attraction.name}
                <a 
                  href={attraction.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-link"
                >
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="fa-fw" style={{ marginRight: '5px' }} />
                </a>
              </label>
            </div>
          ))}
        </div>
      )}
    </li>
  );
};

export default function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
  });

  const [selectedCities, setSelectedCities] = useState([]);
  const [transportCosts, setTransportCosts] = useState({});
  const [totalCost, setTotalCost] = useState(0);
  const [segmentCosts, setSegmentCosts] = useState([]);
  const [selectedSwissPass, setSelectedSwissPass] = useState(244);
  const [selectedJungfrauPass, setSelectedJungfrauPass] = useState(0);

  const SWISS_PASS_PRICES = {
    "3 day": 244,
    "4 day": 295,
    "6 day": 379,
    "8 day": 419,
    "15 day": 459
  };

  const JUNGFRAU_VIP_PRICES = {
    "None": 0,
    "1 day": 175,
    "2 day": 200,
    "3 day": 215,
    "4 day": 235
  };

  // 선택된 패스 가격의 합계 계산
  const sumPass = selectedSwissPass + selectedJungfrauPass;

  // 추천 배지 설정
  const isTotalCostRecommended = totalCost < sumPass;
  const isSumPassRecommended = sumPass < totalCost;

  // Load transport cost data from Excel file on component mount
  useEffect(() => {
    const fetchTransportCosts = async () => {
      try {
        const response = await fetch('/swiss_city_transport_cost_template_simplified.xlsx');
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        
        // Convert to dictionary format for quick lookup
        const costData = {};
        data.forEach((row, rowIndex) => {
          if (rowIndex === 0) return; // Skip header
          const cityA = row[0];
          row.slice(1).forEach((cost, colIndex) => {
            const cityB = data[0][colIndex + 1];
            if (cityA && cityB && cost !== undefined) {
              costData[`${cityA}-${cityB}`] = cost;
              costData[`${cityB}-${cityA}`] = cost; // Symmetric cost
            }
          });
        });
        
        setTransportCosts(costData);
      } catch (error) {
        console.error("Error loading transport cost data:", error);
      }
    };

    fetchTransportCosts();
  }, []);

  // Calculate total and segment costs
  useEffect(() => {
    let cost = 0;
    const segments = [];
    for (let i = 0; i < selectedCities.length - 1; i++) {
      const cityA = selectedCities[i].name;
      const cityB = selectedCities[i + 1].name;
      const segmentCost = transportCosts[`${cityA}-${cityB}`] || 0;
      segments.push(`${cityA} -> ${cityB}: CHF ${segmentCost}`);
      cost += segmentCost;
    }

    // Add costs for attractions
    selectedCities.forEach((city) => {
      city.attractions.forEach((attraction) => {
        if (attraction.selected) {
          segments.push(`${city.name} <-> ${attraction.name}: CHF ${attraction.price}`);
          cost += attraction.price;
        }
      });
    });

    setTotalCost(cost);
    setSegmentCosts(segments);
  }, [selectedCities, transportCosts]);

  const handleCityClick = (city) => {
    const newCity = {
      ...city,
      id: Date.now(), // Unique ID for each selected city
      attractions: city.attractions ? city.attractions.map(attraction => ({ ...attraction, selected: false })) : [],
    };
    setSelectedCities((prev) => [...prev, newCity]);
  };

  const moveCity = (fromIndex, toIndex) => {
    setSelectedCities((prevCities) => {
      const updatedCities = [...prevCities];
      const [movedCity] = updatedCities.splice(fromIndex, 1);
      updatedCities.splice(toIndex, 0, movedCity);
      return updatedCities;
    });
  };

  const handleDeleteCity = (cityId) => {
    setSelectedCities((prev) => prev.filter((city) => city.id !== cityId));
  };

  const handleAttractionChange = (cityId, attractionName) => {
    setSelectedCities((prevCities) =>
      prevCities.map((city) =>
        city.id === cityId
          ? {
              ...city,
              attractions: city.attractions.map((attraction) =>
                attraction.name === attractionName
                  ? { ...attraction, selected: !attraction.selected }
                  : attraction
              ),
            }
          : city
      )
    );
  };

  const cityPath = useMemo(() =>
    selectedCities.map(city => ({ lat: city.lat, lng: city.lng })),
    [selectedCities]
  );

  const attractionMarkers = useMemo(() =>
    selectedCities.flatMap(city =>
      city.attractions.filter(attraction => attraction.selected).map(attraction => ({
        lat: attraction.lat,
        lng: attraction.lng,
        name: attraction.name,
      }))
    ),
    [selectedCities]
  );

  const attractionPaths = useMemo(() => {
    const paths = [];
    selectedCities.forEach(city => {
      if (city.attractions) {
        city.attractions.forEach(attraction => {
          if (attraction.selected) {
            paths.push({
              parent: { lat: city.lat, lng: city.lng },
              child: { lat: attraction.lat, lng: attraction.lng }
            });
          }
        });
      }
    });
    return paths;
  }, [selectedCities]);

  if (!isLoaded) return <div>Loading...</div>;


  const handleSwissPassChange = (event) => {
    setSelectedSwissPass(Number(event.target.value));
  };

  const handleJungfrauPassChange = (event) => {
    setSelectedJungfrauPass(Number(event.target.value));
  };

  return (
    <div
    style={{
      maxWidth: '970px', // 최대 너비 970px로 제한
      width: '100%',     // 부모 컨테이너에 맞춰 100% 너비
      margin: '0 auto',  // 화면 가운데 정렬
      padding: '20px'    // 화면의 여백
    }}
  >
    <DndProvider backend={HTML5Backend}>
      <div style={{ padding: "20px" }}>
        <h1>🇨🇭Swiss Planner</h1>
        <CityButtonList cities={cities} handleCityClick={handleCityClick} />


        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '500px' }}
          center={{ lat: 46.8182, lng: 8.2275 }}
          zoom={8}
          options={{
            disableDefaultUI: true,
            // gestureHandling: "none"
        }}
        >
          {selectedCities.map((city) => (
            <Marker
              key={city.id}
              position={{ lat: city.lat, lng: city.lng }}
              icon={{
                url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
              }}
            />
          ))}
          {attractionMarkers.map((attraction, index) => (
            <Marker
              key={`attraction-marker-${index}`}
              position={{ lat: attraction.lat, lng: attraction.lng }}
              icon={{
                url: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
              }}
            />
          ))}
          <Polyline
            path={cityPath}
            options={{ strokeColor: '#FF0000', strokeWeight: 2 }}
          />
          {/* {attractionPaths.map((path, index) => (
            <Polyline
              key={`attraction-polyline-${index}`}
              path={[path.parent, path.child]}
              options={{ strokeColor: '#FFFF00', strokeWeight: 2 }}
            />
          ))} */}
        </GoogleMap>
        <div style={{ marginTop: '20px' }}>
          <h2>여행 일정표</h2>
          <ul style={{ listStyleType: 'none', padding: 0}}>
            {selectedCities.map((city, index) => (
              <DraggableCity 
                key={city.id} 
                city={city} 
                index={index} 
                moveCity={moveCity}
                deleteCity={handleDeleteCity} 
                handleAttractionChange={handleAttractionChange}
              />
            ))}
          </ul>
          <div
            style={{
              backgroundColor: isTotalCostRecommended ? '#fff4e6' : 'transparent',  // 추천일 때만 배경색
              border: isTotalCostRecommended ? '2px solid #ffa726' : 'none',         // 추천일 때만 테두리
              borderRadius: '8px',
              padding: '10px',
              marginBottom: '15px'
            }}
          >
            {isTotalCostRecommended && (
                <span style={{
                  backgroundColor: '#ffa726',
                  color: '#fff',
                  padding: '5px 10px',
                  borderRadius: '4px',
                  fontWeight: 'bold',
                  display: 'inline-block',
                  marginTop: '5px',
                  marginBottom: '10px'
                }}>
                  Recommend
                </span>
              )}
            <h2>구간권 합계: <span style={{ color: 'red' }}>CHF {totalCost}</span></h2>
            
          </div>
          <ul>
            {segmentCosts.map((segment, index) => (
              <li key={index}>{segment}</li>
            ))}
          </ul>
        </div>
        {/* 스위스 트래블 패스 및 융프라우 VIP 패스 선택 */}
        <div style={{ marginTop: '20px', borderTop: '1px solid #ddd', paddingTop: '20px' }}>
          <div
              style={{
                backgroundColor: isSumPassRecommended ? '#e3f2fd' : 'transparent',  // 추천일 때만 배경색
                border: isSumPassRecommended ? '2px solid #42a5f5' : 'none',        // 추천일 때만 테두리
                borderRadius: '8px',
                padding: '10px',
                marginBottom: '15px'
              }}
            >
            {isSumPassRecommended && (
              <span style={{
                backgroundColor: '#42a5f5',
                color: '#fff',
                padding: '5px 10px',
                borderRadius: '4px',
                fontWeight: 'bold',
                display: 'inline-block',
                marginTop: '5px',
                marginBottom: '10px'
              }}>
                Recommend
              </span>
            )}  
            <h2>패스 합계: <span style={{ color: 'red' }}>CHF {sumPass}</span></h2>
          </div>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'space-around' }}>
            {/* Swiss Travel Pass */}
            <div
              style={{
                backgroundColor: '#e0f7fa',  // 밝은 청록색 배경색
                borderRadius: '8px',         // 모서리 둥글게
                padding: '15px',             // 내부 여백
                display: 'inline-block',     // 인라인 블록
                width: '45%'                 // 부모 요소 기준 너비 45% 설정
              }}
            >
              <h5>Swiss Travel Pass</h5>
              {Object.entries(SWISS_PASS_PRICES).map(([key, price]) => (
                <div className="form-check" key={key}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="swissPass"
                    value={price}
                    checked={selectedSwissPass === price}
                    onChange={handleSwissPassChange}
                    id={`swissPass-${key}`}
                  />
                  <label className="form-check-label" htmlFor={`swissPass-${key}`}>
                    {`${key}: CHF ${price}`}
                  </label>
                </div>
              ))}
            </div>

            {/* Jungfrau VIP Pass */}
            <div 
              style={{
                backgroundColor: '#fbe9e7',  // 밝은 살구색 배경색
                borderRadius: '8px',         // 모서리 둥글게
                padding: '15px',             // 내부 여백
                display: 'inline-block',     // 인라인 블록
                width: '45%'                 // 부모 요소 기준 너비 45% 설정
            }}>
              <h5>Jungfrau VIP Pass</h5>
              {Object.entries(JUNGFRAU_VIP_PRICES).map(([key, price]) => (
                <div className="form-check" key={key}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="jungfrauPass"
                    value={price}
                    checked={selectedJungfrauPass === price}
                    onChange={handleJungfrauPassChange}
                    id={`jungfrauPass-${key}`}
                  />
                  <label className="form-check-label" htmlFor={`jungfrauPass-${key}`}>
                    {`${key}: CHF ${price}`}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
    </div>
  );
}