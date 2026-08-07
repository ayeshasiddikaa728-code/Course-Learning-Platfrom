import React, { useState } from 'react';
import { ArrowLeft, Play } from 'lucide-react';
import Checkout from './Checkout';

export default function CourseDetail({ courseId, onBack }) {
  const [showCheckout, setShowCheckout] = useState(false);

  if (showCheckout) {
    return <Checkout onBack={() => setShowCheckout(false)} />;
  }

  return (
    <div className="min-h-screen bg-black text-white p-5 pb-24">
      <button onClick={onBack} className="mb-4">
        <ArrowLeft className="w-6 h-6 text-neutral-300" />
      </button>

      <h1 className="text-xl font-bold mb-4">Fundamentals of UI/UX design</h1>

      <div className="relative bg-neutral-900 rounded-xl overflow-hidden aspect-video flex items-center justify-center mb-6 border border-neutral-800">
        <Play className="w-12 h-12 text-white bg-black/60 p-3 rounded-full cursor-pointer" />
      </div>

      <div className="space-y-3 mb-8">
        <p className="text-xs text-neutral-400">Instructor: <span className="text-white font-medium">Tania Obregon</span></p>
        <p className="text-xs text-neutral-400 leading-relaxed">
          Master the fundamentals of user experience and interface architecture. Build interactive digital prototypes.
        </p>
      </div>

      <div className="fixed bottom-16 left-0 right-0 max-w-md mx-auto bg-neutral-900 border-t border-neutral-800 p-4 flex justify-between items-center px-6">
        <span className="text-xl font-bold">$500</span>
        <button
          onClick={() => setShowCheckout(true)}
          className="px-6 py-2 bg-purple-600 text-xs font-bold rounded-lg hover:bg-purple-700 transition"
        >
          Subscribe
        </button>
      </div>
    </div>
  );
}