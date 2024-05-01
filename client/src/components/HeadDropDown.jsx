import React, { useState } from 'react';

const complaintTypes = ["All", "New", "Pending",  "To Attend", "Completed",];

const HeadDropDown = (props) => {
    // Initialize state for selected complaint type
    // const [selectedComplaintType, setSelectedComplaintType] = useState(complaintTypes[0]);

    return (
        <div>
            <div className="max-w-full">
                <select
                    id="complaintType"
                    name="complaintType"
                    autoComplete="complaint-type"
                    className="cursor-pointer block w-full rounded-md border-0 py-1.5 px-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[#18185d] sm:max-w-xs sm:text-sm sm:leading-6"
                    value={props.selectedComplaintType}
                    onChange={(e) => {
                        props.setSelectedComplaintType(e.target.value);
                    }}
                >
                    {/* Map through complaintTypes array to generate options */}
                    {complaintTypes.map((complaintType) => (
                        <option key={complaintType} value={complaintType}>
                            {complaintType}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default HeadDropDown;
