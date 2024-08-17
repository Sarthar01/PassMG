import React from 'react';

const Navbar = () => {
    return (
        <nav className='flex justify-between items-center p-4 px-12 shadow-lg' style={{ backgroundColor: 'rgba(58, 95, 161, 0.83)' }}>
            <div className="logo flex font-bold text-white items-center">
                <span className='text-black text-2xl'>&lt;</span>
                <p className="text-blue-50 text-3xl tracking-wide flex items-center">
                    Pass<span className="ml-1 text-black">MG</span>
                </p>
                <span className='text-black text-2xl ml-1'>/&gt;</span>
            </div>
            <ul className='flex gap-8'>
                <li><a href="/" className="text-white hover:text-blue-200 transition-colors duration-200">Home</a></li>
                <li><a href="#" className="text-white hover:text-blue-200 transition-colors duration-200">Contact</a></li>
                <li><a href="#" className="text-white hover:text-blue-200 transition-colors duration-200">About</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;