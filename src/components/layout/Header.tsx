'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useProjects } from '@/context/ProjectContext';
import { Search, User, Compass, MapPin, PlusCircle, Sparkles, LayoutDashboard, Trophy, BookOpen, MessageSquare } from 'lucide-react';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { campusMode, setCampusMode } = useProjects();
  const [searchQuery, setSearchQuery] = useState('');

  const isActive = (path: string) => pathname === path;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/browse?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-6 border-b-2 border-ink/10 mb-8" data-purpose="navigation-header">
      {/* Brand / Logo */}
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto justify-between sm:justify-start">
        <Link href="/" className="flex items-center gap-3 group text-decoration-none">
          <div className="w-10 h-12 flex items-center justify-center relative transform group-hover:scale-105 transition-transform">
            {/* Tombstone Sketch Icon with Book */}
            <svg className="w-10 h-12 text-ink fill-none stroke-current" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 40 48">
              <path d="M 8 45 L 8 18 C 8 8, 32 8, 32 18 L 32 45"></path>
              <path d="M 4 45 L 36 45"></path>
              <path d="M 15 26 C 18 24, 20 25, 20 28 C 20 25, 22 24, 25 26 L 25 33 C 22 31, 20 32, 20 34 C 20 32, 18 31, 15 33 Z" strokeWidth="1.8"></path>
              <path d="M 20 28 L 20 34" strokeWidth="1.8"></path>
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-hand text-3xl font-bold tracking-wide text-ink pt-1 leading-tight">
              Digital Graveyard
            </span>
            <span className="text-[10px] font-mono tracking-widest text-ink/60 uppercase -mt-1">
              {campusMode ? 'Campus Edition (.edu)' : 'Open Archive'}
            </span>
          </div>
        </Link>

        {/* Campus Scope Toggle Button */}
        <button
          onClick={() => setCampusMode(!campusMode)}
          className={`sketch-btn px-3 py-1 text-xs font-mono flex items-center gap-1.5 transition-colors ${
            campusMode ? 'bg-ink text-paper' : 'hover:bg-paper-dark'
          }`}
          title="Toggle between Campus and Global Graveyard views"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{campusMode ? 'Campus Mode ON' : 'Switch to Campus'}</span>
        </button>
      </div>

      {/* Center Navigation Links */}
      <nav className="flex items-center gap-4 md:gap-6 font-hand text-2xl text-ink">
        <Link 
          href="/browse" 
          className={`relative pb-1 tracking-wide hover:opacity-80 transition-opacity flex items-center gap-1 ${isActive('/browse') ? 'font-bold' : ''}`}
        >
          <Compass className="w-5 h-5 hidden sm:inline" />
          <span>Collections</span>
          {isActive('/browse') && <span className="absolute left-0 right-0 -bottom-1 h-0.5 bg-ink rounded-full" />}
        </Link>

        <Link 
          href="/browse/map" 
          className={`relative pb-1 tracking-wide hover:opacity-80 transition-opacity flex items-center gap-1 ${isActive('/browse/map') ? 'font-bold' : ''}`}
        >
          <MapPin className="w-5 h-5 hidden sm:inline" />
          <span>Map</span>
          {isActive('/browse/map') && <span className="absolute left-0 right-0 -bottom-1 h-0.5 bg-ink rounded-full" />}
        </Link>

        <Link 
          href="/workbench" 
          className={`relative pb-1 tracking-wide hover:opacity-80 transition-opacity flex items-center gap-1 ${isActive('/workbench') ? 'font-bold' : ''}`}
        >
          <BookOpen className="w-5 h-5 hidden sm:inline" />
          <span>Workbench</span>
          {isActive('/workbench') && <span className="absolute left-0 right-0 -bottom-1 h-0.5 bg-ink rounded-full" />}
        </Link>

        <Link 
          href="/submit" 
          className={`relative pb-1 tracking-wide hover:opacity-80 transition-opacity flex items-center gap-1 ${isActive('/submit') ? 'font-bold' : ''}`}
        >
          <PlusCircle className="w-5 h-5 hidden sm:inline" />
          <span>Submit</span>
          {isActive('/submit') && <span className="absolute left-0 right-0 -bottom-1 h-0.5 bg-ink rounded-full" />}
        </Link>

        <Link 
          href="/dashboard" 
          className={`relative pb-1 tracking-wide hover:opacity-80 transition-opacity flex items-center gap-1 ${isActive('/dashboard') ? 'font-bold' : ''}`}
        >
          <LayoutDashboard className="w-5 h-5 hidden sm:inline" />
          <span>Dashboard</span>
          {isActive('/dashboard') && <span className="absolute left-0 right-0 -bottom-1 h-0.5 bg-ink rounded-full" />}
        </Link>

        <Link 
          href="/leaderboard" 
          className={`relative pb-1 tracking-wide hover:opacity-80 transition-opacity flex items-center gap-1 ${isActive('/leaderboard') ? 'font-bold' : ''}`}
        >
          <Trophy className="w-5 h-5 hidden sm:inline" />
          <span>Leaderboard</span>
          {isActive('/leaderboard') && <span className="absolute left-0 right-0 -bottom-1 h-0.5 bg-ink rounded-full" />}
        </Link>
      </nav>

      {/* Search and Profile Area */}
      <div className="flex items-center gap-4 w-full lg:w-auto justify-end">
        {/* Search Input Box */}
        <form onSubmit={handleSearchSubmit} className="relative flex-1 sm:w-48 lg:w-52">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search artifacts..."
            className="w-full pl-9 pr-4 py-1.5 sketch-input text-ink placeholder-gray-500 font-sans text-sm focus:outline-none focus:ring-1 focus:ring-ink"
          />
        </form>

        {/* User Profile Shortcut */}
        <Link
          href="/profile/usr_alex_mercer"
          aria-label="Archivist Profile"
          className="w-10 h-10 flex items-center justify-center rounded-full sketch-btn hover:bg-paper-dark transition-colors shrink-0"
          title="Archaeologist Profile (Alex Mercer)"
        >
          <User className="w-5 h-5 text-ink" />
        </Link>
      </div>
    </header>
  );
};
