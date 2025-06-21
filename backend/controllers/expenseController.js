const User = require('../models/User')
const Expense = require('../models/Expense')
const xlsx = require('xlsx')

exports.addExpense = async (req, res) => {
    const userId = req.user.id

    try{
        const {icon, category, amount, date} = req.body

        if(!category || !amount || !date){
            return res.status(400).json({message: "All Fields are required"})
        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date)
        })
        await newExpense.save()
        res.status(200).json(newExpense)
    }
    catch (err){
         res.status(500).json({message: "Server Error"})
    }
}

exports.getAllExpense = async (req, res) => {
    const userId = req.user.id
    try{
        const expense = await Expense.find({userId}).sort({date: -1})
            res.json(expense)
    }
    catch{
        res.status(500).json({message: "Server Error"})
    }
}

exports.deleteExpense = async (req, res) => {
    const userId = req.user.id
    try{
        await Expense.findByIdAndDelete(req.params.id)
        res.json({message: "income deleted successfully"})
    }
    catch{
        res.status(500).json({message: "Server Error"})
    }
}

exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id
    try{
        const expense = await Expense.find({userId}).sort({date: -1})

        const data = expense.map((item) => ({
            Amount: item.amount,
            Category: item.category,
            Date: item.date
        })) 

        const wb = xlsx.utils.book_new()
        const ws = xlsx.utils.json_to_sheet(data)
        xlsx.utils.book_append_sheet(wb, ws, "Expense")
        xlsx.writeFile(wb, "Expense_details.xlsx")
        res.download("Expense_details.xlsx")
    }
    catch{
        res.status(500).json({message: "Server Error"})
    }
}