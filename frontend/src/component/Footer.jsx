import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-6 font-sans">
      <div className="container mx-auto px-4 md:px-10 lg:px-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        
        {/* Column 1: Exclusive */}
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold tracking-wide mb-2">Exclusive</h2>
          <h3 className="text-lg font-medium">Subscribe</h3>
          <p className="text-sm font-light">Get 10% off your first order</p>
          <div className="relative mt-2 w-full max-w-[250px]">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-black border border-white text-white text-sm rounded py-2.5 pl-4 pr-10 w-full focus:outline-none placeholder-gray-400"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>

        {/* Column 2: Support */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-medium mb-2">Support</h3>
          <p className="text-sm font-light leading-relaxed">
            111 Bijoy sarani, Dhaka,<br/>
            DH 1515, Bangladesh.
          </p>
          <a href="mailto:exclusive@gmail.com" className="text-sm font-light hover:underline mt-1">exclusive@gmail.com</a>
          <a href="tel:+88015888889999" className="text-sm font-light hover:underline">+88015-88888-9999</a>
        </div>

        {/* Column 3: Account */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-medium mb-2">Account</h3>
          <a href="#" className="text-sm font-light hover:underline">My Account</a>
          <a href="#" className="text-sm font-light hover:underline">Login / Register</a>
          <a href="#" className="text-sm font-light hover:underline">Cart</a>
          <a href="#" className="text-sm font-light hover:underline">Wishlist</a>
          <a href="#" className="text-sm font-light hover:underline">Shop</a>
        </div>

        {/* Column 4: Quick Link */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-medium mb-2">Quick Link</h3>
          <a href="#" className="text-sm font-light hover:underline">Privacy Policy</a>
          <a href="#" className="text-sm font-light hover:underline">Terms Of Use</a>
          <a href="#" className="text-sm font-light hover:underline">FAQ</a>
          <a href="#" className="text-sm font-light hover:underline">Contact</a>
        </div>

        {/* Column 5: Download App */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-medium mb-2">Download App</h3>
          <p className="text-[13px] font-light text-gray-400">Save $3 with App New User Only</p>
          
          <div className="flex gap-3 items-center">
            {/* QR Code (Replace src with your actual QR code image path) */}
            <div className="w-[80px] h-[80px]">
               <img 
                 src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" 
                 alt="QR Code" 
                 className="w-full h-full object-contain bg-white p-1 rounded-sm" 
               />
            </div>
            {/* App Store Buttons */}
            <div className="flex flex-col gap-2">
               <img 
                 src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                 alt="Get it on Google Play" 
                 className="w-28 h-auto cursor-pointer" 
               />
               <img 
                 src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" 
                 alt="Download on the App Store" 
                 className="w-28 h-auto cursor-pointer" 
               />
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex gap-6 mt-4 text-white">
            <a href="#" className="hover:text-gray-400 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="#" className="hover:text-gray-400 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
            </a>
            <a href="#" className="hover:text-gray-400 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="#" className="hover:text-gray-400 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Line */}
      <div className="border-t border-[#1F1F1F] mt-16 pt-6">
        <p className="text-center text-[14px] font-light text-[#3C3C3C] flex items-center justify-center gap-1.5">
          <span className="text-lg">©</span> Copyright Rimel 2022. All right reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;