import React, { useEffect, useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import CompanyApi from "../entities/company/CompanyApi";
import CompanyCard from "../widgets/CompanyCard/CompanyCard";

export default function EvenCompanies({ user }) {
  const [companies, setCompanies] = useState([]);
  const [page, setPage] = useState(1);
  const companiesInPage = 8;

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await CompanyApi.getAllEvenCompanies();
        setCompanies(response.data);
      } catch (error) {
        console.error("Ошибка загрузки:", error);
      }
    };

    fetchCompanies();
  }, []);

  // логика для пагинации, наверное, можно без высшей математики, но я пока не до конца разобралась, как облегчить и надо ли
  const totalPages = Math.ceil(companies.length / companiesInPage);
  const startIndex = (page - 1) * companiesInPage;
  const currentCompanies = companies.slice(
    startIndex,
    startIndex + companiesInPage
  );

  //обработчики кнопок вынесла в мой аккаунт
  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <Typography variant="h4" align="center" style={{ marginBottom: "20px" }}>
        Телефонный справочник
      </Typography>

      {/* <TextField
        fullWidth
        label="Поиск компании"
        variant="outlined"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        style={{ marginBottom: "20px" }}
      /> */}

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        style={{
          padding: "16px",
          backgroundColor: "#f5f5f5",
          marginBottom: "8px",
        }}
      >
        <Typography variant="h6" style={{ fontWeight: "bold", flex: 1 }}>
          Компания и телефон
        </Typography>
        {user?.status === "logged" && (
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            Действия
          </Typography>
        )}
      </Box>

      {currentCompanies.length > 0 ? (
        <>
          {currentCompanies.map((company) => (
            <CompanyCard
              key={company.id}
              company={company}
              user={user}
              showActions={false}
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
        <Box textAlign="center" padding="40px">
          <Typography variant="h6">Пока нет компаний в справочнике</Typography>
        </Box>
      )}
    </Container>
  );
}
