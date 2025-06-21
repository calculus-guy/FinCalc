import React, { useEffect, useState } from 'react'
import { useUserAuth } from '../../hooks/useUserAuth'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { API_PATHS } from '../../utils/apiPaths'
import ExpenseOverview from '../../components/Expense/ExpenseOverview'
import AddExpenseForm from '../../components/Expense/AddExpenseForm'
import Modal from '../../components/Modal'
import DeleteAlert from '../../components/DeleteAlert'
import axiosInstance from '../../utils/axiosInstance'
import ExpenseList from '../../components/Expense/ExpenseList'

const Expense = () => {
    useUserAuth()
  const [expenseData, setExpenseData] = useState([])
  const [loading, setLoading] = useState(false)
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  })

  const fetchExpenseDetails = async () => {
    if(loading) return
    setLoading(true)

    try{
      const response = await axiosInstance.get(
        `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`)

        if(response.data){
            setExpenseData(response.data)
        }
    }
    catch(err){
      console.log("Something went Wrong. Please Try Again", err)
    } finally{
      setLoading(false)
    }

  }

  const handleAddExpense = async (expense) => {
    const {category, amount, date, icon} = expense
    if(!category.trim()){
      toast.error("Category is required")
      return
    }

    if(!amount|| isNaN(amount) || Number(amount) <= 0){
      toast.error("Amount should be a valid Number greater than 0")
      return
    }


    if(!date){
      toast.error("Date is required")
      return
    }

    try{
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category, amount, date, icon
      })
      setOpenAddExpenseModal(false)
      toast.success("Expense Added Successfully")
      fetchExpenseDetails()
    }
    catch(err){
      console.log("Error Adding Expense", err.response?.data?.message || err.message)
    }
  }
  const deleteExpense = async (id) => {
    try{
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id))

      setOpenDeleteAlert ({show: false, data: null})
      toast.success("Expense Detail Deleted Successfully")
      fetchExpenseDetails()
    }
    catch(err){
      "Error Deleting Expense"
      err.response?.message || err.message
    }
  }
  const handleDownloadExpenseDetails = async () => {
    try{
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
        {
          responseType: "blob"
        }
      )

      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", "expense_details.xlsx")
      link.click()
      link.parentNode.removeChild(link)
      window.URL.revokeObjectURL(url)
    }
    catch(err){
      console.error("Error downloading expense details", err)
      // toast.error("Failed to download expense detils, Pleast try again later")
    }
  }

  useEffect(() => {
    fetchExpenseDetails()

    return() => {}
  })
  return (
    <DashboardLayout activeMenu="Expense">
      <div className='my-5 mx-auto'>
      <div className='grid grid-cols-1 gap-6'>
      <div className=''>
        <ExpenseOverview
        transactions={expenseData}
        onAddExpense={() => setOpenAddExpenseModal(true)}
        />
      </div>

      <ExpenseList
      transactions={expenseData}
      onDelete={(id) => {
      setOpenDeleteAlert({show: true, data: id})
      }}
      onDownload={handleDownloadExpenseDetails}
      />
      </div>

      <Modal
      isOpen={openAddExpenseModal}
      onClose={() => setOpenAddExpenseModal(false)}
      title="Add Expense"
      >
        <div>
          <AddExpenseForm
          onAddExpense={handleAddExpense}
          />
        </div>
      </Modal>

      <Modal
      isOpen={openDeleteAlert.show}
      onClose={() => setOpenDeleteAlert({show: false, data: null})}
      title="Delete Expense"
      >
        <DeleteAlert
        content="Are you sure you want to delete this Expense"
        onDelete={() => deleteExpense(openDeleteAlert.data)}
        />
      </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Expense
