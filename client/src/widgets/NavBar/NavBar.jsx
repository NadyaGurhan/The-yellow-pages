import React from "react";
import { NavLink } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import ListAltIcon from "@mui/icons-material/ListAlt";
import UserApi from "../../entities/user/UserApi";

const NavButtonStyles = {
  color: "#2c0996ff",
  mx: 1.5,
  fontWeight: 550,
  textTransform: "none",
  fontSize: "16px",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  "&.active": {
    color: "#2c0996ff",
    borderBottom: "2px solid #273668ff",
    borderRadius: 0,
  },
};

export default function NavBar({ setUser, user }) {
  const logoutHandler = async () => {
    try {
      await UserApi.logout();
      setUser({ status: "logging", data: null });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(90deg, #e1d4185d 30%, #e9e290b4 90%)",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            component={NavLink}
            to={"/"}
            sx={{
              textDecoration: "none",
              color: "#0a2b85ff",
              fontWeight: 800,
              letterSpacing: 1.5,
              flexGrow: 1,
              "&.active": {
                borderBottom: "none",
              },
            }}
          >
            Жёлтые страницы
          </Typography>

          <Button
            component={NavLink}
            to={"/"}
            sx={NavButtonStyles}
            startIcon={<HomeIcon />}
          >
            Главная
          </Button>

          <Button
            component={NavLink}
            to={"/even"}
            sx={NavButtonStyles}
            startIcon={<HomeIcon />}
          >
            Четные
          </Button>

          {user?.status === "logged" ? (
            <>
              <Button
                component={NavLink}
                to={"/add"}
                sx={NavButtonStyles}
                startIcon={<AddBusinessIcon />}
              >
                {/* Сделаю на русском, но если нужно прям как в ридми, то я на лайвкодинге поправлю */}
                Добавить
              </Button>

              <Button
                component={NavLink}
                to={"/mynumbers"}
                sx={NavButtonStyles}
                startIcon={<ListAltIcon />}
              >
                Мои компании
              </Button>

              <Button sx={NavButtonStyles} startIcon={<AccountCircleIcon />}>
                {user?.data.name}
              </Button>

              <Button
                sx={NavButtonStyles}
                onClick={logoutHandler}
                startIcon={<LogoutIcon />}
              >
                Выход
              </Button>
            </>
          ) : (
            <>
              <Button component={NavLink} to={"/signup"} sx={NavButtonStyles}>
                Зарегистрироваться
              </Button>

              <Button
                component={NavLink}
                to={"/signin"}
                sx={NavButtonStyles}
                startIcon={<LoginIcon />}
              >
                Войти
              </Button>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
