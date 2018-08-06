import React from "react";
import ReactDOM from "react-dom";
import MapComponent from './map_component';

const Index = () => {
  return (
    <div>
      <div className="specColor">
        Welcome to the example task!
      </div>
      <MapComponent />

    </div>);
};

ReactDOM.render(<Index />, document.getElementById("index"));
