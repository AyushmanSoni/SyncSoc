import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InterviewPage = () => {
    const [isSociety, setIsSociety] = useState(false);
    const [interviews, setInterviews] = useState([]); // Ensure interviews is an array by default
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');

    const role = localStorage.getItem("role");

    useEffect(() => {
        // Check if logged in user is a society
        if (role === 'society') {
            setIsSociety(true);
            fetchSocietyInterviews();
        } else {
            fetchUserInterviews();
        }
    }, [role]);

    const fetchSocietyInterviews = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/interview/interview_schedule`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log(role);
            setInterviews(response.data || []); // Ensure we set an empty array if no data is returned
        } catch (error) {
            console.log(role);
            console.log(localStorage);
            setError('Error fetching interviews for society');
            setInterviews([]); // Set to empty array on error to prevent map() errors
        }
    };

    const fetchUserInterviews = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/interview/interview-time`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setInterviews(response.data || []); // Ensure it's an array
        } catch (error) {
            setError('Error fetching user interviews');
            setInterviews([]); // Set to empty array on error to prevent map() errors
        }
    };

    const handleFileUpload = async (e) => {
        const formData = new FormData();
        formData.append('file', e.target.files[0]);
        setFile(e.target.files[0]);

        try {
            await axios.post('http://localhost:5000/interview/upload', formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            fetchSocietyInterviews(); // Refresh the interview list
        } catch (err) {
            setError('File upload failed');
        }
    };

    return (
        <div className="container mx-auto py-10 px-4 bg-[#f8f4f1]">
            <h1 className="text-center text-3xl font-bold mb-5 text-[#4e362a]">Interviews</h1>

            {error && <p className="text-red-500 text-center">{error}</p>}

            {/* Society View */}
            {role === "society" && (
                <div>
                    {!file && (
                        <div className="mb-5">
                            <label className="block text-sm font-medium mb-2 text-[#4e362a]">
                                Upload Interview Schedule (Excel)
                            </label>
                            <input
                                type="file"
                                onChange={handleFileUpload}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring focus:border-[#683b2b]"
                            />
                        </div>
                    )}

                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto bg-white border-collapse border border-[#4e362a] rounded-lg">
                            <thead className="bg-[#c1a492]">
                                <tr>
                                    <th className="px-4 py-2 border border-[#4e362a] text-[#4e362a]">Name</th>
                                    <th className="px-4 py-2 border border-[#4e362a] text-[#4e362a]">Roll No</th>
                                    <th className="px-4 py-2 border border-[#4e362a] text-[#4e362a]">Time of Interview</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(interviews) && interviews.map((interview, index) => (
                                    <tr key={index}>
                                        <td className="px-4 py-2 border border-[#4e362a]">{interview.name}</td>
                                        <td className="px-4 py-2 border border-[#4e362a]">{interview.rollNo}</td>
                                        <td className="px-4 py-2 border border-[#4e362a]">
                                            {interview.timeOfInterview}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Member/User View */}
            {role === "member" && (
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto bg-white border-collapse border border-[#4e362a] rounded-lg">
                        <thead className="bg-[#c1a492]">
                            <tr>
                                <th className="px-4 py-2 border border-[#4e362a] text-[#4e362a]">Society</th>
                                <th className="px-4 py-2 border border-[#4e362a] text-[#4e362a]">Time</th>
                                <th className="px-4 py-2 border border-[#4e362a] text-[#4e362a]">Venue</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(interviews) && interviews.map((interview, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-2 border border-[#4e362a]">{interview.society}</td>
                                    <td className="px-4 py-2 border border-[#4e362a]">
                                        {interview.timeOfInterview}
                                    </td>
                                    <td className="px-4 py-2 border border-[#4e362a]">{interview.venue}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default InterviewPage;
