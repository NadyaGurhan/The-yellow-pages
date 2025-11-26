export const filterCompanies = (companies, searchName) => {
  if (!searchName.trim()) return companies;

  if (!searchName.trim()) return companies;

  return companies.filter(
    (company) =>
      company &&
      company.name &&
      company.name.toLowerCase().includes(searchName.toLowerCase())
  );
};
