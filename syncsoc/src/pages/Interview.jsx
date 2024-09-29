import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux'; // Assuming you're using Redux for user management

const InterviewPage = () => {
    const [isSociety, setIsSociety] = useState(false);
    const [interviews, setInterviews] = useState([]);
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');

    const user = useSelector(state => state.auth.user); // Replace with actual state management logic

    useEffect(() => {
        // Check if logged in user is a society
        if (user?.role === 'society') {
            setIsSociety(true);
            fetchSocietyInterviews();
        } else {
            fetchUserInterviews();
        }
    }, [user]);

    const fetchSocietyInterviews = async () => {
        try {
            const response = await axios.get(`/interview/interview_schedule/${user.name}`);
            setInterviews(response.data);
        } catch (error) {
            setError('Error fetching interviews for society');
        }
    };

    const fetchUserInterviews = async () => {
        try {
            const response = await axios.get(`/interview/interview-time`);
            setInterviews(response.data);
        } catch (error) {
            setError('Error fetching user interviews');
        }
    };

    const handleFileUpload = async (e) => {
        const formData = new FormData();
        formData.append('file', e.target.files[0]);
        setFile(e.target.files[0]);

        try {
            await axios.post('/interview/upload', formData);
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
            {isSociety ? (
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

                    <table className="min-w-full table-auto bg-white border-collapse border border-[#4e362a] rounded-lg">
                        <thead className="bg-[#c1a492]">
                            <tr>
                                <th className="px-4 py-2 border border-[#4e362a] text-[#4e362a]">Name</th>
                                <th className="px-4 py-2 border border-[#4e362a] text-[#4e362a]">Roll No</th>
                                <th className="px-4 py-2 border border-[#4e362a] text-[#4e362a]">Time of Interview</th>
                            </tr>
                        </thead>
                        <tbody>
                            {interviews.map((interview, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-2 border border-[#4e362a]">{interview.name}</td>
                                    <td className="px-4 py-2 border border-[#4e362a]">{interview.rollNo}</td>
                                    <td className="px-4 py-2 border border-[#4e362a]">
                                        {new Date(interview.timeOfInterview).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                // User View
                <div>
                    <table className="min-w-full table-auto bg-white border-collapse border border-[#4e362a] rounded-lg">
                        <thead className="bg-[#c1a492]">
                            <tr>
                                <th className="px-4 py-2 border border-[#4e362a] text-[#4e362a]">Society</th>
                                <th className="px-4 py-2 border border-[#4e362a] text-[#4e362a]">Time</th>
                                <th className="px-4 py-2 border border-[#4e362a] text-[#4e362a]">Venue</th>
                            </tr>
                        </thead>
                        <tbody>
                            {interviews.map((interview, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-2 border border-[#4e362a]">{interview.society}</td>
                                    <td className="px-4 py-2 border border-[#4e362a]">
                                        {new Date(interview.timeOfInterview).toLocaleString()}
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
