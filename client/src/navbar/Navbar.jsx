import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom' 
import axios from "axios"
import BITS_logo from '../images/BITS_logo.png';
import BITS_flag_line from '../images/BITS_flag_line.gif';
import SampleAdmins from '../components/SampleAdmins'

const navigation = [
    { name: 'Log In', href: '/login', current: false, userType: "unverified" },
    { name: 'New Complaint', href: '/new_complaint', current: true, userType: "student" },
    { name: 'Past Complaints', href: '/past_complaints', current: false, userType: "student" },
    { name: 'Log Out', href: '/login', current: false, userType: "student" },
    { name: 'New Complaint', href: '/new_complaint', current: true, userType: "staff" },
    { name: 'Past Complaints', href: '/past_complaints', current: false, userType: "staf" },
    { name: 'Log Out', href: '/login', current: false, userType: "staff" },
    { name: 'Students Complaints', href: '/students_complaints', current: false, userType: "admin" },
    { name: 'Faculty & Staff Complaints', href: '/staff_complaints', current: false, userType: "admin" },
    { name: 'Log Out', href: '/login', current: false, userType: "admin" },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

//checks if a given email id belongs to a student
function isStudent(email) {
    console.log(email)
    if (/*!SampleAdmins.includes(email)&&*/(email.startsWith("f20") || email.startsWith("h20"))) {
        return true
    }
    return false
}

function isAdmin(email) {
    if (SampleAdmins.includes(email)) {
        return true
    }
}


const Navbar = () => {
    // const {loginUser}=props;
    // const {itemIndex}=props;
    const [userdata, setUserdata] = useState({});
    const [userStatus, setUserStatus] = useState("unverified")

    const getUser = async () => {
        try {
            const response = await axios.get("http://localhost:5000/login/success", { withCredentials: true });
            console.log(response.data.user)
            setUserdata(response.data.user)
            if (isAdmin(response.data.user.email)) {
                setUserStatus("admin")
            }
            else if (isStudent(response.data.user.email)) {
                setUserStatus("student")
            }
            else {
                setUserStatus("staff")
            }
            console.log(userStatus);
            // if(Object.keys(response.data.user).length > 0){
                // redirectUser(userStatus);
            // }

        } catch (error) {
            console.log("error", error)
        }
    }
    //assigns a status of admin, staff, or student to the user- the function is not executed if the user is not logged in
    const verifyUser = async () => {
        if (Object.keys(userdata).length > 0) {
            console.log("yes")

        }
        console.log(userStatus)
    }

    // Redirects the user based on user type
    const redirectUser = (userStatus) => {
        // console.log(userStatus);
        if (userStatus === "admin") {
            navigate("/students_complaints");
        } else if (userStatus === "student") {
            navigate("/new_complaint");
        } else if (userStatus === "staff") {
            navigate("/staff_new_complaint");
        } else {
            navigate("/login");
        }
    }

    useEffect(() => {
        if (userStatus !== "unverified") {
            redirectUser(userStatus);
        }
    }, [userStatus]);

    useEffect(() => {
        getUser();
        verifyUser();
    }, [])

    // logout
    const logout = () => {
        window.open("http://localhost:5000/logout", "_self")
    }

    const [selectedItem, setSelectedItem] = useState(navigation[0]);
    const handleItemClick = (item) => {
        // Update the selected item when a link is clicked
        setSelectedItem(item);
    };

    const navigate = useNavigate();
    // this implementation does not work yet for navbar to catch ids
    const location = useLocation();
    return (
        <Disclosure as="nav" className="bg-white">
            {({ open }) => (
                <>
                    <div className="mx-0 max-w-full pr-2 sm:pr-6 lg:pr-8">
                        {/* Need to add flag lines in small phones as well */}

                        <div className="relative flex h-32 items-center justify-between z-10">
                            <div className="bg-[#18185d] h-full p-5">
                                <img
                                    className="h-24 w-full"
                                    src={BITS_logo}
                                    alt="BITS Pilani logo"
                                />
                            </div>

                            <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}

                                <Disclosure.Button className="relative transition duration-500 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-[#18185d] hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>

                            </div>
                            <div className='flex flex-col'>
                                <div className="flex flex-1 items-center justify-center sm:justify-end">
                                    <div className="hidden sm:ml-6 sm:block">

                                        <div className="flex space-x-4">
                                            {navigation.map((item) => {
                                                if (item.userType == userStatus) {
                                                    return <a
                                                        key={item.name}
                                                        className={classNames(
                                                            item.name == selectedItem.name ? 'text-[#fe2d2d] tracking-wide text-xs hover:cursor-pointer uppercase' : 'text-black hover:text-[#fe2d2d] hover:cursor-pointer tracking-wide text-xs uppercase transition duration-150',
                                                            'rounded-md px-2 py-2 text-sm font-normal'
                                                        )}
                                                        onClick={() => {
                                                            setSelectedItem(item);
                                                            // this implementation does not work yet for navbar to catch ids
                                                            if (item.name == 'Log Out') {
                                                                logout()
                                                                return

                                                            }
                                                            navigate(item.href, { state: location.state });
                                                        }}
                                                        aria-current={item.name == selectedItem.name ? 'page' : undefined}
                                                    >
                                                        {item.name}
                                                    </a>
                                                }

                                                else return <></>

                                            })}
                                        </div>
                                    </div>
                                </div>
                                <div className='hidden sm:flex flex-col items-end justify-end absolute bottom-0 right-0 h-1/3 w-1/3'>
                                    <img
                                        className="w-full object-cover"
                                        src={BITS_flag_line}
                                        alt="BITS Pilani flag branding"
                                    />
                                    {/* Flag lines for mobile devices */}
                                    {/* Doesn't work yet */}
                                    <div className='sm:hidden flex flex-col items-end justify-end h-[2px] w-full'>
                                        <img
                                            className="w-full object-cover"
                                            src={BITS_flag_line}
                                            alt="BITS Pilani flag branding"
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>



                    <Transition
                        show={open}
                        enter="transition ease-out duration-300"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-200"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95">
                        <Disclosure.Panel className="sm:hidden">
                            <div className="space-y-1 px-2 pb-3 pt-2">
                                {navigation.map((item) => {
                                    if (item.userType == userStatus) {
                                        return <Disclosure.Button
                                            key={item.name}
                                            className={classNames(
                                                item.name == selectedItem.name ? 'bg-[#18185d] text-white text-sm uppercase text-center w-full' : 'w-full text-gray-300 hover:bg-gray-700 hover:text-white tracking-wide text-sm uppercase text-center',
                                                'block rounded-md px-3 py-2 text-base font-normal tracking-wide'
                                            )}
                                            aria-current={item.name == selectedItem.name ? 'page' : undefined}
                                            onClick={() => {
                                                setSelectedItem(item);
                                                // this implementation does not work yet for navbar to catch ids
                                                if (item.name == 'Log Out') {
                                                    logout()
                                                    return

                                                }
                                                navigate(item.href, { state: location.state });
                                            }}
                                        >
                                            {item.name}
                                        </Disclosure.Button>
                                    }
                                    else return <></>
                                })}
                            </div>
                        </Disclosure.Panel>

                    </Transition>

                </>
            )}

        </Disclosure>

    )
}

export default Navbar