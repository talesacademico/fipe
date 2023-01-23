import axios from "axios";

export const api = axios.create({
  baseURL: "https://veiculos.fipe.org.br/api/veiculos//",
  headers:{
    "Accept": "application/json",
    "Content-Type": "multipart/form-data"
  }
});
