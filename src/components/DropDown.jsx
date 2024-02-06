import React, { useState } from 'react';

const attendants = [null, "Carpentry Admin", "Plumbing Admin", "Electricity Admin", "Ramesh"];

const DropDown = () => {
    // Initialize state for selectedAttendant
    const [selectedAttendant, setSelectedAttendant] = useState(attendants[0]);

    return (
        <div>
            <div className="max-w-full">
                <select
                    id="attendant"
                    name="attendant"
                    autoComplete="attendant-name"
                    className="block w-full rounded-md border-0 py-1.5 px-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[#18185d] sm:max-w-xs sm:text-sm sm:leading-6"
                    value={selectedAttendant}
                    onChange={(e) => {
                        setSelectedAttendant(e.target.value);
                    }}
                >
                    {/* Map through attendants array to generate options */}
                    {attendants.map((attendant) => (
                        <option key={attendant} value={attendant}>
                            {attendant}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default DropDown;
