import React, { useState, useEffect } from 'react';

const statuses = ["New", "Pending", "Completed", "To Attend"];

const StatusDropDown = (props) => {
    // Initialize state for selectedAttendant with the current state retrieved, the admin can change this
    const [selectedStatus, setSelectedStatus] = useState(props.currentStatus);

    useEffect(() => {
        setSelectedStatus(props.currentStatus);
    }, [props.currentStatus]);

    const handleStatusChange = (newStatus) => {
        setSelectedStatus(newStatus); // Update the local state
        props.handleStatusChange(newStatus);
        // props.handleStatusChange(newStatus, () => {
        //     setSelectedStatus(props.currentStatus); // Update the local state after the handleStatusChange function has finished
        // });
    };

    return (
        <div>
            <div className="max-w-full">
                <select
                    id="status"
                    name="status"
                    autoComplete="status-name"
                    className="cursor-pointer block w-full rounded-md border-0 py-1.5 px-0.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[#18185d] sm:max-w-xs sm:text-sm sm:leading-6"
                    value={selectedStatus}
                    onChange={(e) => handleStatusChange(e.target.value)}
                >
                    {/* Map through statuses array to generate options */}
                    {statuses.map((status) => (
                        <option key={status} value={status}>
                            {status}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default StatusDropDown;
