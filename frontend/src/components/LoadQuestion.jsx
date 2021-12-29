import "./LoadQuestion.css"
import * as Yup from "yup";
import * as React from 'react';

import { useState, useCallback, forwardRef } from "react";
import { Form, FormikProvider, useFormik } from "formik";
import { LoadingButton } from "@mui/lab";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { convertToRaw, convertFromHTML, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import {
  Box,
  Card,
  Grid,
  Stack,
  TextField,
  Typography,
  FormHelperText,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import DraftEditor from "./draft";
import UploadFile from "./upload/UploadFile";

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));




export default function LoadQuestion() {

    return (
        <>
        <div class="wrapper" id="app">
      <div class="card-form">
        <div class="card-list">
          <div class="card-item -front">
            <div class="card-item__side">
              <div class="card-item__cover">
                <img src="https://www.allianz.ie/assets/img/illustration/248h/man-asking-question.png"class="card-item__bg"/>
              </div>
            </div>
          </div>
        </div>
        <div class="card-form__inner">
          <p>What is the name of the first president (SAMPLE QUESTION)</p>



            <div>
          <LabelStyle>Write your Answer Below:-</LabelStyle>


          <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '50ch' },
      }}
      noValidate
      autoComplete="off"
    >
      
      <TextField id="standard-basic" label="Multiline Answer" variant="standard" multiline/>
    </Box>




                  {/* <DraftEditor
                    id="question"
                    // editorState={draftSimple1}
                    placeholder="Enter your question here"
                    // onEditorStateChange={(values) => setDraftSimple1(values)}
                    // error={Boolean(touched.question && errors.question)}
                  /> */}
                  {/* {touched.question && errors.question && ( */}
                    {/* <FormHelperText
                      error
                      sx={{ px: 2, textTransform: "capitalize" }}
                    > */}
                      {/* {touched.question && errors.question} */}
                    {/* </FormHelperText> */}
                  {/* )} */}
                </div>
                {/* <TextField
                  fullWidth
                  label="Answer"
                //   {...getFieldProps("answer")}
                //   error={Boolean(touched.answer && errors.answer)}
                //   helperText={touched.answer && errors.answer}
                /> */}




          <button style={{margin:"2rem 0"}}class="card-form__button">Submit</button>
        </div>
      </div>

    </div>
        </>
    )



};
