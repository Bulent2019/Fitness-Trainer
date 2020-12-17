import './App.css';
import Customerlist from './components/Customerlist';

import React from 'react';

// import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Customers from './links/Customers';
import Calendar from './links/Calendar';
import Statistics from './links/Statistics';
import Trainings from './links/Trainings';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab  from '@material-ui/core/Tab';
import Toolbar from '@material-ui/core/Toolbar';

function App() {
  const[value, setValue] = React.useState('customer');

    const inputChange = (event, value) => {
      setValue(value);
    }
  return (
     <div className="App">

      <AppBar position="static">
        <Toolbar>
          <Tabs value = {value} onChange={inputChange} style={{fontWeight: 'bold'}}>
            <Tab value ="customer" label="Customers"></Tab>
            <Tab value ="training" label="Trainings"></Tab>
            <Tab value ="calendar" label="Calendar"></Tab>
            <Tab value ="statistic" label="Statistics"></Tab>
            <div style={{marginLeft:'330px', fontSize:'22px'}}><h1>Fitness Trainer</h1></div>
          </Tabs>
        </Toolbar>
      </AppBar>
      {value === 'customer' && <div><Customers/></div>}
      {value === 'training' && <div><Trainings/></div>}
      {value === 'calendar' && <div><Calendar/></div>}
      {value === 'statistic' && <div><Statistics/></div>}

    </div>
  );
}

export default App;
