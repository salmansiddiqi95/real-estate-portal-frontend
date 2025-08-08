import { useState, useEffect } from 'react';
import axios from '../api/axios';
import { useParams } from 'react-router-dom';

export default function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    async function fetchProperty() {
      try {
        const res = await axios.get(`/properties/${id}`);
        setProperty(res.data);
        setLoading(false);

        // Check if favorite
        const favRes = await axios.get('/favorites');
        setIsFavorite(favRes.data.some(fav => fav.id === res.data.id));
      } catch (err) {
        console.error('Failed to fetch property', err);
        setLoading(false);
      }
    }
    fetchProperty();
  }, [id]);

  const handleToggleFavorite = async () => {
    try {
      await axios.post(`/favorites/${property.id}`);
      setIsFavorite(!isFavorite);
      alert(isFavorite ? 'Removed from favorites' : 'Added to favorites');
    } catch (err) {
      console.error(err);
      alert('Failed to toggle favorite');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!property) return <p>Property not found</p>;

  return (
    <div className="row">
      <div className="col-md-8">
        {/* Images Carousel */}
        <div id="propertyImages" className="carousel slide mb-4" data-bs-ride="carousel">
          <div className="carousel-inner">
            {(property.imageUrls?.length ? property.imageUrls : ['https://via.placeholder.com/800x400']).map((img, idx) => (
              <div key={idx} className={`carousel-item ${idx === 0 ? 'active' : ''}`}>
                <img src={img} className="d-block w-100" alt={`Slide ${idx + 1}`} style={{ height: '400px', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
          {property.imageUrls?.length > 1 && (
            <>
              <button className="carousel-control-prev" type="button" data-bs-target="#propertyImages" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#propertyImages" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </>
          )}
        </div>
      </div>
      <div className="col-md-4">
        <h2>{property.title}</h2>
        <p>{property.address}</p>
        <p><strong>Price:</strong> ${property.price}</p>
        <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
        <p><strong>Bathrooms:</strong> {property.bathrooms}</p>
        <p><strong>Car spots:</strong> {property.carSpots}</p>
        <p>{property.description}</p>
        <button
          className={`btn ${isFavorite ? 'btn-danger' : 'btn-primary'}`}
          onClick={handleToggleFavorite}
        >
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
      </div>
    </div>
  );
}