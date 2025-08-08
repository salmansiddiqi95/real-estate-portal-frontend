import { useState, useEffect } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({
    suburb: '',
    bedrooms: '',
    priceMin: '',
    priceMax: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchProperties();
  }, []);

  async function fetchProperties() {
    try {
      const params = new URLSearchParams();
      if (filters.suburb) params.append('suburb', filters.suburb);
      if (filters.bedrooms) params.append('bedrooms', filters.bedrooms);
      if (filters.priceMin) params.append('priceMin', filters.priceMin);
      if (filters.priceMax) params.append('priceMax', filters.priceMax);

      const res = await axios.get(`/properties?${params.toString()}`);
      setProperties(res.data);
    } catch (err) {
      console.error('Failed to fetch properties', err);
    }
  }

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchProperties();
  };

  return (
    <div>
      <h2 className="mb-4">Property Listings</h2>

      <form onSubmit={handleFilterSubmit} className="row g-3 mb-4">
        <div className="col-md-3">
          <input
            name="suburb"
            placeholder="Suburb"
            value={filters.suburb}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="col-md-2">
          <input
            name="bedrooms"
            placeholder="Bedrooms"
            type="number"
            min="0"
            value={filters.bedrooms}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="col-md-2">
          <input
            name="priceMin"
            placeholder="Min Price"
            type="number"
            min="0"
            value={filters.priceMin}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="col-md-2">
          <input
            name="priceMax"
            placeholder="Max Price"
            type="number"
            min="0"
            value={filters.priceMax}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="col-md-3 d-grid">
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </div>
      </form>

      {properties.length === 0 ? (
        <p>No properties found.</p>
      ) : (
        <div className="row">
          {properties.map((p) => (
            <div
              key={p.id}
              className="col-md-6 col-lg-4 mb-4"
              onClick={() => navigate(`/property/${p.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <div className="card h-100">
                {/* Placeholder image */}
                <img
                  src={p.imageUrls?.[0] || 'https://via.placeholder.com/400x200'}
                  className="card-img-top"
                  alt={p.title}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.title}</h5>
                  <p className="card-text">{p.address}</p>
                  <p className="card-text">
                    <strong>Price:</strong> ${p.price}
                  </p>
                  <p className="card-text">
                    <strong>Bedrooms:</strong> {p.bedrooms}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}