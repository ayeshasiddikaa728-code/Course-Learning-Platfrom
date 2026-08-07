import React from 'react';
import { BookOpen, Book, Award, Settings } from 'lucide-react';

export default function BottomNav({ activeTab, setActiveTab }) {
  const items = [
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'ebooks', label: 'eBooks', icon: Book },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white text-neutral-900 py-3 border-t border-neutral-200 flex justify-around items-center z-50">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-0.5 ${
              isActive ? 'text-emerald-600 font-bold' : 'text-neutral-500'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px]">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}