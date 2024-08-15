import React from 'react'
import { Link } from 'react-router-dom'

const Homepage = () => {
  return (
    <div>
      <div style={{display:'flex',flexDirection:'column',maxWidth:'870px',marginLeft:'90px',marginTop:'90px'}}>
        <div style={{marginBottom:'50px'}}>
          <h1>
            Experience the height of fashion with our exquisite designer pieces.
          </h1>
          <h4 style={{marginTop:'50px'}}>
            Where style, sophistication, exclusivity is the forefront of our collection. 
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Repellat quaerat nostrum quia nam earum, libero, expedita impedit delectus provident quo eveniet.
          </h4>
        </div>
        <Link to='/all' style={{maxWidth:'230px',fontSize:'17px',padding:'13px',fontWeight:'bold'}} type="button" className="btn btn-dark">Discover Our Products</Link>
      </div>
      <div>
        <img src='./public/home-photo-1.webp' style={{height:'400px',marginLeft:'1000px',marginTop:'-400px'}} alt="Homepage Photo"></img>
      </div>
    </div>
  )
}

export default Homepage
