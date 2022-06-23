import * as React from "react"
import "./FilterInput.css"

export default function FilterInput( {filterInputChange, handleOnChange} ) {
  return (
    <div className="filter-input">
      <i className="material-icons">search</i>
      <input type="text" placeholder="Search transactions" onChange={handleOnChange} value=""/>
    </div>
  )
}
