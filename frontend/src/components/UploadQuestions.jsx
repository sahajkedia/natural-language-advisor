import { React, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Container } from "@mui/material";

import MCQs from "./MCQs";
import Subjective from "./Subjective";
import Others from "./OtherQuestion";

const UploadQuestions = () => {
  const quesType = [
    { id: 1, name: "MCQs" },
    { id: 2, name: "Subjective" },
    { id: 3, name: "Others" },
  ];

  const [questionType, setQuestionType] = useState(quesType[0].name);

  const handleChange = (event) => {
    setQuestionType(event.target.value);
  };

  return (
    <Container maxWidth="sm">
      <Box m={2} pt={3}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Question Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={questionType.name}
            label="Question Type"
            onChange={handleChange}
          >
            {quesType.map((ques) => (
              <MenuItem key={ques.id} value={ques.name}>
                {ques.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Container>
  );
};

export default UploadQuestions;
