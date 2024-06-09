const express = require("express");
const {
  getCompanies,
  getCompany,
  addCompany,
  updateCompany,
  deleteCompany,
} = require("../controllers/company.controller");

const companyRouter = express.Router();

companyRouter.get("/getCompanies", getCompanies);

companyRouter.get("/getCompany/:id", getCompany);

companyRouter.post("/add", addCompany);

companyRouter.patch("/update/:id", updateCompany);

companyRouter.delete("/delete/:id", deleteCompany);

module.exports = { companyRouter };
