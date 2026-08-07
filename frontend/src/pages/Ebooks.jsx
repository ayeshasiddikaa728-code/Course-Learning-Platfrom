import React from 'react';

export default function Ebooks() {
  const books = [
    { title: 'Python', color: 'bg-yellow-600/20 text-yellow-400' },
    { title: 'Java', color: 'bg-red-600/20 text-red-400' },
    { title: 'C++', color: 'bg-blue-600/20 text-blue-400' },
    { title: 'Javascript', color: 'bg-yellow-500/20 text-yellow-300' },
    { title: 'R', color: 'bg-indigo-600/20 text-indigo-400' },
    { title: 'Swift', color: 'bg-orange-600/20 text-orange-400' },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-5 pb-24">
      <h1 className="text-lg font-bold mb-6">eBooks</h1>

      <div className="grid grid-cols-2 gap-4">
        {books.map((book) => (
          <div
            key={book.title}
            className="p-5 bg-neutral-900 rounded-2xl border border-neutral-800 flex flex-col items-center justify-center text-center cursor-pointer hover:border-purple-500 transition"
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-base mb-2 ${book.color}`}>
              {book.title[0]}
            </div>
            <h3 className="font-semibold text-xs">{book.title}</h3>
            <span className="text-[10px] text-neutral-500 mt-0.5">beginner</span>
          </div>
        ))}
      </div>
    </div>
  );
}