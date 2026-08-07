import React from 'react';
import { Bell, User, Menu } from 'lucide-react';

export default function Header() {
  return (
    <div className="flex justify-between items-center p-5 border-b border-neutral-900 bg-black">
      <h1 className="text-lg font-black tracking-widest text-white">CAREENICS</h1>
      <div className="flex items-center gap-4 text-neutral-400">
        <Bell className="w-5 h-5 cursor-pointer hover:text-white transition" />
        <User className="w-5 h-5 cursor-pointer hover:text-white transition" />
        <Menu className="w-5 h-5 cursor-pointer hover:text-white transition" />
      </div>
    </div>
  );
}