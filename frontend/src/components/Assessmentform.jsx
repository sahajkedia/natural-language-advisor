import "./Assessmentform.css"
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import LoadingButton from '@mui/lab/LoadingButton';


export default function Assessmentfrom() {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
      setAge(event.target.value);
    };
  




    return (
       <>
        <h1>Select Your Prefered Field</h1>
        <div className="fck">
        <FormControl fullWidth className="fc" variant="standard" sx={{ m:1, minWidth: 280} }>
        <InputLabel id="demo-simple-select-label">Domain</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Domain"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>

      <FormControl className="fc"  variant="standard" sx={{ m:1, minWidth: 280}}>
        <InputLabel id="demo-simple-select-label">Sub-Domain</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Domain"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>



      <FormControl className="fc"  variant="standard" sx={{ m:1, minWidth: 280}}>
        <InputLabel id="demo-simple-select-label">Difficulty</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Domain"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <LoadingButton
                className="fc"
                  type="submit"
                  variant="contained"
                  size="large"
                //   loading={isSubmitting}
            
                >
                  Submit
                </LoadingButton>

      </div>
      </>
       
        );
    }
    