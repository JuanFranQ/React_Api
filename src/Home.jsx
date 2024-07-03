import React, { useState } from "react";
import axios from "axios";
import "./index.css";

function Home() {
  const [data, setData] = useState({
    celcius: 10,
    name: "Quito",
    humidity: 10,
    speed: 2,
    image: "/Images/clouds.png",
  });
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleClick = () => {
    if (name !== "") {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=76e0f4447ad5e7308e89437f7bca7645&units=metric`;
      axios
        .get(apiUrl)
        .then((res) => {
          let imagePath = "/Images/clouds.png";

          if (res.data.weather[0].main === "Clear") {
            imagePath = "/Images/clear.png";
          } else if (res.data.weather[0].main === "Rain") {
            imagePath = "/Images/rain.png";
          } else if (res.data.weather[0].main === "Drizzle") {
            imagePath = "/Images/drizzle.png";
          } else if (res.data.weather[0].main === "Mist") {
            imagePath = "/Images/mist.png";
          } else {
            imagePath = "/Images/clouds.png";
          }
          setData({
            ...data,
            celcius: res.data.main.temp,
            name: res.data.name,
            humidity: res.data.main.humidity,
            speed: res.data.wind.speed,
            image: imagePath,
          });
          setError("");
        })
        .catch((err) => {
          if (err.response && err.response.status === 400) {
            setError("Invalid City Name");
          } else {
            setError("Failed to fetch weather data");
          }
          console.log(err);
        });
    }
  };

  return (
    <div className="container">
      <div className="weather">
        <div className="search">
          <input
            type="text"
            placeholder="Enter City Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={handleClick}>
            <img src="/Images/search.png" alt="Search" />
          </button>
        </div>
        <div className="error">
          <p>{error}</p>
        </div>
        <div className="winfo">
          <img src={data.image} alt="" className="icon" />
          <h1>{Math.round(data.celcius)}°C</h1>
          <h2>{data.name}</h2>
          <div className="details">
            <div className="col">
              <img src="/Images/humidity.png" alt="" />
              <div className="humidity">
                <p>{Math.round(data.humidity)}%</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className="col">
              <img src="/Images/wind.png" alt="" />
              <div className="wind">
                <p>{Math.round(data.speed)} km/h</p>
                <p>Wind</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
