import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-[#0442B1] text-white py-4 mt-14">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
            <p className="text-sm">
                © {new Date().getFullYear()} Manggad. All rights reserved.
            </p>
            <div className="flex space-x-4">
                <a href="#" className="hover:underline">Privacy Policy</a>
                <a href="#" className="hover:underline">Terms of Service</a>
                <a href="#" className="hover:underline">Contact Us</a>
            </div>
        </div>
	</footer>
  )
}

export default Footer