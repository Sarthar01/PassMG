import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-400 py-4 mt-8">
            <div className="container mx-auto text-center">
                <p className="text-sm mb-2">
                    Created with{' '}
                    <svg 
                        aria-label="heart icon" 
                        className="inline w-5 h-5 text-red-500" 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="currentColor" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path 
                            fillRule="evenodd" 
                            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
                            clipRule="evenodd" 
                        />
                    </svg>{' '}
                    by Your Sarthar
                </p>
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} All Yours. All rights reserved.
                </p>
                <p className="text-sm mt-2">
                    <a href="/privacy" className="hover:text-white">Privacy Policy</a>{' '}
                    |{' '}
                    <a href="/terms" className="hover:text-white">Terms of Service</a>
                </p>
            </div>
        </footer>
    );
}

export default Footer;
