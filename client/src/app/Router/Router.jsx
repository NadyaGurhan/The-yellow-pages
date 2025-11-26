import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "../Layout/Layout";
import LoginForm from "../../features/LoginForm/LoginForm";
import SignUpForm from "../../features/SignUpForm/SignUpForm";
import MainPage from "../../pages/MainPage";
import CompanyAddForm from "../../pages/AddContactPage/AddContactPage";
import MyCompaniesPage from "../../pages/MyCompanyPage";
import EvenCompanies from "../../pages/EvenCompanies";


export default function Router({ setUser, user }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout user={user} setUser={setUser} />}>
          <Route path="/" element={<MainPage user={user} />} />
          <Route path="/signin" element={<LoginForm setUser={setUser} />} />

          <Route path="signup" element={<SignUpForm setUser={setUser} />} />
           <Route path="/even" element={<EvenCompanies user={user} />} />
          <Route path="/add" element={<CompanyAddForm />} />
          <Route path="/mynumbers" element={<MyCompaniesPage user={user} />} />
          <Route path="*" element={<h1>На данной странице нет контента</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
