import React from 'react';

export default function Certificates() {
  return (
    <div className="min-h-screen bg-black text-white p-5 pb-24">
      <h1 className="text-lg font-bold mb-6">Certificates</h1>

      <div className="p-5 bg-neutral-900 rounded-2xl border border-neutral-800 space-y-4">
        <h3 className="font-semibold text-xs text-neutral-200">Data Analytics with python</h3>
        <button className="w-full py-2.5 bg-purple-600 font-bold rounded-lg text-xs hover:bg-purple-700 transition">
          Download certificate
        </button>
      </div>
    </div>
  );
}