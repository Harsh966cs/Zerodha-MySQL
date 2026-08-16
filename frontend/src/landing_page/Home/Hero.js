import React from 'react'
function Hero(){
  return (
    <div className='container p-5'>
        <div className='row text-center'>
            <img src='media/homeHero.png' alt='HomePage' className='mb-5'/>
            <h1>Inevest in everthing</h1>
            <p>Online plartforme to invest in stockes,derivation,mutal funds,and</p>
            <button className='p-3 btn btn-primary' style={{width:"20%",margin:"0 auto"}}>Singup Now</button>
        </div>
    </div>
  );
}
export default Hero