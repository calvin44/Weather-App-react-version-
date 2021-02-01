import React from "react";
import axios from "axios";

function Fetch() {
  // only for practice
  // not best practice because it is not practical
  // need to re-assign every value when modifying state
  // should use multiple state hooks instead of single object hook
  const [state, setState] = React.useState({
    desc: "",
    temp: "",
    city: "",
    err: "",
  });

  const [citySearch, setCity] = React.useState("");
  const [icon, setIcon] = React.useState("");
  const [data, setData] = React.useState(false);

  function capitalize(a) {
    if (a === "") {
      return "";
    } else {
      let word = a.split(" ");
      for (let i = 0; i < word.length; i++) {
        word[i] = word[i][0].toUpperCase() + word[i].slice(1);
      }
      return word.join(" ");
    }
  }

  function celcius(f) {
    return (f - 273.15).toFixed(2);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${state.city}&appid=bae2183dad4c9ecea641d6e6a899efcb`;
    if (state.city === "") {
      setState({
        city: "",
        temp: "",
        desc: "",
        err: "Please Enter city name!!",
      });
    } else {
      axios
        .get(url)
        .then((res) => {
          setState((prev) => {
            return {
              desc: res.data.weather[0].description,
              temp: celcius(res.data.main.temp) + " °C",
              city: "",
              err: "",
            };
          });
          setCity(state.city);
          setData(true);
          setIcon(res.data.weather[0].icon);
        })
        .catch((err) => {
          setState((prev) => {
            return {
              err: "City Not Found!!",
              temp: "",
              desc: "",
              city: "",
            };
          });
          setCity("");
          setIcon("");
          setData(false);
        });
    }
  }
  function handleInput(e) {
    setState((prev) => {
      return {
        desc: prev.desc,
        temp: prev.temp,
        city: e.target.value,
        err: prev.err,
      };
    });
  }

  return (
    <div className="my-container">
      <div className="container text-center">
        <h1 className="title">Weather App</h1>
        <p id="error" className="text-danger">
          {state.err}
        </p>

        <div class="input-group mb-3 input">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              onChange={handleInput}
              value={state.city}
              className="form-control text-center mx-auto user-input"
              placeholder="Search City"
            />
          </form>
        </div>

        {data && (
          <div
            className="card border border-secondary mx-auto mb-3 text-center"
            style={{ maxWidth: "18rem" }}
          >
            <div className="card-header bg-secondary text-white">
              <h3>Weather Info</h3>
            </div>
            <div className="card-body">
              <img
                src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                alt="pic"
              />

              <h5 className="card-title">{capitalize(citySearch)}</h5>
              <p className="card-text mb-1 mt-3">{state.temp}</p>
              <p className="card-text">{capitalize(state.desc)}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Fetch;
