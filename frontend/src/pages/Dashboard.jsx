import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import CourseCard from '../components/CourseCard';
import { Search } from 'lucide-react';
import { fetchCourses } from '../services/api';

export default function Dashboard({ onSelectCourse }) {
  const [category, setCategory] = useState('BBA');
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses()
      .then((res) => setCourses(res.data))
      .catch(() => {
        setCourses([
          { id: 1, title: 'System Analysis & Design', code: 'MIS 4181', progress: 75 },
          { id: 2, title: 'Investment Banking', code: 'FIN 17189', progress: 60 },
        ]);
      });
  }, []);

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      <Header />

      <div className="p-5 space-y-5">
        <div className="relative">
          <input
            type="text"
            placeholder="Search courses"
            className="w-full bg-white text-black px-4 py-2.5 rounded-lg text-xs outline-none pr-9 font-medium"
          />
          <Search className="w-4 h-4 text-neutral-500 absolute right-3 top-3" />
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="text-neutral-500 text-[11px]">Category:</span>
          {['BBA', 'CSE', 'EEE'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs transition ${
                category === cat
                  ? 'bg-purple-600 text-white font-bold'
                  : 'bg-neutral-900 text-neutral-400 border border-neutral-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {courses.map((course) => (
            <CourseCard
              key={course.id || course.co_courseid}
              course={course}
              onClick={() => onSelectCourse(course.id || course.co_courseid)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}