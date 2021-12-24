import {
  Box,
  Card,
  Grid,
  Stack,
  Button,
  TextField,
  Typography,
  Container,
  MenuItem,
  FormControl,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";

import DraftEditor from "./draft";

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

export default function NewQuestionForm() {
  const quesType = [
    { id: 1, name: "MCQs" },
    { id: 2, name: "Subjective" },
    { id: 3, name: "Others" },
  ];

  const domains = [
    { id: 1, name: "Engineering" },
    { id: 2, name: "Medical" },
    { id: 3, name: "Law" },
    { id: 4, name: "Commerce" },
    { id: 5, name: "Science" },
    { id: 6, name: "Arts" },
    { id: 7, name: "Others" },
  ];
  const subDomains = [
    { id: 1, name: "CSE" },
    { id: 2, name: "ECE" },
    { id: 3, name: "EEE" },
    { id: 4, name: "MECH" },
    { id: 5, name: "CIVIL" },
    { id: 6, name: "ISE" },
  ];

  const [questionType, setQuestionType] = useState(quesType[0].name);
  const [domainType, setDomainType] = useState(domains[0].name);
  const [subDomainType, setSubDomainType] = useState(subDomains[0].name);

  const handleQuestionType = (event) => {
    setQuestionType(event.target.value);
  };

  const handleDomainType = (event) => {
    setDomainType(event.target.value);
  };

  const handleSubDomainType = (event) => {
    setSubDomainType(event.target.value);
  };

  return (
    <>
      <Container maxWidth="lg">
        <FormControl fullWidth>
          <Card sx={{ p: 3 }}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              style={{ minHeight: "100vh" }}
              sx={{ p: 2 }}
            >
              <Box sx={{ flexGrow: 1, mb: 2 }}>
                <Typography variant="h3" gutterBottom>
                  Create a new question
                </Typography>
              </Box>

              <Stack spacing={3}>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <TextField
                    select
                    fullWidth
                    label="Question Type"
                    value={questionType.name}
                    onChange={handleQuestionType}
                    helperText="Please select the question type"
                  >
                    {quesType.map((ques) => (
                      <MenuItem key={ques.id} value={ques.name}>
                        {ques.name}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    select
                    fullWidth
                    label="Domain"
                    value={domainType.name}
                    onChange={handleDomainType}
                    helperText="Please select the question type"
                  >
                    {domains.map((domain) => (
                      <MenuItem key={domain.id} value={domain.name}>
                        {domain.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Stack>
                <Stack spacing={3}>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <TextField
                      select
                      fullWidth
                      label="Sub-Domain"
                      value={subDomainType.name}
                      onChange={handleSubDomainType}
                      helperText="Please select the question type"
                    >
                      {subDomains.map((subDomain) => (
                        <MenuItem key={subDomain.id} value={subDomain.name}>
                          {subDomain.name}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField fullWidth label="Category" />
                  </Stack>
                </Stack>

                <div>
                  <LabelStyle>Question</LabelStyle>
                  <DraftEditor id="post-content" />
                </div>
                <TextField fullWidth label="Answer" />

                <div>
                  <LabelStyle>Complete Solution (Optional)</LabelStyle>
                  <DraftEditor id="post-content" />
                </div>

                <Button variant="contained" color="primary">
                  Submit
                </Button>
              </Stack>
            </Grid>
          </Card>
        </FormControl>
      </Container>
    </>
  );
}
