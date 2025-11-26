import React, { useState } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import styles from "./LoginForm.module.css";
import UserValidate from "../../entities/user/UserValidate";
import UserApi from "../../entities/user/UserApi";
import { setAccessToken } from "../../shared/lib/axiosInstance";
import { useNavigate } from "react-router";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #b2281eff",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};


//в роутер, логика для логина пользователя
export default function LoginForm({ setUser }) {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalError, setModalError] = useState("");
  const handleModalClose = () => setModalOpen(false);

  const loginHandler = async (e) => {
    try {
      e.preventDefault();
      const formData = Object.fromEntries(new FormData(e.target));
      const { isValid, err } = UserValidate.validateLoginData(formData);
      if (!isValid) {
        setModalError(err);
        setModalOpen(true);
        return;
      }

      const res = await UserApi.login(formData);
      setUser({ status: "logged", data: res.data.user });
      setAccessToken(res.data.accessToken);
      navigate("/");
    } catch (error) {
      console.log(error);

      const errorMessage = error.response.data?.message;
      setModalError(errorMessage);
      setModalOpen(true);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={loginHandler}>
        <div className={styles.inputGroup}>
          <div className={styles.inputLabel}>Email</div>
          <input className={styles.input} name="email" type="email" required />
        </div>

        <div className={styles.inputGroup}>
          <div className={styles.inputLabel}>Password</div>
          <input
            className={styles.input}
            name="password"
            type="password"
            required
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Подтвердить
        </button>
      </form>

      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            color="error"
          >
            Ошибка!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, mb: 3 }}>
            {modalError}
          </Typography>
          <Button
            variant="contained"
            color="error"
            onClick={handleModalClose}
            sx={{ float: "right" }}
          >
            Закрыть
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
