import  React, { useEffect, useState } from 'react'
import { FormControl, Select, MenuItem, Menu, Card, CardContent } from '@mui/material'
// import {Container, Grid} from '@mui/material'
// import TourCard from './components/TourCard'
// import Paper from '@mui/material/Paper'
import InfoBox from './InfoBox';
import Map from './components/Map/Map'
import Table from './components/Table/Table'
import {sortData, prettyPrintStat } from './util'
import LineGraph from './components/LineGraph/LineGraph'
import "leaflet/dist/leaflet.css";
import './App.css'

function App() {
  const [countries, setCounties] = useState([]);
  const [country, setCountry] = useState('WorldWide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({lat: 34.80746, lng: -40.4796});
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]); 
  const [casesType, setCasesType] = useState("cases");

  {/*Covid States: https://disease.sh/v3/covid-19/countries/{country} */}

  useEffect(() =>{
    //when our page initially loads we want to already have the worldwide data displayed to the user
    fetch("https://disease.sh/v3/covid-19/all")
    .then((response) => response.json())  
    .then((data) => {   //we then take the data 
      setCountryInfo(data);
    });
  }, []);

  useEffect(() => {
    //async -> send a request, wait for it, do something with it
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())  //basically like saying when the reponse comes back we just want the json format
      .then((data) => {   //we then take the data 
        // console.log(data); 
        const countries = data.map((country) => (
          {
            name: country.country, //United States, United Kingdom, India
            value: country.countryInfo.iso2 //UK, USA, IND
          }
        ));

        const sortedData = sortData(data);
        setTableData(sortedData);
        setMapCountries(data);
        setCounties(countries);
      });
    };  

    //must call function at the end when using a async effect
    getCountriesData();

  }, [countries])

  const onCountryChange = async (event) => {
    const countryCode = event.target.value ; 
    

    const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all'
     : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

     await fetch(url).
     then((response) => response.json())
     .then((data) => {
      //we will store the country code and the data based off what our user selects
      //default is worldwide
      setCountry(countryCode);
      setCountryInfo(data);
      //we use a useState hook to set the map center and zoom whenever the user selects a country
      setMapCenter([data.countryInfo.lat, data.countryInfo.long]);

      setMapZoom(4);
      

     });
    // console.log(countryInfo);
  };

 



  return (
    <div className = "App">
      <div className="app__left">

      
      
      <div className="app__header">
        <h1>Covid-19 Tracker</h1>
        <FormControl className='app__dropdown'>
          <Select varient='outlined' value={country} onChange={onCountryChange}>
            <MenuItem value='WorldWide'>WorldWide</MenuItem>
            {
              countries.map(country => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))
            }
            {/* <MenuItem value='WorldWide'>WorldWide</MenuItem>
            <MenuItem value='Option 2'>Option 2</MenuItem>
            <MenuItem value='Option 3'>Option 3</MenuItem>
            <MenuItem value='Option 4'>Option 4</MenuItem> */}

          </Select>
          

        </FormControl>

      </div>

      <div className="app__stats">
        <InfoBox
        active={casesType === "cases"}
        onClick={(e) => setCasesType("cases")}
         title='Coronavirus Cases Total' cases={prettyPrintStat(countryInfo.todayCases)} total={countryInfo.cases}/>
        <InfoBox
        active={casesType === "recovered"}
        onClick={(e) => setCasesType("recovered")}
         title='Recovered Total' cases={prettyPrintStat(countryInfo.recovered)} total={countryInfo.recovered}/>
        <InfoBox
        active={casesType === "deaths"}
        onClick={(e) => setCasesType("deaths")}
         title='Deaths Total' cases={prettyPrintStat(countryInfo.todayDeaths)} total={countryInfo.deaths}/>


      </div>
      

      
          <Map caseType={casesType} countries={mapCountries} center={mapCenter} zoom={mapZoom}/>
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData}/>
          <h3 className="app__graphTitle">Worldwide new Cases</h3>
          <LineGraph className="app__graph" casesType={casesType}/>
        </CardContent>

      </Card>
    </div>

    
  )
}

export default App
