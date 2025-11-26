import React from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export default function ModalEditCompanyForm({
  show,
  setShow,
  company,
  updateHandler,
}) {
  // Защита от null - если company нет, не рендерим модалку
  if (!company) {
    return null;
  }

  const handleClose = () => setShow(false);

  return (
    <Modal
      open={show}
      onClose={handleClose}
      aria-labelledby="modal-edit-company"
    >
      <Box sx={modalStyle}>
        <Typography variant="h6" component="h2" gutterBottom>
          Редактировать компанию
        </Typography>

        <Box component="form" onSubmit={(e) => updateHandler(e, company.id)}>
          <TextField
            fullWidth
            label="Название компании"
            name="companyName"
            defaultValue={company.companyName}
            required
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Телефон"
            name="phoneNumber"
            defaultValue={company.phoneNumber}
            required
            sx={{ mb: 2 }}
          />

          <Box display="flex" gap={1} justifyContent="flex-end">
            <Button variant="outlined" onClick={handleClose}>
              Отмена
            </Button>
            <Button type="submit" variant="contained">
              Сохранить
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
