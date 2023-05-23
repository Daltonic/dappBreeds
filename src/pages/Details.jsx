import Heroimage3 from '../assets/heroimage3.jpg'

const Details = () => {
  return (
    <div className='w-full flex '>

        <div className=' flex flex-col p-5 w-full items-center justify-center  lg:flex-row  md:p-32 gap-20'>
                <div className='flex ' >
                    <li className='bg-[#202938]  md:w-[340px] h-[340px] flex justify-center items-center '>
                        <img src={Heroimage3}  alt='DetailsImage' className='w-56 h-72 object-contain p-4 md:p-0' />
                    </li>
                </div>
                <div className='flex flex-col items-start gap-10  text-white'>
                   
                
                     <div className=' flex flex-col gap-3'>
                        <h4 className='text-white'> Graduate Ape</h4>
                        
                        <span>@You</span>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas numquam fugiat excepturi provident accusamus quibusdam blanditiis optio, eum nemo minus asperiores sed ipsam ratione, quisquam consectetur unde cumque! Non, minima.</p>
                     </div>
                     <div >
                        <h4>Current Price</h4>
                        <span>24 ETH</span>
                     </div>
                    
                </div>

        </div>



    </div>
  )
}

export default Details