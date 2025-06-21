const express = require('express')
const {
    addincome,
    getAllIncome,
    deleteIncome,
    downloadIncomeExcel,
} = require('../controllers/incomeController')
const {protect} = require("../middleware/authMiddleware")

const router = express.Router()

router.post("/add", protect, addincome)
router.get("/get", protect, getAllIncome)
router.get("/downloadExcel", protect, downloadIncomeExcel)
router.delete("/:id", protect, deleteIncome)

module.exports = router