import React from 'react'
import BITS_flag from '../images/BITS_flag.gif';

const footer = () => {
    return (
        <div className='mt-auto'>
            <img
                className="h-24 object-cover"
                src={BITS_flag}
                alt="BITS Pilani flag"
            />
        </div>
    )
}

export default footer