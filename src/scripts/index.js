import "../styles/normalize.css";
import "../styles/styles.css";
import { getFormRows } from "./getFormRows";
import { formValidation } from "./formValidation";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  formValidation(getFormRows(form));
})