const Income =  require('../models/Income')
const Expense = require('../models/Expense')
const {isValidObjectId, Types} = require('mongoose')

exports.getDashboardData = async (req, res) => {
    try{
        // const userId = req.user.userId
        const userId = req.user._id
        const userObjectId = new Types.ObjectId(String(userId))

        //Fetch total income
        const totalIncome = await Income.aggregate([
            { $match : {userId: userObjectId } },
            { $group: {_id: null, total: {$sum: "$amount"}}},
        ])

        //Fetch total expense
        const totalExpense = await Expense.aggregate([
            { $match : {userId: userObjectId } },
            { $group: {_id: null, total: {$sum: "$amount"}}},
        ])

        //Get Income Transaction in the last 60 Days
        const last60DaysIncomeTransactions = await Income.find({
            userId,
            date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
        }).sort({date: -1})

        //Get Total Income in the last 60 Days
        const Incomelast60Days = last60DaysIncomeTransactions.reduce(
            (sum, transactions) => sum + transactions.amount, 0 // 0 cause it will start form 0
        )

        // Get expense transactions in the last 30 days
        const last30DaysExpenseTransactions = await Expense.find({
            userId,
            date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
        }).sort({date: -1})

        // //Get Total Income in the last 30 Days
        // const Incomelast30Days = last30DaysIncomeTransactions.reduce(
        //     (sum, transactions) => sum + transactions.amount, 0
        // )

        //Get Total Expense in the last 30 Days
        const expenseLast30Days = last30DaysExpenseTransactions.reduce(
            (sum, transactions) => sum + transactions.amount, 0
        )

        //fetch last 5 transaction (income + expense)
        const lastTransactions = [
            ...(await Income.find({userId}).sort({date: -1 }).limit(5)).map(
                (txn) => ({
                    ...txn.toObject(),
                    type: "income",
                })
            ),
            ...(await Expense.find({userId}).sort({date: -1}).limit(5)).map(
                (txn) => ({
                    ...txn.toObject(),
                    type: "expense",
                })
            )
        ].sort((a, b) => b.date - a.date) // sort latest first

        res.json({
            totalBalance:
            (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
            totalIncome: totalIncome[0]?.total || 0,
            totalExpense: totalExpense[0]?.total || 0,
            last30DaysExpenses: {
                total: expenseLast30Days || 0,
                transactions: last30DaysExpenseTransactions || [],
            },
            last60DaysIncome: {
                total: Incomelast60Days || 0,
                transactions: last60DaysIncomeTransactions || [],
            },
            recentTransactions: lastTransactions
        })
    }
    catch(err){
        res.status(500).json({message: "Server Error", err})
    }
}