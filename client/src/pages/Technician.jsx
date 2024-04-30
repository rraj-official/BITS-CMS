//import React from 'react'
import React, { useState, useEffect, useRef } from 'react';
import sampleComplaints from '../components/sampleComplaints'
import RemarksDropDown from '../components/RemarksDropDown';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Stack from '@mui/material/Stack';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";


const remarks = [null, "Not Done", "Done"];

const technician_details = {
    name: "Anand",
    phone_number: "9999999999"
}

const Technician = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [complaintsData, setComplaintsData] = useState([]);
    const [updatedComplaints, setUpdatedComplaints] = useState([]);
    const [loginData, setLoginData] = useState({});
    const fetchComplaints = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/student/complaints/technician/${technician_details.name}`);
            console.log("Complaints Data fetched successfully");
            const formattedData = response.data.map(({ Complaint_Id, fullname, Mobile_no, Category, sub_category, location, location_no, status, description, Forwarded_To_Incharge, Remarks, Complaint_logged_On }) => ({
                id: Complaint_Id,
                name: fullname,
                category: Category,
                subcategory: sub_category,
                Mobile_no: Mobile_no,
                location: location,
                location_no: location_no,
                status: status,
                description: description,
                attendant: Forwarded_To_Incharge,
                remarks: Remarks,
                date: Complaint_logged_On
            }));
            console.log(response.data);
            setComplaintsData(formattedData);
            setLoading(false);
        } catch (error) {
            console.log("Error fetching complaints data from Server");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComplaints();
    }, [loginData]);

    // Use after building technician authorization
    // if (Object.keys(loginData).length == 0) {
    //     return <div className="space-y-12 p-5 sm:mx-auto sm:w-2/3">
    //         <div className="p-10 pl-0 pb-20 border-b border-gray-900/10">
    //             <h2 className={classNames('text-black',
    //                 'rounded-md px-2 py-2 text-sm font-normal'
    //             )}>You are not authorized to view this page. Please <a
    //                 key='Log In'
    //                 className={classNames('text-[#fe2d2d] underline hover:text-black hover:cursor-pointer tracking-wide text-xs uppercase transition duration-150'
    //                 )}
    //                 onClick={() => {
    //                     navigate('/login', { state: location.state });
    //                 }}>log in</a>
    //             </h2>
    //         </div>
    //     </div>
    // }

    const [remark, setRemark] = useState(remarks[0]);

    // Function to handle remark change
    const handleRemarkChange = (complaintId, newRemark) => {
        const updatedComplaint = { id: complaintId, remark: newRemark };
        setUpdatedComplaints(prevState => [...prevState, updatedComplaint]);
    };
    
    const updateComplaints = async (updatedComplaints) => {
        try {
            const response = await axios.post(`http://localhost:5000/api/student/complaints/technician/update`, updatedComplaints, { withCredentials: true });
            console.log("Complaint Remark updated successfully ");
            console.table(updatedComplaints);
            fetchComplaints();
        }
        catch {
            console.log("Error sending complaints data to Server");
        }
    }

    const smallTable = complaintsData.map(item =>
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                className='flex justify-between'
            >
                <Stack direction="row" justifyContent="space-between" minWidth="lg" className='w-full'>
                    <Stack justifyContent="center" alignItems="flex-start">
                        <Typography sx={{ fontWeight: 'bold' }} className='text-gray-600'>{item.id}</Typography>
                        <Typography sx={{ fontWeight: 'bold' }} className='text-gray-600'>{item.subcategory}</Typography>
                        <Typography sx={{ fontWeight: 'bold' }} className='text-[#028A0F]'>{item.status}</Typography>
                    </Stack>
                    <Stack justifyContent="center" alignItems="flex-end">
                        <Typography sx={{ fontWeight: 'bold' }} className='text-[#18185d]'>{item.name}</Typography>
                        <Typography className='text-gray-600 text-xs'>{item.location},{item.location_no}</Typography>
                    </Stack>
                </Stack>

            </AccordionSummary>
            <AccordionDetails>
                <Stack justifyContent="center" alignItems="flex-start">
                <Typography className='flex  gap-4  text-gray-600'>
                        <Typography sx={{ fontWeight: 'bold' }} className='text-[#18185d]'>Date:</Typography>
                        {item.date}
                    </Typography>
                    <Typography className='flex  gap-4  text-gray-600'>
                        <Typography sx={{ fontWeight: 'bold' }} className='text-[#18185d]'>Description:</Typography>
                        {item.description}
                    </Typography>
                    <Typography className='flex  gap-9  text-gray-600'>
                        <Typography sx={{ fontWeight: 'bold' }} className='text-[#18185d]'>Remarks:</Typography>
                        <RemarksDropDown currentRemark={item.attendant} handleRemarkChange={(newRemark) => handleRemarkChange(item.id, newRemark)}/>
                    </Typography>
                    <Typography sx={{ fontWeight: 'bold' }} className='text-[#222274] text-center'><u>View Images</u></Typography>
                    <Typography className='flex  gap-9  text-gray-600'>
                        <Typography sx={{ fontWeight: 'bold' }} className='text-[#222274]'>
                            <a href={`tel:${item.Mobile_no}`}>
                                <button><u>Call Now</u></button>
                            </a>
                        </Typography>
                    </Typography>
                </Stack>
            </AccordionDetails>
        </Accordion>)
    return (
        <div className='bg-[#f6f6f9] pt-5'>
            <h2 className="mt-10 mb-10 text-center text-xl md:text-2xl leading-9 tracking-tight text-gray-600">
                Hi {technician_details.name}, here are your tasks for the day
            </h2>
            <div className="relative overflow-x-auto px-10">
                <div className='w-full text-xxs text-left text-black dark:text-[#18185d] md:hidden'>
                    {smallTable}
                </div>
                <table className="w-full text-sm text-left text-black dark:text-[#18185d] hidden md:block bg-white">
                    <thead className="text-xs text-white uppercase bg-[#18185d] dark:bg-[#6b3e17]] dark:text-white">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Ticket Number
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Mobile No.
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Location
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Subcategory
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
                                Remarks
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {complaintsData.map((user, index) => (
                            <>
                                <tr className="bg-white border-b dark:bg-white dark:border-gray-700"></tr>
                                <th
                                    className="px-6 py-4">
                                    {user.id}
                                </th>
                                <td className="px-6 py-4">{user.name} </td>
                                <td className="px-6 py-4">{user.Mobile_no} </td>
                                <td className="px-6 py-4">{user.location_no}, {user.location} </td>
                                <td className="px-6 py-4">{user.subcategory}</td>
                                <td className="px-6 py-4 max-w-md overflow-hidden break-words text-ellipsis">{user.description}</td>
                                <td className="px-6 py-4">{user.date}</td>
                                <td className="px-6 py-4"><button className='font-medium hover:font-semibold'>View images</button></td>
                                <td className="px-6 py-4"><RemarksDropDown currentRemark={user.attendant} handleRemarkChange={(newRemark) => handleRemarkChange(user.id, newRemark)} /></td>
                            </>

                        ))}
                    </tbody>
                </table>
                <div className="flex items-center justify-center gap-x-6 pb-10 my-10">
                    <button className="text-lg md:text-sm font-normal leading-6 px-3 py-2 rounded-md text-gray-900 bg-white"
                        onClick={(e) => {
                            e.preventDefault();
                            window.location.reload();
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        className="rounded-md bg-[#18185d] px-3 py-2 text-lg md:text-sm font-normal text-white shadow-sm hover:bg-[#282876] transition duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={(e) => {
                            e.preventDefault();
                            updateComplaints(updatedComplaints);
                        }}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Technician