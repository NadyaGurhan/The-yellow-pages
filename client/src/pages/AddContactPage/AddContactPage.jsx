import React from "react";
import CompanyApi from "../../entities/company/CompanyApi";
import styles from "./CompanyAddForm.module.css";

export default function CompanyAddForm() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { companyName, phoneNumber } = Object.fromEntries(formData);

    if (!companyName?.trim()) {
      alert("Заполните название компании");
      return;
    }
    if (!phoneNumber?.trim()) {
      alert("Заполните телефон");
      return;
    }

    const phoneValue = phoneNumber.trim();
    if (/[a-zA-Zа-яА-Я]/.test(phoneValue)) {
      alert("Номер телефона не должен содержать буквы");
      return;
    }

    const digitsOnly = phoneValue.replace(/\D/g, "");
    // должно быть 10 или 11 цифр- в идеале унифицировать бы, но времени мне не хватило
    if (digitsOnly.length < 10 || digitsOnly.length > 11) {
      alert("Номер телефона должен содержать 10 или 11 цифр");
      return;
    }


    let formattedPhone = "+7";
    if (digitsOnly.length >= 10) {
      const relevantDigits = digitsOnly.slice(-10);
      formattedPhone += ` (${relevantDigits.slice(
        0,
        3
      )}) ${relevantDigits.slice(3, 6)}-${relevantDigits.slice(
        6,
        8
      )}-${relevantDigits.slice(8, 10)}`;
    }

    try {
      const response = await CompanyApi.createCompany({
        companyName: companyName,
        phoneNumber: formattedPhone,
      });
      if (response.status === 201) {
        e.target.reset();
        alert("Ваша компания добавлена");
      }
    } catch (error) {
      console.error("Ошибка:", error);
      alert(
        "Ошибка при добавлении компании, проверьте, что вы ввели корректные данные: название вашей компанией - не числа, а номер телефона - не менее 10цифр"
      );
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Добавить компанию</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Название компании"
          name="companyName"
          required
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Телефон"
          name="phoneNumber"
          required
          className={styles.input}
        />

        <button type="submit" className={styles.button}>
          Добавить компанию
        </button>
      </form>
    </div>
  );
}
