import React from 'react'
import DropDown from '../components/DropDown';
import sampleComplaints from '../components/sampleComplaints'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Stack from '@mui/material/Stack';
import { Dropdown } from '@mui/base/Dropdown';
import { MenuButton } from '@mui/base/MenuButton';
import { Menu } from '@mui/base/Menu';
import { MenuItem } from '@mui/base/MenuItem';


const smallTable=sampleComplaints.map(item=>
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
                        <DropDown/>
                    </Typography>
                    <Typography className='flex  gap-9  text-gray-600'>
                        <Typography sx={{fontWeight:'bold'}} className='text-[#18185d]'>Remarks:</Typography>
                        {item.remarks}
                    </Typography>
                    <Typography sx={{fontWeight:'bold'}} className='text-[#18185d] text-center'>{"View images>"}</Typography>
                </Stack>
        </AccordionDetails>
</Accordion>)


function createHandleMenuClick(){

}
const Admin = () => {
    return (
        <div className='bg-[#f6f8f9] mb-20'>
            <div>
                <h2 className="mb-1 pt-10 text-center text-2xl leading-9 tracking-tight text-gray-600 mb-10">
                    Admin Dashboard
                </h2>
                {/* <h2 className="mb-[8rem] pt-1 pb-1000 text-center block ml-auto  text-2xl leading-9 tracking-tight text-gray-600"> */}
                {/* <Dropdown>
                    <MenuButton>My account</MenuButton>
                    <Menu >
                        <MenuItem onClick={createHandleMenuClick('Profile')}>Profile</MenuItem>
                        <MenuItem onClick={createHandleMenuClick('Language settings')}>
                        Language settings
                        </MenuItem>
                        <MenuItem onClick={createHandleMenuClick('Log out')}>Log out</MenuItem>
                    </Menu>
                </Dropdown>
                </h2> */}
            </div>
            <div className="relative overflow-x-auto px-10">
                <div className='w-full text-xxs text-left text-black dark:text-[#18185d] md:hidden'>
                    {smallTable}
                </div>
                <table className="w-full text-sm text-left text-black dark:text-[#18185d] hidden md:block">
                    <thead className="text-xs text-white uppercase bg-[#18185d] dark:bg-[#6b3e17]] dark:text-white">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Ticket Number
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
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

                        {sampleComplaints.map((user, index) => (
                            <>
                                <tr className="bg-white border-b dark:bg-white dark:border-gray-700"></tr>
                                <th
                                    className="px-6 py-4">
                                    {user.id}
                                </th><td className="px-6 py-4">{user.name} </td><td className="px-6 py-4">{user.category} </td><td className="px-6 py-4">{user.subcategory}</td><td className="px-6 py-4">{user.status}</td><td className="px-6 py-4 max-w-md overflow-hidden break-words text-ellipsis">{user.description}</td><td className="px-6 py-4">{user.date}</td><td className="px-6 py-4"><button className='font-medium hover:font-semibold'>View images</button></td><td className="px-6 py-4"><DropDown /></td><td className="px-6 py-4">{user.remarks}</td>

                            </>

                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Admin