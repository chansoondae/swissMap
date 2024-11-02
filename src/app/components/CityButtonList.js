import CityButton from './CityButton';

export default function CityButtonList({ cities, handleCityClick }) {
  return (
    <div 
      style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'space-around',  // 수평 정렬: space-around
          marginBottom: '10px' 
      }}
    >
      {cities.map((city) => (
        <CityButton key={city.name} city={city} handleCityClick={handleCityClick} />
      ))}
    </div>
  );
}
