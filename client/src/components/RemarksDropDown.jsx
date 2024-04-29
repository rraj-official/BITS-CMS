import React, { useState, useEffect } from 'react';

const remarks = ["None", "Done", "Not Done"];

const RemarksDropDown = (props) => {
    // Initialize state for selectedRemark
    const [selectedRemark, setSelectedRemark] = useState(props.currentRemark);

    useEffect(() => {
        setSelectedRemark(props.currentRemark);
    }, [props.currentRemark]);

    const handleRemarkChange = (newRemark) => {
        setSelectedRemark(newRemark); // Update the local state
        props.handleRemarkChange(newRemark); // Call the handleAttendantChange function passed as a prop
    }

    return (
        <div>
            <div className="max-w-full">
                <select
                    id="attendant"
                    name="attendant"
                    autoComplete="attendant-name"
                    className="block w-full rounded-md border-0 py-1.5 px-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[#18185d] sm:max-w-xs sm:text-sm sm:leading-6"
                    value={selectedRemark}
                    onChange={(e) => handleRemarkChange(e.target.value)}
                >
                    {/* Map through remarks array to generate options */}
                    {remarks.map((remark) => (
                        <option key={remark} value={remark}>
                            {remark}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default RemarksDropDown