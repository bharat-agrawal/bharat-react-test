import * as React from 'react';
import Modal from '@mui/material/Modal';

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField, Grid, Button, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

import MenuItem from "@mui/material/MenuItem";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Stack from "@mui/material/Stack";

import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: '#fff',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflow:"auto"
};

export default function DeleteStudent({openDeleteModal, setOpenDeleteModal, handleDelete}) {
  return (
    <div>
      
      <Modal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
      <Container maxWidth={"md"}>
        <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography>
             DO yoy want to delete this record?
          </Typography>
          </Grid>
          <Grid item xs={12}>
          <Button  variant="outlined" onClick={handleDelete}>
              Delete
          </Button>
          <Button variant="contained" onClick={()=>setOpenDeleteModal(false)}>
              Cancel
          </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
      </Modal>
    </div>
  );
}