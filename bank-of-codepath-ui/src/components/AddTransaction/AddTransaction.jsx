import * as React from "react"
import "./AddTransaction.css"

export default function AddTransaction( { isCreating,setIsCreating, form, setForm, handleOnSubmit, amount } ) {

  const handleOnFormFieldChange = (change) => {
    let c = form.category
    let d = form.description
    let a = form.amount
    
    if(change.target.name == "description"){
      d=change.target.value
    } else if(change.target.name =="category"){
      c=change.target.value
    } else if(change.target.name=="amount"){
      a = change.target.value
    }
    
    setForm({category:c,description:d,amount:a}) 
    console.log(form)
  } 

  return (
    <div className="add-transaction">
      <h2>Add Transaction</h2>

      <AddTransactionForm 
      handleOnFormFieldChange={handleOnFormFieldChange} 
      form={form} 
      handleOnSubmit={handleOnSubmit}
      isCreating={isCreating} />

    </div>
  )
}

export function AddTransactionForm( {handleOnFormFieldChange, handleOnSubmit, form, isCreating}){
  return (
    <div className="form">
      <div className="fields">
        <div className="field">
          <label>Description</label>
          <input name="description" type="text" onChange={handleOnFormFieldChange} value={form?.description || ""}/>
        </div>
        <div className="field">
          <label>Category</label>
          <input name="category" type="text" onChange={handleOnFormFieldChange}value={form?.category || ""}/>
        </div>
        <div className="field half-flex">
          <label>Amount (cents)</label>
          <input name="amount" type="number" onChange={handleOnFormFieldChange} value={form?.amount || 0}/>
        </div>

        <button className="btn add-transaction" type="submit" onClick={handleOnSubmit}>
          Add
        </button>
      </div>
    </div>
  )
}
