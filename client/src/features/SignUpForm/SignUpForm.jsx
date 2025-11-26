import React, { useState } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import styles from "./SignUpForm.module.css";
import UserApi from "../../entities/user/UserApi";
import UserValidate from "../../entities/user/UserValidate";
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

function SignUpForm({ setUser }) {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalError, setModalError] = useState("");
  const handleModalClose = () => setModalOpen(false);

  const signUpHandler = async (e) => {
    try {
      e.preventDefault();
      const formData = Object.fromEntries(new FormData(e.target));
      const { isValid, err } = UserValidate.validateSignUpData(formData);
      if (!isValid) {
        setModalError(err);
        setModalOpen(true);
        return;
      }
      const res = await UserApi.signup(formData);
      setUser({ status: "logged", data: res.data.user });
      setAccessToken(res.data.accessToken);
      navigate("/");
    } catch (error) {
      console.log(error);
      const errorMessage = error.response?.data?.message;
      setModalError(errorMessage);
      setModalOpen(true);
    }
  };
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={signUpHandler}>
        {/* Name */}
        <div className={styles.inputGroup}>
          <div className={styles.inputLabel}>Name</div>
          <input className={styles.input} name="name" type="text" required />
        </div>
        <div className={styles.inputGroup}>
          <div className={styles.inputLabel}>Email</div>
          <input className={styles.input} name="email" type="email" required />
        </div>
        {/* Password */}
        <div className={styles.inputGroup}>
          <div className={styles.inputLabel}>Password</div>

          <input
            className={styles.input}
            name="password"
            type="password"
            required
          />
        </div>
        {/* Repeat Password */}
        <div className={styles.inputGroup}>
          <div className={styles.inputLabel}>Repeat Password</div>

          <input
            className={styles.input}
            name="confirmPassword"
            type="password"
            required
          />
        </div>

        <button type="submit" className={styles.submitButton}>
            Подтвердить
        </button>
      </form>
      {/* Модальное окно для ошибок */}
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

export default SignUpForm;
