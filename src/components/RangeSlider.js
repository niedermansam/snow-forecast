import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  filterSlider: {
    width: '50%',
    textAlign: 'center'
  },
});


export default function RangeSlider(props) {
  const classes = useStyles();

  return (
    <div className={`${classes.filterSlider} ${props.className}`}>
      <Typography id="range-slider" gutterBottom>
        {props.name}
      </Typography>
      <Slider
        value={props.value}
        onChange={props.handleChange}
        step={props.step}
        min={props.min}
        max={props.max}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
      />
    </div>
  );
}
