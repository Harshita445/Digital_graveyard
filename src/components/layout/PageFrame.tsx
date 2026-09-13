import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface PageFrameProps {
  children: React.ReactNode;
}

export const PageFrame: React.FC<PageFrameProps> = ({ children }) => {
  return (
    <div className="min-h-screen p-3 sm:p-6 md:p-8 flex items-center justify-center font-sans antialiased bg-[#ede9df]">
      {/* Main Outer Frame */}
      <div 
        className="w-full max-w-[1380px] bg-paper sketch-border-outer p-6 sm:p-10 md:p-12 shadow-2xl relative min-h-[90vh] flex flex-col justify-between" 
        data-purpose="canvas-container"
      >
        <div>
          <Header />
          <main className="w-full">{children}</main>
        </div>
        <Footer />
      </div>
    </div>
  );
};
