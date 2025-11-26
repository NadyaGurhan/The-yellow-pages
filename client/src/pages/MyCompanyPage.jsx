import React, { useEffect, useState } from "react";
import { Container, Typography, Box, Alert, Button } from "@mui/material";
import CompanyApi from "../entities/company/CompanyApi";
import CompanyCard from "../widgets/CompanyCard/CompanyCard";
import ModalEditCompanyForm from "../widgets/ModalEditCompanyForm";

export default function MyCompaniesPage({ user }) {
  const [companies, setCompanies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  const [page, setPage] = useState(1);
  const companiesInPage = 8;

  //подтягиваю свои компании
  useEffect(() => {
    const fetchMyCompanies = async () => {
      try {
        const response = await CompanyApi.getMyCompanies();
        setCompanies(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMyCompanies();
  }, [user]);

  // осталось совсем мало времени поэтому пока просто продублирую, не делаю декомпозицию
  const totalPages = Math.ceil(companies.length / companiesInPage);
  const startIndex = (page - 1) * companiesInPage;
  const currentCompanies = companies.slice(
    startIndex,
    startIndex + companiesInPage
  );

  //{tylkth elfktybz rjvgfybb}
  const deleteHandler = async (companyId) => {
    try {
      const response = await CompanyApi.deleteCompany(companyId);
      if (response.status === 204) {
        setCompanies(companies.filter((company) => company.id !== companyId));
      }
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  //открытие модалки редактирования
  const handleEditClick = (company) => {
    setEditingCompany(company);
    setShowModal(true);
  };

  // Закрытие модалки
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCompany(null);
  };

  // Хендлер обновления
  const updateHandler = async (event, companyId) => {
    event.preventDefault();
    try {
      const targetData = event.target;
      const dataForApi = Object.fromEntries(new FormData(targetData));

      if (!dataForApi.companyName || !dataForApi.phoneNumber) {
        return alert("Заполните все поля");
      }

      const response = await CompanyApi.updateCompany(companyId, dataForApi);
      if (response.status === 200) {
        const updatedCompanies = companies.map((company) =>
          company.id === companyId ? response.data : company
        );
        setCompanies(updatedCompanies);
        handleCloseModal();
        alert("Компания обновлена");
      }
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Ошибка при обновлении");
    }
  };

  //можно было бы и без условного рендеринга но я один раз вышла, когда была на этой странице и лучше иметь проверку
  if (user?.status !== "logged") {
    return (
      <Container maxWidth="md" sx={{ py: 4, textAlign: "center" }}>
        <Alert severity="warning">
          Для просмотра этой страницы необходимо войти в систему
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Мои компании
      </Typography>

      <Box
        display="flex"
        justifyContent="space-between"
        sx={{ p: 2, mb: 1, bgcolor: "#f5f5f5" }}
      >
        <Typography variant="h6">Компания и телефон</Typography>
        <Typography variant="h6">Действия</Typography>
      </Box>

     {/* Модалка откроетс при нажатии на редактирование */}
      {editingCompany && (
        <ModalEditCompanyForm
          show={showModal}
          setShow={handleCloseModal}
          company={editingCompany}
          updateHandler={updateHandler}
        />
      )}

      {currentCompanies.length > 0 ? (
        <>
          {currentCompanies.map((company) => (
            <CompanyCard
              key={company.id}
              company={company}
              user={user}
              showActions={true}
              onDelete={() => deleteHandler(company.id)}
              onEdit={() => handleEditClick(company)}
            />
          ))}

          {totalPages > 1 && (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap={1}
              mt={3}
            >
              <Button
                variant="outlined"
                size="small"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                sx={{ minWidth: "auto", px: 1 }}
              >
                ‹ Назад
              </Button>

              <Typography variant="body2" sx={{ mx: 2 }}>
                {page} / {totalPages}
              </Typography>

              <Button
                variant="outlined"
                size="small"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                sx={{ minWidth: "auto", px: 1 }}
              >
                Вперед ›
              </Button>
            </Box>
          )}
        </>
      ) : (
        <Box textAlign="center" p={4}>
          <Typography variant="h6">
            У вас пока нет добавленных компаний
          </Typography>
        </Box>
      )}
    </Container>
  );
}
