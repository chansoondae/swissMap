import CityButton from './CityButton';

export default function CityButtonList({ cities, handleCityClick }) {
  return (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
      {cities.map((city) => (
        <CityButton key={city.name} city={city} handleCityClick={handleCityClick} />
      ))}
    </div>
  );
}
