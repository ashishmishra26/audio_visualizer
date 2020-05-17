import React from 'react';

// components
import ShowChartIcon from '@material-ui/icons/ShowChart';
import BarChartIcon from '@material-ui/icons/BarChart';

// constants
import { plotMap } from '../../constants';

// css & media
import './TypeSelector.css';

export default function TypeSelector(props) {
  return (
    <div className="type-container">
      <button className="type-selector" onClick={() => { props.setPlotType(plotMap.LINE); }}>
          <ShowChartIcon className="fas" />
      </button>        
      <button className="type-selector" onClick={() => { props.setPlotType(plotMap.BAR); }}>
          <BarChartIcon className="fas" />
      </button>
    </div>
  )
}
