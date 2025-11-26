import React from "react";
import NavBar from "../../widgets/NavBar/NavBar";
import { Outlet } from "react-router";
import { Container } from "react-bootstrap";

export default function Layout({ user, setUser }) {
  return (
     <>
      <NavBar setUser={setUser} user={user} />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}
