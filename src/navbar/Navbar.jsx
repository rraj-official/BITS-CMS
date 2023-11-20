import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import BITS_logo from '../images/BITS_logo.png';

const navigation = [
    { name: 'New Complaint', href: '/', current: true },
    { name: 'Past Complaints', href: '/past_complaints', current: false },
    { name: 'Log In', href: '/login', current: false },
    { name: 'Log Out', href: '/login', current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Navbar = () => {
    // const {loginUser}=props;
    // const {itemIndex}=props;

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
                        <div className="relative flex h-32 items-center justify-between">
                            <div className="bg-[#18185d] h-full p-5">
                                <img
                                    className="h-24 w-full"
                                    src={BITS_logo}
                                    alt="BITS Pilani logo"
                                />
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-[#18185d] hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:justify-end">
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                className={classNames(
                                                    item.name == selectedItem.name ? 'text-[#fe2d2d] tracking-wide text-xs hover:cursor-pointer uppercase' : 'text-black hover:text-[#fe2d2d] hover:cursor-pointer tracking-wide text-xs uppercase transition duration-150',
                                                    'rounded-md px-2 py-2 text-sm font-normal'
                                                )}
                                                onClick={() => {
                                                    setSelectedItem(item);
                                                    // this implementation does not work yet for navbar to catch ids
                                                    navigate(item.href, { state: location.state });
                                                }}
                                                aria-current={item.name == selectedItem.name ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    className={classNames(
                                        item.name == selectedItem.name ? 'bg-[#18185d] text-white tracking-wide text-sm uppercase text-center w-full' : 'w-full text-gray-300 hover:bg-gray-700 hover:text-white tracking-wide text-sm uppercase text-center',
                                        'block rounded-md px-3 py-2 text-base font-medium'
                                    )}
                                    aria-current={item.name == selectedItem.name ? 'page' : undefined}
                                    onClick={() => {
                                        setSelectedItem(item);
                                        // this implementation does not work yet for navbar to catch ids
                                        navigate(item.href, { state: location.state });
                                    }}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}

export default Navbar