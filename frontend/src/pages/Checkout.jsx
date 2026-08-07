import React from 'react';
import { ArrowLeft, CreditCard } from 'lucide-react';

export default function Checkout({ onBack }) {
  return (
    <div className="min-h-screen bg-black text-white p-5">
      <button onClick={onBack} className="mb-4">
        <ArrowLeft className="w-6 h-6 text-neutral-300" />
      </button>

      <h2 className="text-center font-bold text-base mb-6">Checkout</h2>

      <div className="bg-gradient-to-r from-blue-700 to-purple-700 p-5 rounded-2xl mb-6 space-y-6 shadow-xl">
        <div className="flex justify-between items-center">
          <span className="text-xs font-mono">Debit Card</span>
          <CreditCard className="w-6 h-6" />
        </div>
        <p className="text-sm tracking-widest font-mono">XXXX XXXX XXXX 1234</p>
      </div>

      <div className="border-t border-neutral-800 pt-4 space-y-3 text-xs text-neutral-400">
        <div className="flex justify-between">
          <span>Course Fee</span>
          <span>$500.00</span>
        </div>
        <div className="flex justify-between">
          <span>Platform Fee</span>
          <span>$45.00</span>
        </div>
        <div className="flex justify-between text-white font-bold text-sm pt-3 border-t border-neutral-800">
          <span>Total</span>
          <span>$545.00</span>
        </div>
      </div>

      <button className="w-full mt-8 py-3 bg-emerald-600 text-white text-xs font-bold rounded-full hover:bg-emerald-500 transition">
        Enroll Now
      </button>
    </div>
  );
}