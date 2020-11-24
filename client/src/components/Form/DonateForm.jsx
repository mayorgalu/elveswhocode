import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import { useHistory } from 'react-router-dom';

function DonateForm() {
  const history = useHistory();
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const { setCharities } = useContext(AppContext);
  const { register, errors } = useForm();
  const onSubmit = (data) => {
    //code here what to do with data
  };
  const searchApi = async () => {
    try {
      const response = await axios.get(
        `/charitysearch?state=${state}&city=${city}&zip=${zip}`
      );

      const getGeo = await Promise.all(
        response.data.data.map(async (charity) => {
          charity.fullAddress = `${charity.mailingAddress.streetAddress1} ${charity.mailingAddress.city} ${charity.mailingAddress.stateOrProvince} ${charity.mailingAddress.postalCode}`;
          return charity;
        })
      );

      setCharities(getGeo);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    searchApi();
    history.push('/showcase');
  };

  const stateChange = (event) => {
    setState(event.target.value);
  };
  const cityChange = (event) => {
    setCity(event.target.value);
  };
  const zipChange = (event) => {
    setZip(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        id="state"
        name="state"
        ref={register({ required: 'STATE REQUIRED' })}
        onChange={stateChange}
      />
      <br></br>
      {errors.state && <p>{errors.state.message}</p>}
      <br></br>
      <input
        type="text"
        id="city"
        name="city"
        ref={register({ required: 'CITY REQUIRED' })}
        onChange={cityChange}
      />
      <br></br>
      {errors.county && <p>{errors.county.message}</p>}
      <br></br>
      <input
        type="text"
        id="zip"
        name="zip"
        ref={register({ required: 'ZIP REQUIRED' })}
        onChange={zipChange}
      />
      <br></br>
      {errors.county && <p>{errors.county.message}</p>}
      <br></br>
      <input type="submit" id="submit" />
    </form>
  );
}
export default DonateForm;
