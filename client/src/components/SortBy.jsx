import React, { useState } from 'react'

const SortBy = ({onChanges}) => {

  const [sortBy,setSortBy]=useState("Low")
const onChange=(value)=>{
setSortBy(value)
onChanges()

}
  return (
    <div>
    <p style={{fontSize:'20px',fontWeight:'bolder',marginBottom:'10px',marginLeft:'60px',marginTop:'60px'}} >Sort By:</p>
    <select value={sortBy} onChange={(e)=>onChange(e.target.value)} style={{maxWidth:'300px',marginLeft:'30px'}} className="form-select form-select-lg mb-3" aria-label="Large select example">

  <option value="Low">Price ( Lowest to Highest )</option>
  <option value="High">Price ( Highest to Lowest )</option>

</select>

  </div>
  )
}

export default SortBy
