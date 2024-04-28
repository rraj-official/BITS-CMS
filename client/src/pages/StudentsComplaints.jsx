import React, { useState, useEffect, useRef } from 'react';
import DropDown from '../components/DropDown';
import StatusDropDown from '../components/StatusDropDown';
import HeadDropDown from '../components/HeadDropDown';
import sampleComplaints from '../components/sampleComplaints'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Stack from '@mui/material/Stack';
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import { Dropdown } from '@mui/base/Dropdown';
import { MenuButton } from '@mui/base/MenuButton';
import { Menu } from '@mui/base/Menu';
import { MenuItem } from '@mui/base/MenuItem';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function createHandleMenuClick() {

}
const StudentsComplaints = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [complaintsData, setComplaintsData] = useState([]);
    const [updatedComplaints, setUpdatedComplaints] = useState([]);
    const [loginData, setLoginData] = useState({});


    const currentDate = new Date();
    const dateString = currentDate.toLocaleString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });

    const [updatedComplaint, setUpdatedComplaint] = useState([{
        Complaint_Id: -555, // This needs to be unique
        Complaint_logged_On: dateString,
        Student_IdNo: "12345",
        username: "",
        fullname: "",
        Category: "Maintenance",
        sub_category: "Carpentry",
        sub_sub_category: "",
        User_department: "",
        location: "",
        location_no: "",
        Mobile_no: "",
        available_day: "",
        description: "",
        status: "New",
        Forwarded_To_Incharge: "",
        Remarks: ""
    }]);

    // Fetches login data of user like email and name from Google
    const getUser = async () => {
        try {
            const response = await axios.get("http://localhost:5000/login/success", { withCredentials: true });
            // console.log(response.data.user)
            setLoginData(response.data.user)

        } catch (error) {
            console.log("error", error)
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    // Fetching Complaints Data from Backend
    const fetchComplaints = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/student/complaints/');
            console.log("Complaints Data fetched successfully");
            const formattedData = response.data.map(({ Complaint_Id, fullname, Category, sub_category, status, description, Forwarded_To_Incharge, Remarks, Complaint_logged_On }) => ({
                id: Complaint_Id,
                name: fullname,
                category: Category,
                subcategory: sub_category,
                status: status,
                description: description,
                attendant: Forwarded_To_Incharge,
                remarks: Remarks,
                date: Complaint_logged_On
            }));
            // console.log(response.data);
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


    // Function to handle status change
    const handleStatusChange = (complaintId, newStatus) => {
        const updatedComplaint = { id: complaintId, status: newStatus };
        setUpdatedComplaints(prevState => [...prevState, updatedComplaint]);
    };

    // Function to handle attendant change
    const handleAttendantChange = (complaintId, newAttendant) => {
        const updatedComplaint = { id: complaintId, attendant: newAttendant };
        setUpdatedComplaints(prevState => [...prevState, updatedComplaint]);
    };

    const updateComplaints = async (updatedComplaints) => {
        try {
            const response = await axios.post(`http://localhost:5000/api/student/complaints/update`, updatedComplaints, { withCredentials: true });
            console.log("Complaint Data updated successfully ");
            console.table(updatedComplaints);
            fetchComplaints();
        }
        catch {
            console.log("Error sending complaints data to Server");
        }
    }

    const complaintTypes = ["All", "New", "Pending", "To Attend", "Completed",];
    //selectedComplaintType is the type of complaint admin chooses to see on the table
    const [selectedComplaintType, setSelectedComplaintType] = useState(complaintTypes[0]);

    const smallTable = complaintsData.filter(item => item.status == selectedComplaintType || selectedComplaintType == 'All').map(item =>
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
                        <Typography sx={{ fontWeight: 'bold' }} className='text-gray-600'>{item.category}</Typography>
                        <Typography sx={{ fontWeight: 'bold' }} className='text-[#028A0F]'>
                            {/* Status DropDown Handler */}
                            <StatusDropDown currentStatus={item.status} handleStatusChange={(newStatus) => handleStatusChange(item.id, newStatus)} />
                        </Typography>
                    </Stack>
                    <Stack justifyContent="center" alignItems="flex-end">
                        <Typography sx={{ fontWeight: 'bold' }} className='text-[#18185d]'>{item.name}</Typography>
                        <Typography className='text-gray-600'>{item.dateonly}</Typography>
                        <Typography className='text-gray-600'>{item.timeonly}</Typography>
                    </Stack>
                </Stack>

            </AccordionSummary>
            <AccordionDetails>
                <Stack justifyContent="center" alignItems="flex-start">
                    <Typography className='flex gap-2 text-gray-600'>
                        <Typography sx={{ fontWeight: 'bold' }} className='text-[#18185d]'>Subcategory: </Typography>
                        {item.subcategory}
                    </Typography>
                    <Typography className='flex  gap-4  text-gray-600'>
                        <Typography sx={{ fontWeight: 'bold' }} className='text-[#18185d]'>Description:</Typography>
                        {item.description}
                    </Typography>
                    <Typography className='flex  gap-6  text-gray-600'>
                        <Typography sx={{ fontWeight: 'bold' }} className='text-[#18185d]'>Attendant: </Typography>
                        {/* Attendant DropDown Handler */}
                        <DropDown currentAttendant={item.attendant} handleAttendantChange={(newAttendant) => handleAttendantChange(item.id, newAttendant)} />
                    </Typography>
                    <Typography className='flex  gap-9  text-gray-600'>
                        <Typography sx={{ fontWeight: 'bold' }} className='text-[#18185d]'>Remarks:</Typography>
                        {item.remarks}
                    </Typography>
                    <Typography sx={{ fontWeight: 'bold' }} className='text-[#18185d] text-center'>{"View images>"}</Typography>
                </Stack>
            </AccordionDetails>
        </Accordion>)

    if (Object.keys(loginData).length == 0) {
        return <div className="space-y-12 p-5 sm:mx-auto sm:w-2/3">
            <div className="p-10 pl-0 pb-20 border-b border-gray-900/10">
                <h2 className={classNames('text-black',
                    'rounded-md px-2 py-2 text-sm font-normal'
                )}>You are not authorized to view this page. Please <a
                    key='Log In'
                    className={classNames('text-[#fe2d2d] underline hover:text-black hover:cursor-pointer tracking-wide text-xs uppercase transition duration-150'
                    )}
                    onClick={() => {
                        navigate('/login', { state: location.state });
                    }}>log in</a>
                </h2>
            </div>
        </div>
    }

    return (
        <div className='bg-[#f6f8f9] mb-20'>
            <div>
                <div className='bg-[#f6f6f9] pt-5 flex flex-col h-full'>
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <>
                            <div>
                                <h2 className="pt-10 text-center text-2xl leading-9 tracking-tight text-gray-600 mb-2">
                                    Student Complaints
                                </h2>
                                <h3 className="pt-2 text-center text-lg leading-9 tracking-tight text-gray-600 mb-5 ml-auto mr-auto">
                                    <h4>Filter by:</h4>
                                    <div className="text-center ml-auto mr-auto w-fit" ><HeadDropDown selectedComplaintType={selectedComplaintType} setSelectedComplaintType={setSelectedComplaintType} /></div>
                                </h3>
                            </div>
                            <div className="relative overflow-x-auto px-10">
                                <div className='w-full text-xxs text-left text-black dark:text-[#18185d] md:hidden'>
                                    {loading ? "Loading..." : smallTable}
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
                                                Complaint Status
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
                                        {/*renders only those complaints that fit the selected complaint type*/}
                                        {complaintsData.filter((user) => user.status == selectedComplaintType || selectedComplaintType == 'All').map((user) => (
                                            <>
                                                <tr className="bg-white border-b dark:bg-white dark:border-gray-700"></tr>
                                                <th className="px-6 py-4">{user.id}</th>
                                                <td className="px-6 py-4">{user.name}</td>
                                                <td className="px-6 py-4">{user.category}</td>
                                                <td className="px-6 py-4">{user.subcategory}</td>
                                                <td className="px-6 py-4">
                                                    <StatusDropDown currentStatus={user.status} handleStatusChange={(newStatus) => handleStatusChange(user.id, newStatus)} />
                                                </td>
                                                <td className="px-6 py-4 max-w-md overflow-hidden break-words text-ellipsis">{user.description}</td>
                                                <td className="px-6 py-4">{user.date}</td>
                                                <td className="px-6 py-4"><button className='font-medium hover:font-semibold'>View images</button></td>
                                                <td className="px-6 py-4">
                                                    <DropDown currentAttendant={user.attendant} handleAttendantChange={(newAttendant) => handleAttendantChange(user.id, newAttendant)} />
                                                </td>
                                                <td className="px-6 py-4">{user.remarks}</td>
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
                        </>
                    )}
                </div>
            </div>
        </div>
    );

}

export default StudentsComplaints