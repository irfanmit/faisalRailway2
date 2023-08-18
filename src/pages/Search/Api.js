import React, { useState, useEffect } from 'react';
import TrainsData from './TrainsData';
import classes from './Api.module.css'
import Card from '../../Crad/Card';
import { startEndContext } from '../../store/cart-context';
import { useContext } from 'react';
import { useFormik } from 'formik';
import {validSchemas3} from '../../schemas/'

const initialValues = {
  start2: "",
  end2: ""
};

const Api = () => {
  const [data, setData] = useState([]);
  const { realStartValue, setRealStartValue, realEndValue, setRealEndValue } = useContext(startEndContext);

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
    validationSchema: validSchemas3,
    onSubmit: (values) => {
      setRealStartValue(values.start2);
      setRealEndValue(values.end2);
    }
    });


  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '8f85fc424amsh533f95edb1d7c01p1d743ajsndc348a523195',
        'X-RapidAPI-Host': 'irctc1.p.rapidapi.com'
      }
    };

    fetch(`https://irctc1.p.rapidapi.com/api/v2/trainBetweenStations?fromStationCode=${realStartValue}&toStationCode=${realEndValue}`, options)
      .then(response => response.json())
      .then(response => {
        const { data } = response;
        console.log(data);
        setData(data);
      })
      .catch(err => console.error(err));
  }, [realStartValue, realEndValue]);

  const trainsList = data.map((train) => {
    const runDays = train.run_days.map(day => day.charAt(0)).join(' ');
    return (
      <TrainsData 
        name={train.train_name} 
        no={train.train_number}
        classType={train.class_type} 
        origin={train.train_origin_station}
        depTime={train.depart_time}
        run={runDays}
        dest={train.train_destination_station}
        arriv={train.arrival_time}
      />
    );
  });
  if(data.length===0)
  {
    return <Card><div className={classes.zero}>
    <h1>Loading...</h1>
    </div>
    </Card>
  }

  return (
    
    <section className={classes.meals}>
    <div className={classes.divForm}>
    <form onSubmit={handleSubmit}>

      <input value={values.start2} onChange={handleChange} name="start2" placeholder='start (search via station code only)' type="text" />
      <div className={classes.error}>
            {errors.start2 && touched.start2 ? (
              <p>{errors.start2}</p>
            ) : null}
            </div>
      <input value={values.end2} onChange={handleChange} name="end2" placeholder='end (search via station code only)' type="text" />
      <div className={classes.error}>
            {errors.end2 && touched.end2 ? (
              <p>{errors.end2}</p>
            ) : null}
          </div>
          <button type="submit">Search again</button>
    </form>
    </div>
      <Card>
        <ul>{trainsList}</ul>
      </Card>   
    </section>
  );
};

export default Api;
