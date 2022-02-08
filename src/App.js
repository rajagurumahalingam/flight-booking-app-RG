import React, {useState, useEffect} from 'react';
import { Box, Grid, Container, Typography, Button, Backdrop, Checkbox, FormControlLabel } from '@material-ui/core';
import Flightsearch from './flightsearch';
import * as flightdatasjson from './flightdata.json';
import Flightdatalist from './flightdatalist';

const App = () => {

  const [flightdata, setFlightdata] = useState({});
  const [searchdta, setSearchdata] = useState({});

  useEffect(() => {
    console.log("logging!!!");
    setFlightdata(flightdatasjson);
    console.log("tmpdata", flightdata);
  }, []);

  const getexpecteddate = (datee, dayss, operatr) => {
      let currday = new Date(datee);
      let start_date = new Date(currday);
      if(operatr == "add") {
          start_date.setDate(start_date.getDate() + dayss);
      }
      if(operatr == "sub") {
          start_date.setDate(start_date.getDate() - dayss);
      }
      return start_date;
  }

  const clearfilter = () => {
    setFlightdata(flightdatasjson);
  }


  useEffect(() => {
    console.log("logging2!!!");
    if(!searchdta.origin && !searchdta.destination){
      return;
    }
    let flightdatasjsonlist = Array.from(flightdatasjson);
    let tmpfldata = flightdatasjsonlist.filter(dataitem => {
        let start_date, end_date, end_month;

        if(searchdta.servicetype == "amadeusOptimizedPrice"){
          start_date = getexpecteddate(searchdta.departuredate, 7, "sub");
          end_date = getexpecteddate(searchdta.departuredate, 7, "add");
        }
        if(searchdta.servicetype == "amadeusBestPrice"){
          end_month = new Date(searchdta.departuredate);
          end_month.setMonth(end_month.getMonth() + 12);
        }
        if(searchdta.servicetype == "amadeusOptimizedBestPrice"){
          start_date = getexpecteddate(searchdta.departuredate, 15, "sub");
          end_date = getexpecteddate(searchdta.departuredate, 15, "add");
        }
        let dataitemdd = new Date(dataitem.departureDate);
        let searchdd = new Date(searchdta.departuredate);
        
        if(dataitem.origin == searchdta.origin && dataitem.destination == searchdta.destination){
          if(searchdta.servicetype == "amadeusExactMatch" && dataitemdd.toDateString() == searchdd.toDateString()){
            return dataitem;
          }
          if((searchdta.servicetype == "amadeusOptimizedPrice" || searchdta.servicetype == "amadeusOptimizedBestPrice") 
          && start_date < dataitemdd && end_date > dataitemdd){
            return dataitem;
          }
          if(searchdta.servicetype == "amadeusBestPrice" && dataitemdd <= end_month && searchdd <= dataitemdd){
            return dataitem;
          }
          console.log('matching', dataitem, searchdta);
        }
    })
    console.log("tmpfldata", tmpfldata, flightdata);
    setFlightdata(tmpfldata);
  }, [searchdta]);


  const handlesearchdata = (datalist) => {
    setSearchdata(datalist);
  }

    return (
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box bgcolor="info.main" color="info.contrastText" p={1}>
              <Typography variant="h4" component="h1">
                Flights Seeker
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={3}>
            <Box bgcolor="info.main" color="info.contrastText" p={1}>
              <Typography variant="h4" component="h1">Search Flights</Typography>              
            </Box>
            <Flightsearch handlesearchdata={handlesearchdata} clearfilter={clearfilter} flightdata={flightdata}/>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Box bgcolor="info.main" color="info.contrastText" p={1}>
              <Typography variant="h4" component="h1">Flight Details</Typography>
              
            </Box>
            <Flightdatalist flightdata={flightdata} />
               <p style={{marginTop: "20px"}}>{flightdata.length == 0 && "There are no Flights available for this search."}</p>
          </Grid>
        </Grid>
      </Container>
    )
  }//render

export default App;