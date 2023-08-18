import React, { useEffect, useState, useContext } from 'react';
import Card2 from '../../Crad/Card2';
import classes from './TrackApi.module.css';
import { dataContext } from '../../store/cart-context';

const TrackApi = (props) => {
  const { data, setData } = useContext(dataContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '8f85fc424amsh533f95edb1d7c01p1d743ajsndc348a523195',
        'X-RapidAPI-Host': 'irctc1.p.rapidapi.com',
      },
    };

    fetch(`https://irctc1.p.rapidapi.com/api/v1/liveTrainStatus?trainNo=${props.trainNo}`, options)
      .then((response) => response.json())
      .then((response) => {
        const { data } = response;
        console.log(data);
        setData(data);
        setIsLoaded(true);
      })
      .catch((err) => console.error(err));
  }, [props.trainNo, setData]);

  if (!isLoaded) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return <><h1>API fault occurred <bold>or</bold> invalid input</h1>
    <h2>Please try searching again</h2>
    </>
  }
  if(data.length===0)
  {
    return <h1>Loading...</h1>;
  }
  

  const distancePercentage = data ? ((data.distance_from_source / data.total_distance) * 100).toFixed(2) : 0;

  const trainStyle = {
    height: `${distancePercentage}%`,
    transition: 'height 5s ease-in-out',
    animation: 'none',
  };

  return (
    <>
      <div className={classes.lists}>
        <h1>{data.ir_train_name} | {data.train_start_date}</h1>

        {data.at_dstn === false && data.at_src === false ? (
          <div>
            <div className={classes.journ}>
              <div className={classes.train} style={trainStyle}></div>
              {hover && <div className={classes.current} style={{
                      top: `${((data.distance_from_source / data.total_distance) * 100).toFixed(2)}%`,
                    }}>
                     <span style={{backgroundColor:'aqua'}}> {(data.current_location_info[0].readable_message)}</span>
                      <div>{(data.current_location_info[1].readable_message)}</div>
                  </div>}
            </div>
            
            <div className={classes.journ}>
              {data.upcoming_stations && data.previous_stations.concat(data.upcoming_stations).map((station) => (
                <div style={{ display: 'flex' }}>
                  <div
                    className={classes.stop}
                    key={station.station_code}
                    style={{
                      top: `${((station.distance_from_source / data.total_distance) * 100).toFixed(2)}%`,
                    }}
                  ></div>
                  
                  <div className={classes.journ2} style={{
                    top: `${((station.distance_from_source / data.total_distance) * 100).toFixed(2)}%`,
                  }}>{station.station_name}</div>
                </div>
              ))}
              <div className={classes.icon} style={{
                top: `${((data.distance_from_source / data.total_distance) * 100).toFixed(2)}%`,
                            }}onMouseOver={() => setHover(true)}
                onMouseOut={() => setHover(false)}>
                  
                </div>
            </div>
          </div>
        ) : (
          <h1>
            The train has not yet started
            {data.at_dstn ? (
              <span> and is at the destination station</span>
            ) : (
              <span> and is at the source station</span>
            )}
          </h1>
        )}
      </div>
    </>
  );
};

export default TrackApi
