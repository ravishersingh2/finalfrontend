import React from 'react';
import './App.css';
import MovieHeader from './components/movieheader';
import Authentication from './components/authentication';
import WeekWise from './components/WeekWise'
import {HashRouter, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './stores/store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <HashRouter>
          <div>
            <MovieHeader />
            <Route path="/signin" render={()=><Authentication />}/>
            <Route path="/weekwise" render={()=><WeekWise />}/>
          </div>
        </HashRouter>
      </Provider>
    </div>
  );
}

export default App;
