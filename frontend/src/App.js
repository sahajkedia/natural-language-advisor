import { React, Fragment } from "react";

import UploadQuestions from "./components/UploadQuestions";
import "./App.css";

import CssBaseline from "@mui/material/CssBaseline";
export default function App() {
  return (
    <Fragment>
      <CssBaseline />
      <UploadQuestions />
    </Fragment>
  );
}
