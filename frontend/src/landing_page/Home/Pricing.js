import React from 'react'

const Pricing = () => {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-6'>
            <h3 style={{color:"#424242",marginTop:"30px",marginBottom:"30px"}}>Unbeatable pricing</h3>
            <p>We pioneered the concept of discount broking and price transparency in India. Flat fees and no hidden charges.</p>
            <a className='p-3' style={{width:"20%",margin:"0 auto",textDecoration:"none"}}>Singup Now</a>
        </div>
        <div className='col-6' st>
          <span className='col-2'>
             <img src='media\kc-banner-image.svg'/>
           </span>
          <span className='col-2'> 
             <img src='media\kc-banner-image.svg'/>
           </span>
              <span className='col-2'>
             <img src='media\kc-banner-image.svg'/>
             </span>
        </div>
      </div>
    </div>
  )
}

export default Pricing