import * as Yup from "yup";
import { useState, useCallback, forwardRef } from "react";
import { Form, FormikProvider, useFormik } from "formik";
import { LoadingButton } from "@mui/lab";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
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

export default function NewQuestionForm() {
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const NewQuestionSchema = Yup.object().shape({
    question: Yup.mixed().required("Question is required"),
    answer: Yup.string().required("Answer is required"),
    type: Yup.string().required("Question Type is required"),
    domain: Yup.string().required("Domain is required"),
    subdomain: Yup.string().required("Subdomain is required"),
  });

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

  const formik = useFormik({
    initialValues: {
      type: questionType,
      domain: domainType,
      subDomain: subDomainType,
      topic: "",
      question: {},
      answer: "",
      supportingMaterials: null,
      solution: "",
    },
    validationSchema: NewQuestionSchema,
  });

  const {
    errors,
    values,
    touched,
    isSubmitting,
    setFieldValue,
    getFieldProps,
    setSubmitting,
    resetForm,
  } = formik;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(values);
      await fakeRequest(500);
      resetForm();
      setSubmitting(false);
      setOpen(true); // show snackbar
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };

  const handleQuestionType = (event) => {
    setQuestionType(event.target.value);
  };

  const handleDomainType = (event) => {
    setDomainType(event.target.value);
  };

  const handleSubDomainType = (event) => {
    setSubDomainType(event.target.value);
  };

  const [files, setFiles] = useState([]);

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
                    error={Boolean(touched.type && errors.type)}
                    onChange={handleQuestionType}
                    helperText={touched.type && errors.type}
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
                    value={domainType}
                    error={Boolean(touched.domain && errors.domain)}
                    onChange={handleDomainType}
                    helperText={touched.domain && errors.domain}
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
                      value={subDomainType}
                      error={Boolean(touched.subDomain && errors.subDomain)}
                      onChange={handleSubDomainType}
                      helperText={touched.subDomain && errors.subDomain}
                    >
                      {subDomains.map((subDomain) => (
                        <MenuItem key={subDomain.id} value={subDomain.name}>
                          {subDomain.name}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      fullWidth
                      label="Topic"
                      {...getFieldProps("topic")}
                    />
                  </Stack>
                </Stack>

                <div>
                  <LabelStyle>Question</LabelStyle>
                  <DraftEditor
                    id="question"
                    value={values.question}
                    placeholder="Enter your question here"
                    onChange={(content) => {
                      setFieldValue("question", content);
                    }}
                    error={Boolean(touched.question && errors.question)}
                  />
                  {touched.question && errors.question && (
                    <FormHelperText
                      error
                      sx={{ px: 2, textTransform: "capitalize" }}
                    >
                      {touched.question && errors.question}
                    </FormHelperText>
                  )}
                </div>
                <TextField
                  fullWidth
                  label="Answer"
                  {...getFieldProps("answer")}
                  error={Boolean(touched.answer && errors.answer)}
                  helperText={touched.answer && errors.answer}
                />

                <div>
                  <LabelStyle>Complete Solution (Optional)</LabelStyle>
                  <DraftEditor
                    id="solution"
                    value={values.solution}
                    placeholder="Enter your solution here"
                    onChange={(content) => {
                      setFieldValue("solution", content);
                    }}
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
