import React from 'react'
import userData from '../components/userdata'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Stack from '@mui/material/Stack';
import axios from "axios"
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const smallTable=userData.map(item=>
    <Accordion>
    <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        className='flex justify-between'
        >
            <Stack direction="row" justifyContent="space-between" minWidth="lg" className='w-full'>
                <Stack justifyContent="center" alignItems="flex-start">
                    <Typography sx={{fontWeight:'bold'}} className='text-gray-600'>{item.id}</Typography> 
                    <Typography sx={{fontWeight:'bold'}} className='text-gray-600'>{item.category}</Typography> 
                    <Typography sx={{fontWeight:'bold'}} className='text-[#028A0F]'>{item.status}</Typography> 
                </Stack>
                <Stack justifyContent="center" alignItems="flex-end">
                    <Typography sx={{fontWeight:'bold'}} className='text-[#18185d]'>{item.name}</Typography> 
                    <Typography  className='text-gray-600'>{item.dateonly}</Typography> 
                    <Typography  className='text-gray-600'>{item.timeonly}</Typography> 
                </Stack>
            </Stack>
        
        </AccordionSummary>
        <AccordionDetails>
                <Stack justifyContent="center" alignItems="flex-start">
                    <Typography className='flex gap-2 text-gray-600'>
                        <Typography  sx={{fontWeight:'bold'}} className='text-[#18185d]'>Subcategory: </Typography>
                        {item.subcategory}
                    </Typography>
                    <Typography className='flex  gap-4  text-gray-600'>
                        <Typography sx={{fontWeight:'bold'}} className='text-[#18185d]'>Description:</Typography>
                        {item.description}
                    </Typography>
                    <Typography className='flex  gap-6  text-gray-600'>
                        <Typography sx={{fontWeight:'bold'}}className='text-[#18185d]'>Attendant: </Typography>
                        {item.attendant}
                    </Typography>
                    <Typography className='flex  gap-9  text-gray-600'>
                        <Typography sx={{fontWeight:'bold'}} className='text-[#18185d]'>Remarks:</Typography>
                        {item.remarks}
                    </Typography>
                    <Typography sx={{fontWeight:'bold'}} className='text-[#18185d] text-center'>{"View images>"}</Typography>
                </Stack>
        </AccordionDetails>
</Accordion>)

const Registered_complaints = () => {
    const navigate=useNavigate()
    const location=useLocation()
    const [userdata, setUserdata] = useState({});
    console.log("response", userdata)

    const getUser = async () => {
        try {
            const response = await axios.get("http://localhost:5000/login/success", { withCredentials: true });
            console.log(response.data.user)
            setUserdata(response.data.user)
        } catch (error) {
            console.log("error", error)
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    

    if(Object.keys(userdata).length==0){
        return <div className="space-y-12 p-5 sm:mx-auto sm:w-2/3">
        <div className="p-10 pl-0 pb-20 border-b border-gray-900/10">
            <h2 className={classNames( 'text-black',
            'rounded-md px-2 py-2 text-sm font-normal'
            )}>You are not authorized to view this page. Please <a
            key='Log In'
            className={classNames( 'text-[#fe2d2d] underline hover:text-black hover:cursor-pointer tracking-wide text-xs uppercase transition duration-150'
            )}
            onClick={() => {
                navigate('/login', { state: location.state });
            }}>log in</a>
            </h2>
        </div>
    </div>
    }
    
    return (
        <div className='bg-[#f6f6f9] pt-5 flex flex-col h-full'>
            <h2 className="mt-10 mb-10 text-center text-2xl leading-9 tracking-tight text-gray-600">
                Past Complaints Status
            </h2>
            <div className="relative overflow-x-auto px-10">
                <div className='w-full text-xxs text-left text-black dark:text-[#18185d] md:hidden'>
                    {smallTable}
                </div>
                <table className="w-full text-sm text-left text-black dark:text-[#18185d] hidden md:block bg-white mb-20">
                    <thead className="text-xs text-white uppercase bg-[#18185d] dark:bg-[#6b3e17]] dark:text-white">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Ticket Number
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Subcategory
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Description
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Images
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Attendant
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Remarks
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {userData.map((user, index) => (
                            <>
                                <tr className="bg-white border-b dark:bg-white dark:border-gray-700"></tr>
                                <th
                                    className="px-6 py-4">
                                    {user.id}
                                </th><td className="px-6 py-4">{user.category} </td><td className="px-6 py-4">{user.subcategory}</td><td className="px-6 py-4">{user.status}</td><td className="px-6 py-4 max-w-md overflow-hidden break-words text-ellipsis">{user.description}</td><td className="px-6 py-4">{user.date}</td><td className="px-6 py-4"><button className='font-medium hover:font-semibold'>View images</button></td><td className="px-6 py-4">{user.attendant}</td><td className="px-6 py-4">{user.remarks}</td>

                            </>

                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Registered_complaints