import "./Assessmentform.css"
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import LoadingButton from '@mui/lab/LoadingButton';
import {
    
    Card,
    Grid,
    Stack,
    TextField,
    Typography,
    FormHelperText,
  } from "@mui/material";
  import { styled } from "@mui/material/styles";
  const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
  }));
export default function Assessmentfrom() {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
      setAge(event.target.value);
    };
  




    return (
       <>



        <div class="wrapper" id="app">
      <div class="card-form">
        <div class="card-list">
          <div class="card-item -front">
          
          </div>
        </div>
        <div class="card-form__inner">
  <div>


          <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '50ch' },
      }}
      noValidate
      autoComplete="off"
    >
     
    </Box>




                  
              
                </div>
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

      <FormControl fullWidth className="fc"  variant="standard" sx={{ m:1, minWidth: 280}}>
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



      <FormControl fullWidth className="fc"  variant="standard" sx={{ m:1, minWidth: 280}}>
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
      style={{margin:"2rem 0"}}
                className="fc"
                  type="submit"
                  variant="contained"
                  size="large"
                //   loading={isSubmitting}
            
                >
                  Submit
                </LoadingButton>

      </div>



        </div>
      </div>

    </div>





       
      </>
       
        );
    }
    