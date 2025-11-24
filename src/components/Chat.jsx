/**
 *
 * @component
 * @returns {JSX.Element} A chat button that opens a small support chat window
 */

import React, { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 bg-white rounded-lg shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 text-white">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">Maria Angela</h3>{" "}
                <p className="text-sm text-orange-100">Admin Support</p>{" "}
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 rounded-full p-1 transition-colors"
              >
                {" "}
                <X className="w-5 h-5" />{" "}
              </button>{" "}
            </div>{" "}
          </div>
          <div className="p-4 bg-gray-50 h-64 overflow-y-auto">
            <div className="flex gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-semibold flex-shrink-0">
                M
              </div>
              <div className="bg-white rounded-lg rounded-tl-none p-3 shadow-sm max-w-[80%]">
                <p className="text-sm text-gray-700">
                  Halo, Ada yang bisa kami bantu?
                </p>
              </div>
            </div>

            <div className="flex justify-end mb-4">
              <div className="bg-orange-100 rounded-lg rounded-tr-none p-3 max-w-[80%]">
                <p className="text-sm text-gray-700">
                  Saya kesulitan mencari kopi
                </p>
              </div>
            </div>
          </div>
          <div className="p-3 bg-white border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Masukan Pesan Anda"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none"
              />
              <button className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-lg transition-colors">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-[#1D4ED8] hover:bg-orange-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 z-50"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>
    </>
  );
};

export default Chat;
