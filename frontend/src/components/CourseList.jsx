import React, { useState, useEffect } from 'react';

const CourseList = ({ onSelectCourse }) => {
  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCourses(filter);
  }, [filter]);

  const fetchCourses = async (category) => {
    let url = 'http://localhost:5000/api/courses';
    if (category === 'running') url = 'http://localhost:5000/api/courses/running';
    if (category === 'offers') url = 'http://localhost:5000/api/courses/offers';

    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) setCourses(data.data);
    } catch (err) {
      console.error("Error fetching courses:", err);
    }
  };

  const filteredCourses = courses.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full max-w-md mx-auto pb-24 text-white">
      {/* সার্চবার (PDF UI) */}
      <div className="relative my-4">
        <input 
          type="text" 
          placeholder="Search courses"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white text-black py-2.5 px-4 pr-10 rounded-full text-sm outline-none shadow-md placeholder-gray-500"
        />
        <span className="absolute right-4 top-2.5 text-gray-500">🔍</span>
      </div>

      {/* ক্যাটাগরি পিলস (PDF UI Style + New Filters) */}
      <div className="flex gap-2 overflow-x-auto py-2 mb-4 no-scrollbar items-center">
        <span className="text-xs text-gray-400 font-semibold">Category:</span>
        <button 
          onClick={() => setFilter('all')}
          className={`px-3 py-1 rounded-full text-xs font-bold transition ${filter === 'all' ? 'bg-purple-300 text-purple-900' : 'bg-zinc-800 text-gray-300'}`}
        >
          ALL
        </button>
        <button 
          onClick={() => setFilter('running')}
          className={`px-3 py-1 rounded-full text-xs font-bold transition ${filter === 'running' ? 'bg-purple-300 text-purple-900' : 'bg-zinc-800 text-gray-300'}`}
        >
          🔥 RUNNING
        </button>
        <button 
          onClick={() => setFilter('offers')}
          className={`px-3 py-1 rounded-full text-xs font-bold transition ${filter === 'offers' ? 'bg-red-500 text-white' : 'bg-zinc-800 text-gray-300'}`}
        >
          🎁 OFFERS
        </button>
        <button className="px-3 py-1 rounded-full text-xs font-bold bg-zinc-800 text-gray-300">CSE</button>
        <button className="px-3 py-1 rounded-full text-xs font-bold bg-zinc-800 text-gray-300">EEE</button>
      </div>

      {/* কোর্স কার্ডের লিস্ট (PDF Dark Card Style) */}
      <div className="space-y-4">
        {filteredCourses.map((course, index) => (
          <div 
            key={course.id || index}
            onClick={() => onSelectCourse(course)}
            className={`p-5 rounded-2xl relative cursor-pointer shadow-lg transition transform active:scale-95 ${
              index % 2 === 0 ? 'bg-indigo-900/60 border border-indigo-700/50' : 'bg-emerald-950/70 border border-emerald-800/50'
            }`}
          >
            {course.is_offer && (
              <span className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full animate-pulse">
                OFFER
              </span>
            )}

            <h3 className="text-lg font-bold text-white mb-1">{course.title}</h3>
            <p className="text-xs text-gray-300 mb-4">{course.code || course.description || 'MIS 4181'}</p>

            {/* সার্কুলার প্রোগ্রেস / প্রাইজ ব্যাজ (PDF Style) */}
            <div className="flex justify-between items-center mt-2">
              <div className="w-12 h-12 rounded-full border-4 border-white/20 border-t-white flex items-center justify-center text-xs font-bold">
                75%
              </div>
              <div className="text-right">
                {course.is_offer ? (
                  <div>
                    <span className="text-xs line-through text-gray-400 block">${course.original_price}</span>
                    <span className="text-lg font-extrabold text-green-400">${course.discount_price}</span>
                  </div>
                ) : (
                  <span className="text-lg font-extrabold text-white">${course.original_price || course.price || '500'}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;