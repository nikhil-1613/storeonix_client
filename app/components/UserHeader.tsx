'use client';

import { Avatar } from '@mui/material';

export default function UserHeader() {
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    avatarUrl: '', // replace with actual avatar path or leave empty for initials
  };

  return (
    <div className="w-full mt-4 sm:mt-6 bg-[#f4e3c1] border border-[#e0d1b1] rounded-2xl px-4 sm:px-6 py-4 shadow-sm mb-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Text info */}
        <div className="flex flex-col text-center sm:text-left">
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-[#2e2e2e]">
            Welcome back, {user.name} 👋
          </h2>
          <p className="text-sm text-gray-700">{user.email}</p>
        </div>

        {/* Avatar */}
        <Avatar
          alt={user.name}
          src={user.avatarUrl}
          sx={{
            width: 48,
            height: 48,
            border: '2px solid #2e2e2e',
          }}
        />
      </div>
    </div>
  );
}
