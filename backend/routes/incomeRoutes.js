const express = require("express");
const router = express.Router();
const {protect} = require("../middlewares/authMiddleware");
const { addIncome, getAllIncome, deleteIncome, downloadIncomeExcel } = require("../controllers/incomeController");

router.post("/add", protect, addIncome);
router.get("/get", protect, getAllIncome);
router.get("/downloadexcel", protect, downloadIncomeExcel);
router.delete("/:id", protect, deleteIncome);

module.exports = router;                    