'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Home,
  Delete,
  People,
  CloudUpload,
  Menu as MenuIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { IconButton } from '@mui/material';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { label: 'My Files', icon: <Home fontSize="small" />, href: '#' },
    { label: 'Shared', icon: <People fontSize="small" />, href: '#' },
    { label: 'Trash', icon: <Delete fontSize="small" />, href: '#' },
    { label: 'Upload', icon: <CloudUpload fontSize="small" />, href: '#' },
  ];

  const toggleDrawer = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="sm:hidden fixed top-4 left-4 z-50">
        <IconButton
          onClick={toggleDrawer}
          sx={{ backgroundColor: '#f4e3c1', color: '#2e2e2e' }}
        >
          <MenuIcon />
        </IconButton>
      </div>

      {/* Sidebar for Desktop */}
      <aside className="hidden sm:flex w-64 bg-[#fdf8f2] h-screen p-6 flex-col gap-6 text-[#2e2e2e] shadow-md">
        <h2 className="text-2xl font-bold px-2 mb-4">Storeonix</h2>
        {links.map(({ label, icon, href }) => (
          <Link
            key={label}
            href={href}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#f4e3c1] transition-colors font-medium"
          >
            {icon}
            <span>{label}</span>
          </Link>
        ))}
      </aside>

      {/* Drawer for Mobile */}
      <div
        className={`sm:hidden fixed top-0 left-0 h-full w-64 bg-[#fdf8f2] z-40 shadow-xl p-6 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Storeonix</h2>
          <IconButton onClick={toggleDrawer} sx={{ color: '#2e2e2e' }}>
            <CloseIcon />
          </IconButton>
        </div>
        {links.map(({ label, icon, href }) => (
          <Link
            key={label}
            href={href}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#f4e3c1] transition-colors font-medium text-[#2e2e2e]"
            onClick={() => setIsOpen(false)}
          >
            {icon}
            <span>{label}</span>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Sidebar;

// // components/SideBar.tsx
// 'use client';

// import Link from 'next/link';
// import { Home, Delete, People, CloudUpload } from '@mui/icons-material';

// const Sidebar = () => {
//   const links = [
//     { label: 'My Files', icon: <Home />, href: '#' },
//     { label: 'Shared', icon: <People />, href: '#' },
//     { label: 'Trash', icon: <Delete />, href: '#' },
//     { label: 'Upload', icon: <CloudUpload />, href: '#' },
//   ];

//   return (
//     <aside className="w-16 sm:w-64 bg-[#1A1A1D] h-screen p-4 hidden sm:flex flex-col gap-6 text-white shadow-lg">
//       <h2 className="text-lg font-semibold px-2 hidden sm:block">Storeonix</h2>
//       {links.map(({ label, icon, href }) => (
//         <Link
//           key={label}
//           href={href}
//           className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-[#2A2A2D] transition-colors"
//         >
//           {icon}
//           <span className="hidden sm:inline">{label}</span>
//         </Link>
//       ))}
//     </aside>
//   );
// };

// export default Sidebar;
