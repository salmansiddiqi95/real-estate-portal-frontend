import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function AddPropertyPage() {
  const [form, setForm] = useState({
    title: '',
    address: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    carSpots: '',
    description: '',
    imageUrls: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        price: parseFloat(form.price),
        bedrooms: parseInt(form.bedrooms),
        bathrooms: parseInt(form.bathrooms),
        carSpots: parseInt(form.carSpots),
        imageUrls: form.imageUrls.split(',').map(url => url.trim())
        };

        await axios.post('/properties', payload);
      alert('Property added successfully!');
      navigate('/admin'); // redirect to admin properties list
    } catch (err) {
      console.error(err);
      alert('Failed to add property.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add New Property</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input 
            type="text" 
            className="form-control" 
            name="title" 
            value={form.title} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="mb-3">
          <label className="form-label">Address</label>
          <input 
            type="text" 
            className="form-control" 
            name="address" 
            value={form.address} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Price</label>
          <input 
            type="number" 
            className="form-control" 
            name="price" 
            value={form.price} 
            onChange={handleChange} 
            required 
            min="0"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Bedrooms</label>
          <input 
            type="number" 
            className="form-control" 
            name="bedrooms" 
            value={form.bedrooms} 
            onChange={handleChange} 
            required 
            min="0"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Bathrooms</label>
          <input 
            type="number" 
            className="form-control" 
            name="bathrooms" 
            value={form.bathrooms} 
            onChange={handleChange} 
            required 
            min="0"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Car Spots</label>
          <input 
            type="number" 
            className="form-control" 
            name="carSpots" 
            value={form.carSpots} 
            onChange={handleChange} 
            required 
            min="0"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea 
            className="form-control" 
            name="description" 
            value={form.description} 
            onChange={handleChange} 
            rows="4" 
            required 
          />
        </div>

        <div className="mb-3">
            <label className="form-label">Image URLs (comma-separated)</label>
            <input 
                type="text" 
                className="form-control" 
                name="imageUrls" 
                value={form.imageUrls} 
                onChange={handleChange} 
                required 
            />
        </div>

        <button type="submit" className="btn btn-primary">Add Property</button>
      </form>
    </div>
  );
}
