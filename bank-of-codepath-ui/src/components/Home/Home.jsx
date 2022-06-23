import * as React from "react"
import AddTransaction from "../AddTransaction/AddTransaction"
import BankActivity from "../BankActivity/BankActivity"
import "./Home.css"
import { useEffect } from "react"
import axios from "axios"

export default function Home({ transactions,setTransactions,transfers,setTransfers,error,setError,isLoading,setIsLoading,filterInputValue, newTransactionForm, setNewTransactionForm, isCreating, setIsCreating }) {

  useEffect(() => {
    setIsLoading(true)
    const fetchData = async () => {
      const transactionResult = await axios.get("http://localhost:3001/bank/transactions")
      if(transactionResult?.data?.transactions){
        setTransactions(transactionResult.data.transactions) 
      }else{
        setError("error noo transactions")
      }

      const transferResult = await axios.get("http://localhost:3001/bank/transfers")
      if(transferResult?.data?.transfers){
        setTransfers(transferResult.data.transfers) 
      }else{
        setError("error no transactions")
      }
    }
    fetchData()
    setIsLoading(false)
  }, [])

  const handleOnCreateNewTransaction = async () => {
    setIsCreating(true)
    try{
      axios.post("http://localhost:3001/bank/transactions", 
      {transaction:newTransactionForm})
      
      setTransactions(t => [...transactions, [{id:transactions.length},...newTransactionForm]])
    } catch(err){
      setError(err)
    } 
    setNewTransactionForm({category:"", description: "", amount:0})
    setIsCreating(false)
  }

  let filteredTransactions = filterInputValue  ? transactions?.filter((t) => t.description.toLowerCase().includes(filterInputValue.toLowerCase())) : transactions
  return (
    <div className="home">
      {error ? <h2 className="error"> {error} </h2> : null}
      <AddTransaction 
      isCreating={isCreating} 
      setIsCreating={setIsCreating} 
      form={newTransactionForm} 
      setForm={setNewTransactionForm} 
      handleOnSubmit={handleOnCreateNewTransaction}/>
      {isLoading ? <h1> Loading... </h1> : <BankActivity transactions={filteredTransactions}/>}
    </div>
  )
}
