import React from 'react'
import BITS_flag from '../images/BITS_flag.gif';

const footer = () => {
    return (
        <div className='mt-auto md:flex'>
            <div className='hidden md:block text-xs w-3/4 mt-auto md:m-4 md:text-xs md:w-1/2 md:mt-auto'>
                An Institution Deemed to be University estd. vide Sec.3 of the UGC Act, 1956 under notification # F.12-23/63.U-2 of Jun 18, 1964
                <br/>
                © 2024 Computer Centre, BITS Pilani, K. K. Birla Goa Campus
                <br/>
                Developed by: Rohit Raj, Aishwarya Naidu
                <br/>
                Version: 2.0
            </div>
            <div className='ml-auto md:ml-auto'>
                <img
                    className="h-16 md:h-24 object-cover"
                    src={BITS_flag}
                    alt="BITS Pilani flag"
                />
            </div>
            <div className='md:hidden text-xs w-full mt-auto md:m-4 md:text-xs md:w-1/2 md:mt-auto p-4'>
                An Institution Deemed to be University estd. vide Sec.3 of the UGC Act, 1956 under notification # F.12-23/63.U-2 of Jun 18, 1964
                <br/>
                © 2024 Computer Centre, BITS Pilani, K. K. Birla Goa Campus
                <br/>
                Developed by: Rohit Raj, Aishwarya Naidu
                <br/>
                Version: 2.0
            </div>
        </div>
    )
}

export default footer