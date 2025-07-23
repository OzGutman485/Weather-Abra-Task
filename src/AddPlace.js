import React, { useState } from 'react';
import './AddPlace.css';
import Navbar from './navbar';
import { useDispatch ,useSelector} from 'react-redux';
import { addPlace } from './PlacesSlice';
import { useNavigate } from 'react-router-dom';
function AddPlace() {
    const [typeplace, setTypePlace] = useState('');
    const[placeName, setPlaceName] = useState('');
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const checkvalidty = (e) => {
        const value = e.target.value;
        if (value.length >= 25) {
            alert("Place name must be at most 25 characters long");
        } else {
            setPlaceName(value);
        }
    }
    const dispatch = useDispatch();

     const handlesubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      dispatch(addPlace({ name: placeName, type: typeplace,address: address ,createdAt: new Date().toISOString()}));
      setLoading(false);
      alert("Place added successfully");
      setPlaceName('');
      setTypePlace('');
      setAddress('');
      navigate('/');
    }, 1000);
  };

      const places = useSelector((state) => state.places);
    if (loading) {
        return <div>Loading...
          {places.length}
        </div>;
    }

  return (
    <div>
        <Navbar/>
      <h1>Add a New Place</h1>
      <form onSubmit={handlesubmit}> 
        <label className='label'>
          Place Name:
          <input value={placeName} onChange={(e) => checkvalidty(e)} type="text" name="placeName" />
        </label>

        <select className='select' value={typeplace} onChange={(e) => setTypePlace(e.target.value)} name="type">
            <option value="restaurant">Restaurant</option>
            <option value="park">Park</option>
            <option value="hotel">Hotel</option>
        </select>
        <label className='label3'>
          Address:
            <input type="text" name="address" value={address} onChange={(e) => setAddress(e.target.value)} />
        </label>
        <button type="submit">Add Place</button>
      </form>
    </div>
  );
}
export default AddPlace;