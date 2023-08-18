import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useState } from "react";
import { validSchemas } from '../../schemas';
import { Link } from 'react-router-dom';
import { startEndContext } from "../../store/cart-context";
import { useContext } from 'react';
import Autosuggest from 'react-autosuggest';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Button from '../Button';
import Search from "./Search";
import styles from './Form.module.css';
// import {setFieldValue}  from 'formik';

const initialValues = {
  start: "",
  end: ""
};

const stations = [
  { name: "Patna Junction", code: "PNBE" },
  { name: "Barauni Junction", code: "BJU" },
  { name: "Muzaffarpur Junction", code: "MFP" },
  { name: "Hajipur Junction", code: "HJP" },
  { name: "Chhapra Junction", code: "CPR" },
  { name: "Darbhanga Junction", code: "DBG" },
  { name: "Samastipur Junction", code: "SPJ" },
  { name: "Gorakhpur Junction", code: "GKP" },
  { name: "Varanasi Junction", code: "BSB" },
  { name: "Allahabad Junction", code: "ALD" },
  { name: "Lucknow Junction", code: "LJN" },
  { name: "Kanpur Central", code: "CNB" },
  { name: "New Delhi", code: "NDLS" },
  { name: "Howrah Junction", code: "HWH" },
  { name: "Sealdah", code: "SDAH" },
  { name: "Guwahati", code: "GHY" },
  { name: "Mumbai Central", code: "BCT" },
  { name: "Chennai Central", code: "MAS" },
  { name: "Bengaluru City", code: "SBC" },
  { name: "Hyderabad Deccan", code: "HYB" },
  { name: "Patna Junction", code: "PNBE" },
{ name: "Barauni Junction", code: "BJU" },
{ name: "Muzaffarpur Junction", code: "MFP" },
{ name: "Hajipur Junction", code: "HJP" },
{ name: "Chhapra Junction", code: "CPR" },
{ name: "Darbhanga Junction", code: "DBG" },
{ name: "Samastipur Junction", code: "SPJ" },
{ name: "Gorakhpur Junction", code: "GKP" },
{ name: "Varanasi Junction", code: "BSB" },
{ name: "Allahabad Junction", code: "ALD" },
{ name: "Lucknow Junction", code: "LJN" },
{ name: "Kanpur Central", code: "CNB" },
{ name: "New Delhi", code: "NDLS" },
{ name: "Howrah Junction", code: "HWH" },
{ name: "Sealdah", code: "SDAH" },
{ name: "Guwahati", code: "GHY" },
{ name: "Mumbai Central", code: "BCT" },
{ name: "Chennai Central", code: "MAS" },
{ name: "Bengaluru City", code: "SBC" },
{ name: "Hyderabad Deccan", code: "HYB" },
{ name: "Secunderabad Junction", code: "SC" },
{ name: "Vijayawada Junction", code: "BZA" },
{ name: "Visakhapatnam Junction", code: "VSKP" },
{ name: "Rajahmundry Junction", code: "RJY" },
{ name: "Tirupati", code: "TPTY" },
{ name: "Guntur Junction", code: "GNT" },
{ name: "Kazipet Junction", code: "KZJ" },
{ name: "Secunderabad East", code: "STPD" },
{ name: "Salem Junction", code: "SA" },
{ name: "Coimbatore Junction", code: "CBE" },
{ name: "Ernakulam Junction", code: "ERS" },
{ name: "Thiruvananthapuram Central", code: "TVC" },
{ name: "Kozhikode", code: "CLT" },
{ name: "Madurai Junction", code: "MDU" },
{ name: "Tiruchirappalli Junction", code: "TPJ" },
{ name: "Chennai Egmore", code: "MS" },
{ name: "Bhopal Junction", code: "BPL" },
{ name: "Indore Junction", code: "INDB" },
{ name: "Jabalpur Junction", code: "JBP" },
{ name: "Pune Junction", code: "PUNE" },
{ name: "Nagpur Junction", code: "NGP" },
{ name: "Solapur Junction", code: "SUR" },
{ name: "Bhubaneswar", code: "BBS" },
{ name: "Cuttack", code: "CTC" },
{ name: "Puri", code: "PURI" },
{ name: "Rourkela Junction", code: "ROU" },
];

const filterStations = (value) => {
  return stations.filter(station => {
    return station.name.toLowerCase().includes(value.toLowerCase())
  })
}

const Input = (props) => {
 
  // const [start, setStart] = useState('');
  // const [end, setEnd] = useState('');

  const { setRealStartValue, setRealEndValue } = useContext(startEndContext);

  // const [realStart, setRealStart] = useState("");
  // const [realEnd, setRealEnd] = useState("");

  const navigate = useNavigate();

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    isSubmitting,
    setFieldValue
  } = useFormik({
    initialValues: initialValues,
    validationSchema: validSchemas,
    onSubmit: (values) => {
      setRealStartValue(values.start);
      setRealEndValue(values.end);
      // setStart("");
      // setEnd("");
      console.log(values);
      navigate('/Search/Api');
    }
  });

  const [suggestions, setSuggestions] = useState([]);

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(filterStations(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = (event, { suggestion }, selectedField) => {
    if (selectedField === "start") {
      setFieldValue("start", suggestion.code);
    } else {
      setFieldValue("end", suggestion.code);
    }
    // ...
  }
  

  const renderSuggestion = (suggestion) => (
    <div className={ values.start.length>0 || values.end.length>0 ? (styles.suggestionsContainer):' '}>
      {suggestion.name}
    </div>
  );

  return (
    <>
      <div className={styles.search}>
        <form onSubmit={handleSubmit}>
        {/* <div className={ values.start.length>0 ? (styles.suggestionsContainer):' '}> */}
        <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            onSuggestionSelected={(event, { suggestion }) => onSuggestionSelected(event, { suggestion }, "start")}
            getSuggestionValue={(suggestion) => suggestion.name}
            renderSuggestion={renderSuggestion}
            inputProps={{
              name: 'start',
              value: values.start,
              onChange: handleChange,
              type: 'text',
              placeholder: 'From (your starting journey)',
            }}
          />
          {/* </div> */}
          <div className={styles.error}>
            {errors.start && touched.start ? (
              <p>{errors.start}</p>
            ) : null}
          </div>
          {/* <div className={styles.suggestionsContainer}> */}
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            onSuggestionSelected={(event, { suggestion }) => onSuggestionSelected(event, { suggestion }, "end")}
            getSuggestionValue={(suggestion) => suggestion.name}
            renderSuggestion={renderSuggestion}
            inputProps={{
              name: 'end',
              value: values.end,
              onChange: handleChange,
              type: 'text',
              placeholder: 'To',
            }}
          />
          {/* </div> */}
          <div className={styles.error}>
            {errors.end && touched.end ? (
              <p>{errors.end}</p>
            ) : null}
          </div>

          <button type="submit">search</button>
          {/* <Button type="submit">Search</Button> */}
          {/* <button type="submit">Search</button> */}
        </form>
      </div>
      {/* <Outlet/> */}
    </>
  );
};

export default Input;