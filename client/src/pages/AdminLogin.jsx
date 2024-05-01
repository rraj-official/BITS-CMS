import React from 'react'
import { Form } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { TechnicianContext } from '../TechnicianContext';
import { useContext } from 'react';

const technician_details = [
   {name: 'Anand',
    phone_number: '9999999999'},
]


const AdminLogin = () => {
    const { technicianData, updateTechnicianData } = useContext(TechnicianContext);
    const navigate=useNavigate()
    const [formData, updateFormData]=React.useState({name:"", phone_number:""})
    const [incorrectCredential, updateIncorrectCredential]=React.useState(false)
    function handleSubmit(event){
        event.preventDefault()
        let flag=true
        for (var i = 0; i < technician_details.length && flag ; i++) {
            if(technician_details[i].name===formData.name && technician_details[i].phone_number==formData.phone_number){
                flag=false;
                let technician=[]
                technician.push(technician_details[i].name)
                technician.push(technician_details[i].phone_number)
                updateTechnicianData(technician)
            }
        }
        if(!flag){
            updateIncorrectCredential(false)  
            navigate("/technician")
        }
        else{
            updateIncorrectCredential(true)
            console.log(formData)
        }
    }
    return (
        <div className='bg-[#f6f8f9]'>
            <div className="flex pt-20 flex-1 flex-col justify-center px-6 pb-10 lg:px-8 mb-20">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-20">
                    <form className="space-y-6">
                        <div>
                            <h2 className="mb-10 text-center text-2xl leading-9 tracking-tight text-gray-600">
                                Technician Login
                            </h2>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-500">
                                Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="text"
                                    required
                                    className="px-2 outline-none border-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6"
                                onChange={(e) => {
                                    updateFormData({...formData, [e.target.name]:e.target.value});
                                 }}
                                />
                            </div>
                        </div>

                        <div>

                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-500">
                                Phone Number
                            </label>


                            <div className="mt-2">
                                <input
                                    id="phone_number"
                                    name="phone_number"
                                    type="text"
                                    autoComplete="text"
                                    required
                                    className="px-2 outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6"
                                    onChange={(e) => {
                                        updateFormData({...formData, [e.target.name]:e.target.value});
                                     }}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-[#18185d] px-3 py-1.5 transition duration-150 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#2b2b74] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                             onClick={handleSubmit}
                            >
                                Sign in
                            </button>
                        </div>
                        {/* Renders only if Login credentials are incorrect */}
                         {incorrectCredential && (
                                    <div className='text-black text-center'>Incorrect Login credentials</div>
                                )} 
                    </form>

                    {/* <p className="mt-10 text-center text-sm text-white">
                                New member?{' '}
                                <a href="/register" className="font-semibold leading-6 text-[#e09758] hover:text-[#e09740]">
                                    Register Now
                                </a>
                            </p> */}

                </div>
            </div>
        </div>
    )
}

export default AdminLogin