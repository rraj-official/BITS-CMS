import React from 'react'

const AdminLogin = () => {
    return (
        <div className='h-screen bg-[#f6f8f9]'>
            <div className="flex pt-20 flex-1 flex-col justify-center px-6 pb-10 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6">
                        <div>
                            <h2 className="mb-10 text-center text-2xl leading-9 tracking-tight text-gray-600">
                                Admin Login
                            </h2>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-500">
                                Username/Phone Number
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="px-2 outline-none border-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6"
                                // onChange={(e) => {
                                //     setUsernameLog(e.target.value);
                                // }}
                                />
                            </div>
                        </div>

                        <div>

                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-500">
                                Password
                            </label>


                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="px-2 outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6"
                                // onChange={(e) => {
                                //     setPasswordLog(e.target.value);
                                // }}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-[#18185d] px-3 py-1.5 transition duration-150 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#2b2b74] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            // onClick={login}
                            >
                                Sign in
                            </button>
                        </div>
                        {/* Renders only if Login credentials are incorrect */}
                        {/* {incorrectCredential && (
                                    <div className='text-white text-center'>Incorrect Login credentials</div>
                                )} */}
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