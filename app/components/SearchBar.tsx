'use client';
import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

export default function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onSearch(newValue);
  };

  return (
    <TextField
      value={value}
      onChange={handleChange}
      placeholder="Search files..."
      size="small"
      fullWidth
      sx={{
        backgroundColor: '#f4e3c1',
        borderRadius: 2,
        maxWidth: '300px',
        '& .MuiOutlinedInput-root': {
          borderRadius: 2,
          backgroundColor: '#f4e3c1',
          '& fieldset': {
            borderColor: '#e0c59a',
          },
          '&:hover fieldset': {
            borderColor: '#d9b97e',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#cfa96a',
          },
        },
        '& input': {
          color: '#2e2e2e',
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon fontSize="small" sx={{ color: '#8a6f4d' }} />
          </InputAdornment>
        ),
      }}
    />
  );
}

// // components/SearchBar.tsx
// 'use client';
// import { InputAdornment, TextField } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';

// export default function SearchBar() {
//   return (
//     <TextField
//       placeholder="Search files..."
//       size="small"
//       fullWidth
//       sx={{
//         backgroundColor: '#fff',
//         borderRadius: 2,
//         maxWidth: '300px',
//         '& .MuiOutlinedInput-root': {
//           borderRadius: 2,
//         },
//       }}
//       InputProps={{
//         startAdornment: (
//           <InputAdornment position="start">
//             <SearchIcon fontSize="small" />
//           </InputAdornment>
//         ),
//       }}
//     />
//   );
// }
