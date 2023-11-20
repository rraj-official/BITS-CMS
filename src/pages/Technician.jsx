import React from 'react'

// Sample User data
const userData = [
    {
        id: 762354,
        name: "Rohit Raj",
        category: "Maintenance",
        subcategory: "Carpentry",
        status: "Completed",
        // We need to restrict the description or else it will cause rendering issues
        description: "The door is not closing fully. I have had this issue for a while now. The door stopper is also missing. Please send someone asap.",
        date: "30 Sep 2023 11:23:50 AM",
        attendant: "Carpenter Admin",
        remarks: "Fixed"
    }
];

const Technician = () => {
    return (
        <div className='bg-[#f6f8f9] pt-5'>
            <h2 className="mt-10 mb-10 text-center text-2xl leading-9 tracking-tight text-gray-600">
                Technician Name
            </h2>
            <div className="relative overflow-x-auto px-10">
                <table className="w-full text-sm text-left text-black dark:text-[#18185d]">
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

export default Technician