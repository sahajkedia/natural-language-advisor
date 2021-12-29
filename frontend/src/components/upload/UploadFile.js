import { isString } from "lodash";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import { useDropzone } from "react-dropzone";
import fileFill from "@iconify/icons-eva/file-fill";
import closeFill from "@iconify/icons-eva/close-fill";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
// material
import { styled } from "@mui/material/styles";
import {
  Box,
  List,
  Stack,
  Button,
  ListItem,
  Typography,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";

import UploadIllustration from "../../assets/illustration_upload";

const DropZoneStyle = styled("div")(({ theme }) => ({
  outline: "none",
  display: "flex",
  textAlign: "center",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(5, 1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.neutral,
  border: `1px dashed ${theme.palette.grey[500_32]}`,
  "&:hover": { opacity: 0.72, cursor: "pointer" },
  [theme.breakpoints.up("md")]: { textAlign: "left", flexDirection: "row" },
}));

// ----------------------------------------------------------------------

UploadFile.propTypes = {
  error: PropTypes.bool,
  showPreview: PropTypes.bool,
  files: PropTypes.array,
  onRemove: PropTypes.func,
  onRemoveAll: PropTypes.func,
  sx: PropTypes.object,
};

export default function UploadFile({
  error,
  files,
  onRemove,
  onRemoveAll,
  sx,
  ...other
}) {
  const hasFile = files.length > 0;

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      ...other,
    });

  const fileUploadHandler = async () => {
    for (const file of files) {
      console.log("Uploading file...");
      try {
        const fd = new FormData();
        fd.append("file", file, file.name);
        const res = await axios.post("http://localhost:5000/api/v1/video/", fd);

        const data = res.data;

        console.log(data);
      } catch (err) {
        if (err.response.status === 400) {
          const errMsg = err.response.data;
          if (errMsg) {
            console.log(errMsg);
            alert(errMsg);
          }
        } else if (err.response.status === 500) {
          console.log("db error");
          alert("db error");
        } else {
          console.log("other error: ", err);
        }
      }
    }
  };

  return (
    <Box sx={{ width: "100%", ...sx }}>
      <DropZoneStyle
        {...getRootProps()}
        sx={{
          ...(isDragActive && { opacity: 0.72 }),
          ...((isDragReject || error) && {
            color: "error.main",
            borderColor: "error.light",
            bgcolor: "error.lighter",
          }),
        }}
      >
        <input {...getInputProps()} />

        <UploadIllustration sx={{ width: 220 }} />

        <Box sx={{ p: 3, ml: { md: 2 } }}>
          <Typography gutterBottom variant="h5">
            Drop or Select file
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Drop files here or click&nbsp;
            <Typography
              variant="body2"
              component="span"
              sx={{ color: "primary.main", textDecoration: "underline" }}
            >
              browse
            </Typography>
            &nbsp;thorough your machine
          </Typography>
        </Box>
      </DropZoneStyle>

      <List disablePadding sx={{ ...(hasFile && { my: 3 }) }}>
        <AnimatePresence>
          {files.map((file) => {
            const { name } = file;
            const key = isString(file) ? file : name;

            return (
              <ListItem
                key={key}
                component={motion.div}
                sx={{
                  my: 1,
                  py: 0.75,
                  px: 2,
                  borderRadius: 1,
                  border: (theme) => `solid 1px ${theme.palette.divider}`,
                  bgcolor: "background.paper",
                }}
              >
                <ListItemIcon>
                  <Icon icon={fileFill} width={28} height={28} />
                </ListItemIcon>
                <ListItemText
                  primary={isString(file) ? file : name}
                  primaryTypographyProps={{ variant: "subtitle2" }}
                  secondaryTypographyProps={{ variant: "caption" }}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    size="small"
                    onClick={() => onRemove(file)}
                  >
                    <Icon icon={closeFill} />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </AnimatePresence>
      </List>

      {hasFile && (
        <Stack direction="row" justifyContent="flex-end">
          <Button onClick={onRemoveAll} sx={{ mr: 1.5 }}>
            Remove all
          </Button>
          <Button onClick={fileUploadHandler} variant="contained">
            Upload files
          </Button>
        </Stack>
      )}
    </Box>
  );
}
