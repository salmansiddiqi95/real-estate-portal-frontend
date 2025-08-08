import { useState, useEffect } from 'react';
import axios from '../api/axios';

export default function AdminProperties() {
  const [properties, setProperties] = useState([]);
  const [form, setForm] = useState({
    id: null,
    title: '',
    address: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    carSpots: '',
    description: '',
  });

  useEffect(() => {
    fetchProperties();
  }, []);

  async function fetchProperties() {
    try {
      const res = await axios.get('/properties');
      setProperties(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = (property) => {
    setForm(property);
  };

  const handleClearForm = () => {
    setForm({
      id: null,
      title: '',
      address: '',
      price: '',
      bedrooms: '',
      bathrooms: '',
      carSpots: '',
      description: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form.id) {
        await axios.put(`/properties/${form.id}`, form);
        alert('Property updated');
      } else {
        await axios.post('/properties', form);
        alert('Property added');
      }
      handleClearForm();
      fetchProperties();
    } catch (err) {
      console.error(err);
      alert('Failed to save property');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this property?')) return;
    try {
      await axios.delete(`/properties/${id}`);
      fetchProperties();
    } catch (err) {
      console.error(err);
      alert('Failed to delete property');
    }
  };

  return (
    <div>
      <h2 className="mb-4">Admin Property Management</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-3">
          <div className="col-md-6">
            <input
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="col-md-6">
            <input
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="col-md-3">
            <input
              name="price"
              placeholder="Price"
              type="number"
              value={form.price}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="col-md-3">
            <input
              name="bedrooms"
              placeholder="Bedrooms"
              type="number"
              value={form.bedrooms}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="col-md-3">
            <input
              name="bathrooms"
              placeholder="Bathrooms"
              type="number"
              value={form.bathrooms}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="col-md-3">
            <input
              name="carSpots"
              placeholder="Car Spots"
              type="number"
              value={form.carSpots}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="col-12">
            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              required
              className="form-control"
              rows="3"
            />
          </div>
        </div>
        <div className="mt-3 d-flex gap-2">
          <button type="submit" className="btn btn-success">
            {form.id ? 'Update' : 'Add'} Property
          </button>
          <button
            type="button"
            onClick={handleClearForm}
            className="btn btn-secondary"
          >
            Clear
          </button>
        </div>
      </form>

      <div className="list-group">
        {properties.map((p) => (
          <div
            key={p.id}
            className="list-group-item list-group-item-action mb-2"
          >
            <h5>{p.title}</h5>
            <p>{p.address}</p>
            <p>
              Price: ${p.price} | Bedrooms: {p.bedrooms} | Bathrooms: {p.bathrooms}{' '}
              | Car spots: {p.carSpots}
            </p>
            <p>{p.description}</p>
            <button
              className="btn btn-primary me-2"
              onClick={() => handleEdit(p)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger"
              onClick={() => handleDelete(p.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
