import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import DropDown from '../components/DropDown'
import AddImages from '../components/AddImages';

const userData = [];

const New_complaint = () => {
    const navigate = useNavigate();
    return (
        <form className='bg-[#f6f8f9]'>
            <div className="space-y-12 p-5 sm:mx-auto sm:w-2/3">
                <div className="p-10 pb-20 border-b border-gray-900/10">
                    <h2 className="text-xl mb-5 font-semibold leading-7 text-gray-900">Register a new complaint</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Enter the details and click save.</p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                        <div className="sm:col-span-3">
                            <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                Category
                            </label>
                            <div className="mt-2">
                                <select
                                    id="category"
                                    name="category"
                                    autoComplete="category-name"
                                    className="hover:cursor-pointer block w-full rounded-md border-0 px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    value="Maintenance"
                                // onChange={(e) => {
                                //     setCountry(e.target.value);
                                // }}
                                >
                                    <option>Maintenance</option>
                                    <option>IT</option>
                                </select>
                            </div>
                        </div>
                        {/* Need to do conditional rendering to display sub categories of IT as well */}
                        <div className="sm:col-span-3">
                            <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                Sub-Category
                            </label>
                            <div className="mt-2">
                                <select
                                    id="category"
                                    name="category"
                                    autoComplete="category-name"
                                    className="hover:cursor-pointer block w-full rounded-md px-2 border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    value="Maintenance"
                                // onChange={(e) => {
                                //     setCountry(e.target.value);
                                // }}
                                >
                                    <option>Carpentry</option>
                                    <option>Electrical</option>
                                    <option>Plumbing</option>
                                    <option>AC</option>
                                    <option>Civil</option>
                                </select>
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                Room No./Location No.
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="first-name"
                                    id="first-name"
                                    autoComplete="given-name"
                                    value={userData.first_name}
                                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 border-none outline-none sm:text-sm sm:leading-6"
                                // onChange={(e) => {
                                //     setUserData({
                                //         ...userData,
                                //         first_name: e.target.value
                                //     });
                                // }}
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                Mobile No.
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="last-name"
                                    id="last-name"
                                    autoComplete="family-name"
                                    value={userData.last_name}
                                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 border-none outline-none sm:text-sm sm:leading-6"
                                // onChange={(e) => {
                                //     setUserData({
                                //         ...userData,
                                //         last_name: e.target.value
                                //     });
                                // }}
                                />
                            </div>
                        </div>

                        <div className='sm:col-span-6'>
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Upload Images
                            </label>
                            <div className='mt-2'><AddImages /></div>
                        </div>
                    </div>

                    <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="col-span-full">
                            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                Complaint Description
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={3}
                                    className="focus:ring-2 px-2 block w-full outline-none border-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                    defaultValue={''}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center gap-x-6 pb-20">
                <button className="text-sm font-normal leading-6 px-3 py-2 rounded-md text-gray-900 bg-white"
                    // onClick={(e) => {
                    //     e.preventDefault();
                    //     navigate('/', { state: userData.id });
                    // }}
                    >
                    Cancel
                </button>
                <button
                    className="rounded-md bg-[#18185d] px-3 py-2 text-sm font-normal text-white shadow-sm hover:bg-[#282876] transition duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                // onClick={updateUserData}
                >
                    Save
                </button>
            </div>
        </form>
    )
}


export default New_complaint