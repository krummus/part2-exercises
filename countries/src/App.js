import React, { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [ countries, setCountries ] = useState([])
  const [ capWeather, setCapWeather ] = useState([])
  const [ filterText, setFilterText] = useState('')
  const [ weatherLoading, setWeatherLoading] = useState(true)

  const api_key = process.env.REACT_APP_API_KEY

  const countriesFiltered = countries.filter(countries => countries.name.toLowerCase().includes(filterText.toLowerCase()))
  const tooManyCountries = (countriesFiltered.length === 0) || (countriesFiltered.length > 10) ? true : false
  const countryToShow = countriesFiltered.length === 1 ? true : false

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  console.log('rendered', countries.length, 'countries')

  useEffect(() => {
    console.log('effect')
    console.log(api_key)
    if (countriesFiltered.length === 1) {
      console.log(countriesFiltered[0].capital)
      console.log(`http://api.weatherstack.com/current?access_key=${api_key}&query=${countriesFiltered[0].capital}&units=m`)
      axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${countriesFiltered[0].capital}&units=m`)
      .then(response => {
        console.log('weather promise fulfilled')
        setCapWeather(response.data)
        setWeatherLoading(false)
      })
    }
  }, [filterText])  

  const handleFilterChange = (event) => {
    setFilterText(event.target.value)
  }

  if (tooManyCountries) {
    return(
      <div>
        <p>Find countries <input value={filterText} onChange={handleFilterChange} /></p>
        <p>Too many matches, please refine country filter</p>
      </div>
    )
  }else{
    if(countryToShow) {  //shows only 1 country
      if(weatherLoading) {
        return(
          <div>
            Page Loading
          </div>
        )
      }else{
        return(
          <div>
            <p>Find countries <input value={filterText} onChange={handleFilterChange} /></p>
            <h1>{countriesFiltered[0].name}</h1>
            <ul>
              <li key='0'>Capital: {countriesFiltered[0].capital}</li>
              <li key='1'>Population: {countriesFiltered[0].population}</li>
            </ul>
            <h2>languages</h2>
            <ul>
              {countriesFiltered[0].languages.map((lang,index) => <li key={index}>{lang.name}</li>)}
            </ul>
            <h2>flag</h2>
            <p><img src={countriesFiltered[0].flag} alt="Countries Flag" width="300"></img></p>
            <h2>weather in {countriesFiltered[0].capital}</h2>
            <p>
              <b>temperature:</b> {capWeather.current.temperature} C <br />
              <img src={capWeather.current.weather_icons} alt={capWeather.current.weather_descriptions}></img><br />
              <b>wind & direction: </b>{capWeather.current.wind_speed} kph {capWeather.current.wind_dir}
            </p>
          </div>
        )
      }

    }else{
      //shows list of countries
      return(
        <div>
          <p>Find countries <input value={filterText} onChange={handleFilterChange} /></p>
          <ul>
            {countriesFiltered.map((country,index) => <li key={index}>{country.name} <button value={country.name} onClick={handleFilterChange}>show</button></li>)}
          </ul>
        </div>
      )
    }
  }
}

export default App;