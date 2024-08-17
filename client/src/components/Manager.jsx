import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({ site: "", username: "", password: "" });
    const [passwords, setPasswords] = useState([]);
    const [visiblePasswordIndex, setVisiblePasswordIndex] = useState(null);
    const [isFormValid, setIsFormValid] = useState(false);
    const [shouldRefetch, setShouldRefetch] = useState(false);


    const getpassword = async () => {
        try {
            const data = await fetch('http://localhost:3000/');
            const pass = await data.json();
            setPasswords(pass);
        } catch (error) {
            console.error('Error fetching passwords:', error);
        }
    }

    useEffect(() => {
        getpassword()
        setShouldRefetch(false); // Reset refetch state
    }, [shouldRefetch]);


    useEffect(() => {
        setIsFormValid(form.site !== "" && form.username !== "" && form.password !== "");
    }, [form]);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const savePassword = async () => {
        if (!isFormValid) return;

        const newPassword = { ...form, id: uuidv4() };

        try {
            const res = await fetch('http://localhost:3000/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newPassword)
            });

            if (!res.ok) {
                throw new Error('Failed to save password');
            }

            setPasswords([...passwords, newPassword]);
            setForm({ site: "", username: "", password: "" });

            toast.success('Password saved successfully!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

        } catch (error) {
            console.error('Error saving password:', error);

            toast.error('Failed to save password!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    };



    const handleDelete = async (index) => {
        const passwordToDelete = passwords[index];

        try {
            const res = await fetch('http://localhost:3000/', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: passwordToDelete.id }) // Send the password ID in the body
            });

            if (!res.ok) {
                throw new Error('Failed to delete password');
            }

            // Remove the deleted password from the local state
            const updatedPasswords = passwords.filter((_, i) => i !== index);
            setPasswords(updatedPasswords);

            toast.success('Password deleted successfully!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

        } catch (error) {
            console.error('Error deleting password:', error);

            toast.error('Failed to delete password!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    };




    const toggleTablePasswordVisibility = (index) => {
        setVisiblePasswordIndex(visiblePasswordIndex === index ? null : index);
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            toast.success('Copied to clipboard!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }).catch((err) => {
            toast.error('Failed to copy!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        });
    };


    const handleEdit = async (index) => {
        const passwordToEdit = passwords[index];

        try {
            // First, delete the old password
            const deleteRes = await fetch('http://localhost:3000/', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: passwordToEdit.id }) // Send the password ID in the body
            });

            if (!deleteRes.ok) {
                throw new Error('Failed to delete the old password before editing');
            }

            // Set the form values to the selected password details
            setForm({
                site: passwordToEdit.site,
                username: passwordToEdit.username,
                password: passwordToEdit.password,
            });

            // Remove the old password from local state
            const updatedPasswords = passwords.filter((_, i) => i !== index);
            setPasswords(updatedPasswords);

        } catch (error) {
            console.error('Error editing password:', error);

            toast.error('Failed to edit password!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    };


    return (
        <>
        <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
        />
        
        <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24" style={{ background: 'radial-gradient(125% 125% at 50% 10%, #000 40%, #3386ee 100%)' }}></div>
        <div className="md:container mx-auto mt-10 w-full md:w-2/4">
            <motion.h1
                className="flex items-center text-4xl font-bold mb-4"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
            >
                <span className='text-white'>&lt;</span>
                <p className="text-blue-50 tracking-wide flex items-center">
                    Pass<span className="ml-1 text-white">MG</span>
                </p>
                <span className='text-white ml-1'>/&gt;</span>
            </motion.h1>
            <motion.p
                className="text-gray-300 text-lg mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
            >
                Your own Password Manager
            </motion.p>
            <div className="flex flex-col w-full space-y-4">
                <motion.input
                    onChange={handleChange}
                    value={form.site}
                    name='site'
                    type="text"
                    placeholder="Enter Site Url"
                    className="px-4 py-2 border border-gray-500 rounded bg-gray-700 text-white placeholder-gray-400"
                    whileFocus={{ scale: 1.05 }}
                    required
                />
                <div className="flex gap-4">
                    <motion.input
                        onChange={handleChange}
                        value={form.username}
                        name='username'
                        type="text"
                        placeholder="Username"
                        className="px-4 py-2 border border-gray-500 rounded w-1/2 bg-gray-700 text-white placeholder-gray-400"
                        whileFocus={{ scale: 1.05 }}
                        required
                    />
                    <div className="relative w-1/2">
                        <motion.input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            name='password'
                            value={form.password}
                            onChange={handleChange}
                            className="px-4 py-2 border border-gray-500 rounded w-full bg-gray-700 text-white placeholder-gray-400"
                            whileFocus={{ scale: 1.05 }}
                            required
                        />
                        <motion.span
                            className="absolute right-2 top-2 cursor-pointer text-gray-400 hover:text-gray-200"
                            onClick={togglePasswordVisibility}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1, duration: 0.5 }}
                            whileHover={{ scale: 1.1 }}
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </motion.span>
                    </div>
                </div>
                <motion.button
                    onClick={savePassword}
                    className={`mt-4 px-6 py-2 mx-auto flex gap-2 items-center justify-center bg-blue-500 text-white text-sm font-semibold rounded hover:bg-blue-600 transition duration-200 ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
                    whileHover={{ scale: isFormValid ? 1.05 : 1 }}
                    whileTap={{ scale: isFormValid ? 0.95 : 1 }}
                    disabled={!isFormValid}
                >
                    <lord-icon
                        src="https://cdn.lordicon.com/jgnvfzqg.json"
                        trigger="hover"
                    >
                    </lord-icon>
                    Save Password
                </motion.button>
            </div>
        </div>

        {passwords.length === 0 ? (
            <motion.p
                className="text-white text-center mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
            >
                No Passwords to show
            </motion.p>
        ) : (
            <div className="container mx-auto mt-10 w-full md:w-3/5">
                <motion.h2
                    className="text-2xl font-semibold text-white mb-4 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                >
                    Saved Passwords
                </motion.h2>
                <motion.div
                    className="max-h-[400px] overflow-y-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                >
                    <table className="w-full bg-gray-800 rounded-md overflow-hidden shadow-lg">
                        <thead style={{ backgroundColor: 'rgba(58, 95, 161, 0.83)' }}>
                            <tr>
                                <th className="text-white py-3 px-6 w-2/5">URL</th>
                                <th className="text-white py-3 px-4 w-1/4">Username</th>
                                <th className="text-white py-3 px-4 w-1/4">Password</th>
                                <th className="text-white py-3 px-4 w-1/4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-blue-900'>
                            {passwords.map((password, index) => (
                                <motion.tr
                                    key={index}
                                    className="hover:bg-blue-800"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.4 + index * 0.1, duration: 0.5 }}
                                >
                                    <td className="text-white py-3 px-6">
                                        <a href={password.site} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                                            {password.site}
                                        </a>
                                        <button
                                            className="ml-2 text-gray-300 hover:text-gray-100"
                                            onClick={() => copyToClipboard(password.site)}
                                        >
                                            <lord-icon
                                                    className="current-color"
                                                    trigger="hover"
                                                    src="https://media.lordicon.com/assets/icons/editor/copy.json"
                                                    style={{ width: '20px', height: '20px' }}  // Making the icon smaller
                                                >
                                                </lord-icon>
                                        </button>
                                    </td>
                                    <td className="text-white py-3 px-4">
                                        {password.username}
                                        <button
                                            className="ml-2 text-gray-300 hover:text-gray-100"
                                            onClick={() => copyToClipboard(password.username)}
                                        >
                                            <lord-icon
                                                    className="current-color"
                                                    trigger="hover"
                                                    src="https://media.lordicon.com/assets/icons/editor/copy.json"
                                                    style={{ width: '20px', height: '20px' }}  // Making the icon smaller
                                                >
                                                </lord-icon>
                                        </button>
                                    </td>
                                    <td className="text-white py-3 px-4">
                                        <div className="relative flex items-center">
                                            <span className="mr-2">{visiblePasswordIndex === index ? password.password : '********'}</span>
                                            <button
                                                className="ml-2 text-gray-300 hover:text-gray-100 text-sm py-1 px-2 "
                                                onClick={() => toggleTablePasswordVisibility(index)}
                                            >
                                                {visiblePasswordIndex === index ? 'Hide' : 'Show'}
                                            </button>
                                            <button
                                                className="ml-2 text-gray-300 hover:text-gray-100 p-1"
                                                onClick={() => copyToClipboard(password.password)}
                                            >
                                                <lord-icon
                                                    className="current-color"
                                                    trigger="hover"
                                                    src="https://media.lordicon.com/assets/icons/editor/copy.json"
                                                    style={{ width: '20px', height: '20px' }}  // Making the icon smaller
                                                >
                                                </lord-icon>
                                            </button>
                                        </div>
                                    </td>

                                    <td className="text-white py-3 px-4">
                                        <div className="relative flex">
                                            <button
                                                className="ml-2 text-gray-300 hover:text-gray-100"
                                                onClick={() => handleEdit(index)}
                                            >
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/wuvorxbv.json"
                                                    trigger="hover"
                                                    state="hover-line"
                                                    colors="primary:#ffffff,secondary:#66d7ee"
                                                    style={{ width: '25px', height: '25px' }}>
                                                </lord-icon>
                                            </button>
                                            <button
                                                className="ml-2 text-gray-300 hover:text-gray-100"
                                                onClick={() => handleDelete(index)}
                                            >
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/drxwpfop.json"
                                                    trigger="morph"
                                                    stroke="bold"
                                                    state="morph-trash-in"
                                                    colors="primary:#ffffff,secondary:#66d7ee"
                                                    style={{ width: '25px', height: '25px' }}>
                                                </lord-icon>
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </motion.div>
            </div>
        )}
    </>
    );
};

export default Manager;


