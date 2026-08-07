import React from 'react';

export default function CourseCard({ course, onClick }) {
  const progress = course.progress || 75;

  return (
    <div
      onClick={onClick}
      className="p-5 rounded-2xl border border-indigo-500/40 bg-indigo-950/40 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-400 transition"
    >
      <h2 className="text-base font-bold text-center">{course.co_title || course.title}</h2>
      <p className="text-[11px] text-neutral-400 mt-0.5">{course.code || 'MIS 4181'}</p>

      <div className="my-4 w-20 h-20 rounded-full border-4 border-indigo-500/30 border-t-indigo-500 flex items-center justify-center">
        <span className="text-sm font-extrabold">{progress}%</span>
      </div>
      <span className="text-[10px] text-neutral-400">Completed</span>
    </div>
  );
}