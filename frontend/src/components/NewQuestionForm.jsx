import { useState, useCallback, forwardRef, useEffect } from "react";
import { Form, FormikProvider, useFormik } from "formik";
import { LoadingButton } from "@mui/lab";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { convertToRaw, EditorState } from "draft-js";
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

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const fakeRequest = (time) => {
  return new Promise((res) => setTimeout(res, time));
};

const quesType = [
  { id: 1, name: "MCQs" },
  { id: 2, name: "Subjective" },
  { id: 3, name: "Others" },
];

const semesters = [
  { id: 1, name: "1" },
  { id: 2, name: "2" },
  { id: 3, name: "3" },
  { id: 4, name: "4" },
  { id: 5, name: "5" },
  { id: 6, name: "6" },
  { id: 7, name: "7" },
  { id: 8, name: "8" },
];
const branches = [
  { id: 1, name: "CSE" },
  { id: 2, name: "ECE" },
  { id: 3, name: "EEE" },
  { id: 4, name: "MECH" },
  { id: 5, name: "CIVIL" },
  { id: 6, name: "ISE" },
];

const questionDifficulties = [
  { id: 1, name: "Easy" },
  { id: 2, name: "Medium" },
  { id: 3, name: "Hard" },
];

export default function NewQuestionForm() {
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const [questionType, setQuestionType] = useState(quesType[0].name);
  const [branch, setBranch] = useState(branches[0].name);
  const [semseter, setSemester] = useState(semesters[0].name);
  const [difficulty, setDifficulty] = useState(questionDifficulties[0].name);
  const [solution, setSolution] = useState(EditorState.createEmpty());
  const [questionContent, setQuestionContent] = useState(
    EditorState.createEmpty()
  );
  const [files, setFiles] = useState([]);

  const formik = useFormik({
    initialValues: {
      type: questionType,
      branch: branch,
      semester: semseter,
      difficulty: difficulty,
      subcode: "",
      topic: "",
      question: questionContent,
      answer: "",
      supportingMaterials: null,
      solution: solution,
    },
  });

  const { values, isSubmitting, getFieldProps, setSubmitting, resetForm } =
    formik;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      values.question = draftToHtml(
        convertToRaw(questionContent.getCurrentContent())
      );
      values.solution = draftToHtml(convertToRaw(solution.getCurrentContent()));

      console.log(values);

      // fetch("http://localhost:5000/api/v1/question/", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Accept: "application/json",
      //   },
      //   body: JSON.stringify(values),
      // }).then((response) => {
      //   if (response.status === 200) {
      //     console.log(JSON.stringify(response));
      //   }
      // });
      resetForm();
      setSubmitting(false);
      // setOpen(true); // show snackbar
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };

  // we need to save the question to database so first connect the frontend to the database

  const handleQuestionType = (event) => {
    setQuestionType(event.target.value);
  };

  const handleDifficultyType = (event) => {
    setDifficulty(event.target.value);
  };

  const handleSemester = (event) => {
    setSemester(event.target.value);
  };

  const handleBranch = (event) => {
    setBranch(event.target.value);
  };

  const handleDropMultiFile = useCallback(
    (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    [setFiles]
  );

  const handleRemoveAll = () => {
    setFiles([]);
  };

  const handleRemove = (file) => {
    const filteredItems = files.filter((_file) => _file !== file);
    setFiles(filteredItems);
  };

  return (
    <>
      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
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
                    value={questionType}
                    required
                    onChange={handleQuestionType}
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
                    label="Branch"
                    value={branch}
                    onChange={handleBranch}
                  >
                    {branches.map((branch) => (
                      <MenuItem key={branch.id} value={branch.name}>
                        {branch.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Stack>
                <Stack spacing={3}>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <TextField
                      select
                      fullWidth
                      label="Semester"
                      value={semseter}
                      onChange={handleSemester}
                    >
                      {semesters.map((semester) => (
                        <MenuItem key={semester.id} value={semester.name}>
                          {semester.name}
                        </MenuItem>
                      ))}
                    </TextField>

                    <TextField
                      fullWidth
                      label="Subject Code"
                      {...getFieldProps("subcode")}
                    />
                  </Stack>
                </Stack>

                <Stack spacing={3}>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <TextField
                      fullWidth
                      label="Topic"
                      {...getFieldProps("topic")}
                    />
                    <TextField
                      select
                      fullWidth
                      label="Difficulty"
                      value={difficulty}
                      onChange={handleDifficultyType}
                    >
                      {questionDifficulties.map((difficulty) => (
                        <MenuItem key={difficulty.id} value={difficulty.name}>
                          {difficulty.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Stack>
                </Stack>

                <div>
                  <LabelStyle>Question</LabelStyle>
                  <DraftEditor
                    id="question"
                    editorState={questionContent}
                    placeholder="Enter your question here"
                    onEditorStateChange={(values) => setQuestionContent(values)}
                  />
                </div>
                <TextField
                  fullWidth
                  label="Answer"
                  {...getFieldProps("answer")}
                />

                <div>
                  <LabelStyle>Complete Solution</LabelStyle>
                  <DraftEditor
                    editorState={solution}
                    onEditorStateChange={(values) => setSolution(values)}
                    placeholder="Enter your solution here"
                  />
                </div>
                <LabelStyle>Supporting Material</LabelStyle>

                <UploadFile
                  files={files}
                  onDrop={handleDropMultiFile}
                  onRemove={handleRemove}
                  onRemoveAll={handleRemoveAll}
                />
                <LoadingButton
                  fullWidth
                  type="submit"
                  variant="contained"
                  size="large"
                  loading={isSubmitting}
                >
                  Submit
                </LoadingButton>
              </Stack>
            </Grid>
          </Card>
        </Form>
      </FormikProvider>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Question Uploaded Successfully!
        </Alert>
      </Snackbar>
    </>
  );
}
