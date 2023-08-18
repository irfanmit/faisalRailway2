import { React, useState, useEffect } from 'react';
import styles from './Track.module.css';
import { useContext } from 'react';
import DatePicker from 'react-datepicker';
import { Link, useLocation } from 'react-router-dom';
import { trackContext } from '../../store/cart-context';
import { useNavigate } from 'react-router-dom';
// import { data } from './TrackApi';
import { dataContext } from '../../store/cart-context';

import TrackApi from './TrackApi';

const Track = () => {
  const navigate = useNavigate();
  const {data, setdata} = useContext(dataContext)
  const [realNo, setRealNo] = useState('');
  const [track, setTrack] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const { theTrainNo, setTheTrainNo } = useContext(trackContext);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const trainNo = params.get('trainNo');
    if (trainNo) {
      setTheTrainNo(trainNo);
    }
  }, [location.search, setTheTrainNo]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setTrack(true);
    setRealNo(theTrainNo);
    // setTheTrainNo("");
    // navigate(`/track?trainNo=${theTrainNo}`);
  };

  const handleChange = (event) => {
    console.log(theTrainNo);
    setTheTrainNo(event.target.value);
  };

  const clearInput = () => {
    setTheTrainNo('');
    setTrack(false);
  };

  const handleDateChange = (date) => {
    setStartDate(date);
  };

  useEffect(() => {
    if (theTrainNo && theTrainNo.length === 5) {
      handleSubmit({ preventDefault: () => {} });
    }
  }, [theTrainNo]);

  return (
    <>
      <div className={styles.image}>
        {
          <div className={styles.input}>
            <form onSubmit={handleSubmit}>
              <div className={styles.inputContainer}>
                <input
                  placeholder="Enter your train name"
                  value={theTrainNo}
                  onChange={handleChange}
                />

                {theTrainNo && (
                  <div className={styles.bt}>
                    <button
                      type="button"
                      className={styles.clearButton}
                      onClick={clearInput}
                    >
                      X
                    </button>
                  </div>
                )}
              </div>
              <div className={styles.btn}>
                <button type="submit">Search</button>
              </div>
              {/* <DatePicker
              selected={startDate}
              onChange={handleDateChange}
              placeholderText="Select a date"
              dateFormat="dd/MM/yyyy"
            /> */}
             {<h1 style={{color: '#ee8d8d'}}>{data?.ir_train_name}</h1>}
              {track && (
                <div
                  className={styles.result}
                  style={{
                    height: (data?.at_src===true || data?.at_dstn===true) ? '50vh' : '250vh',
width : (data?.at_src===true || data?.at_dstn===true) ? '210%' : '210%'

                  }}
                >
                  <TrackApi trainNo={realNo} />
                </div>
              )}
            </form>
          </div>
        }
      </div>
    </>
  );
};

export default Track;
