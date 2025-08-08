import { useState, useEffect } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchFavorites() {
      try {
        const res = await axios.get('/favorites');
        setFavorites(res.data);
      } catch (err) {
        console.error('Failed to fetch favorites', err);
      }
    }
    fetchFavorites();
  }, []);

  const handleToggleFavorite = async (propertyId) => {
    try {
      await axios.post(`/favorites/${propertyId}`);
      const res = await axios.get('/favorites');
      setFavorites(res.data);
    } catch (err) {
      console.error('Failed to toggle favorite', err);
    }
  };

  if (favorites.length === 0) return <p>You have no favorite properties yet.</p>;

  return (
    <div>
      <h2 className="mb-4">My Favorite Properties</h2>
      <div className="row">
        {favorites.map((p) => (
          <div key={p.id} className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100">
              <img
                src={p.imageUrls?.[0] || 'https://via.placeholder.com/400x200'}
                className="card-img-top"
                alt={p.title}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5
                  className="card-title"
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/property/${p.id}`)}
                >
                  {p.title}
                </h5>
                <p className="card-text">{p.address}</p>
                <button
                  className="btn btn-danger"
                  onClick={() => handleToggleFavorite(p.id)}
                >
                  Remove from Favorites
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
