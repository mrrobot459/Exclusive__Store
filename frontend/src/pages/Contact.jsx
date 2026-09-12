import React from 'react';
import { FiPhone, FiMail } from 'react-icons/fi';

const Contact = () => {
  return (
    <div className="max-w-[1170px] mx-auto px-5 py-10 pb-20 font-sans text-black">
      {/* Breadcrumb */}
      <div className="mb-[60px] text-sm">
        <span className="text-gray-500 cursor-pointer hover:underline">Home</span> /{' '}
        <span className="text-black">Contact</span>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Left Side: Contact Information */}
        <div className="w-full md:w-[340px] shrink-0 bg-white px-9 py-10 rounded shadow-[0_1px_13px_rgba(0,0,0,0.05)]">
          
          {/* Call To Us Section */}
          <div>
            <div className="flex items-center gap-4 mb-5">
              <div className="flex items-center justify-center w-10 h-10 bg-[#db4444] rounded-full text-white">
                <FiPhone className="text-xl" />
              </div>
              <h3 className="m-0 text-base font-medium">Call To Us</h3>
            </div>
            <div className="text-sm leading-relaxed">
              <p className="m-0 mb-4">We are available 24/7, 7 days a week.</p>
              <p className="m-0">Phone: +8801611112222</p>
            </div>
          </div>
          
          <hr className="border-t border-black/30 my-[30px]" />
          
          {/* Write To Us Section */}
          <div>
            <div className="flex items-center gap-4 mb-5">
              <div className="flex items-center justify-center w-10 h-10 bg-[#db4444] rounded-full text-white">
                <FiMail className="text-xl" />
              </div>
              <h3 className="m-0 text-base font-medium">Write To US</h3>
            </div>
            <div className="text-sm leading-relaxed">
              <p className="m-0 mb-4">Fill out our form and we will contact you within 24 hours.</p>
              <p className="m-0 mb-4">Emails: customer@exclusive.com</p>
              <p className="m-0">Emails: support@exclusive.com</p>
            </div>
          </div>

        </div>

        {/* Right Side: Contact Form */}
        <div className="flex-1 w-full bg-white p-6 md:p-10 rounded shadow-[0_1px_13px_rgba(0,0,0,0.05)]">
          <form className="flex flex-col" onSubmit={(e) => e.preventDefault()}>
            
            {/* Input Row */}
            <div className="flex flex-col md:flex-row gap-4 mb-[30px] w-full">
              <input 
                type="text" 
                placeholder="Your Name *" 
                required 
                className="flex-1 h-[50px] bg-[#f5f5f5] border-none rounded px-4 py-3 text-[15px] outline-none text-black placeholder:text-gray-500 focus:ring-1 focus:ring-gray-300 transition-all"
              />
              <input 
                type="email" 
                placeholder="Your Email *" 
                required 
                className="flex-1 h-[50px] bg-[#f5f5f5] border-none rounded px-4 py-3 text-[15px] outline-none text-black placeholder:text-gray-500 focus:ring-1 focus:ring-gray-300 transition-all"
              />
              <input 
                type="tel" 
                placeholder="Your Phone *" 
                required 
                className="flex-1 h-[50px] bg-[#f5f5f5] border-none rounded px-4 py-3 text-[15px] outline-none text-black placeholder:text-gray-500 focus:ring-1 focus:ring-gray-300 transition-all"
              />
            </div>
            
            {/* Textarea Row */}
            <div className="flex w-full mb-[30px]">
              <textarea 
                placeholder="Your Message" 
                required
                className="w-full h-[200px] resize-y bg-[#f5f5f5] border-none rounded px-4 py-3 text-[15px] outline-none text-black placeholder:text-gray-500 focus:ring-1 focus:ring-gray-300 transition-all"
              ></textarea>
            </div>
            
            {/* Submit Button */}
            <div className="flex justify-end">
              <button 
                type="submit" 
                className="bg-[#db4444] text-white border-none rounded px-12 py-4 text-base font-medium cursor-pointer transition-colors duration-300 hover:bg-[#c93838]"
              >
                Send Message
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;