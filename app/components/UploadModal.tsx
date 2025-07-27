import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Box,
  Typography,
  LinearProgress,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';

interface UploadModalProps {
  open: boolean;
  onClose: () => void;
  selectedFiles: File[];
  setSelectedFiles: React.Dispatch<React.SetStateAction<File[]>>;
  onUploadConfirm: () => void;
  uploading: boolean;
  uploadProgress: number;
}

const UploadModal: React.FC<UploadModalProps> = ({
  open,
  onClose,
  selectedFiles,
  setSelectedFiles,
  onUploadConfirm,
  uploading,
  uploadProgress,
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      setSelectedFiles((prev) => [...prev, ...acceptedFiles]);
    },
  });

  const handleManualFilePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  return (
    <Dialog open={open} onClose={!uploading ? onClose : undefined} maxWidth="sm" fullWidth>
      <DialogTitle>
        Upload Files
        <IconButton
          aria-label="close"
          onClick={onClose}
          disabled={uploading}
          sx={{ position: 'absolute', right: 8, top: 8, color: 'grey.500' }}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Box
          {...getRootProps()}
          sx={{
            border: '2px dashed #ccc',
            borderRadius: '12px',
            p: 4,
            textAlign: 'center',
            cursor: 'pointer',
            bgcolor: isDragActive ? '#f5eee2' : 'transparent',
            transition: '0.2s',
          }}
        >
          <input {...getInputProps()} disabled={uploading} />
          <Typography variant="body1" color="textSecondary">
            {isDragActive
              ? 'Drop the files here...'
              : 'Drag & drop files here, or click to select'}
          </Typography>
        </Box>

        <Box mt={2}>
          <Button
            variant="contained"
            component="label"
            sx={{ bgcolor: '#dcb98d', color: '#2e2e2e', '&:hover': { bgcolor: '#cfa977' } }}
            disabled={uploading}
          >
            Choose from device
            <input type="file" hidden multiple onChange={handleManualFilePick} />
          </Button>
        </Box>

        {selectedFiles.length > 0 && (
          <Box mt={3}>
            <Typography variant="subtitle1" fontWeight="500" gutterBottom>
              Files to upload:
            </Typography>
            <ul style={{ maxHeight: '140px', overflowY: 'auto', paddingLeft: '1rem' }}>
              {selectedFiles.map((file, i) => (
                <li key={i}>{file.name}</li>
              ))}
            </ul>
          </Box>
        )}

        {uploading && (
          <Box mt={3}>
            <Typography variant="body2" gutterBottom>
              Uploading...
            </Typography>
            <LinearProgress
              variant="determinate"
              value={uploadProgress}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: '#f1e3d3',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: '#dcb98d',
                },
              }}
            />
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
          disabled={uploading}
          className="bg-[#2e2e2e]"
          sx={{
            color: '#f4e3c1 !important',        // force beige text color
            backgroundColor: '#2e2e2e',
            '&:hover': {
              backgroundColor: '#1f1f1f',
            },
            '&.Mui-disabled': {
              color: '#a9a9a9', // Optional: light gray text when disabled
            },
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={onUploadConfirm}
          disabled={selectedFiles.length === 0 || uploading}
          sx={{ bgcolor: '#dcb98d', color: '#2e2e2e', '&:hover': { bgcolor: '#cfa977' } }}
        >
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadModal;

// 'use client';
// import React, { useState } from 'react';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   IconButton,
//   Box,
//   Typography,
//   LinearProgress,
// } from '@mui/material';
// import { Close } from '@mui/icons-material';
// import { useDropzone } from 'react-dropzone';
// import { toast } from 'react-toastify';

// interface UploadModalProps {
//   open: boolean;
//   onClose: () => void;
//   selectedFiles: File[];
//   setSelectedFiles: React.Dispatch<React.SetStateAction<File[]>>;
//   onUploadConfirm: () => void;
// }

// const UploadModal: React.FC<UploadModalProps> = ({
//   open,
//   onClose,
//   selectedFiles,
//   setSelectedFiles,
//   onUploadConfirm,
// }) => {
//   const [uploading, setUploading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop: (acceptedFiles: File[]) => {
//       setSelectedFiles((prev) => [...prev, ...acceptedFiles]);
//     },
//   });

//   const handleManualFilePick = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(e.target.files || []);
//     setSelectedFiles((prev) => [...prev, ...files]);
//   };

//   const simulateUpload = () => {
//     setUploading(true);
//     setUploadProgress(0);

//     const interval = setInterval(() => {
//       setUploadProgress((prev) => {
//         if (prev >= 100) {
//           clearInterval(interval);
//           toast.success('Files uploaded successfully!');
//           onUploadConfirm();
//           setUploading(false);
//           return 100;
//         }
//         return prev + 10;
//       });
//     }, 200);
//   };

//   const handleClose = () => {
//     if (!uploading) {
//       setSelectedFiles([]);
//       onClose();
//     }
//   };

//   return (
//     <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
//       <DialogTitle>
//         Upload Files
//         <IconButton
//           aria-label="close"
//           onClick={handleClose}
//           disabled={uploading}
//           sx={{ position: 'absolute', right: 8, top: 8, color: 'grey.500' }}
//         >
//           <Close />
//         </IconButton>
//       </DialogTitle>

//       <DialogContent dividers>
//         <Box
//           {...getRootProps()}
//           sx={{
//             border: '2px dashed #ccc',
//             borderRadius: '12px',
//             p: 4,
//             textAlign: 'center',
//             cursor: 'pointer',
//             bgcolor: isDragActive ? '#f0f8ff' : 'transparent',
//             transition: '0.2s',
//           }}
//         >
//           <input {...getInputProps()} disabled={uploading} />
//           <Typography variant="body1" color="textSecondary">
//             {isDragActive
//               ? 'Drop the files here...'
//               : 'Drag & drop files here, or click to select'}
//           </Typography>
//         </Box>

//         <Box mt={2}>
//           <Button variant="contained" component="label" color="warning" disabled={uploading}>
//             Choose from device
//             <input type="file" hidden multiple onChange={handleManualFilePick} />
//           </Button>
//         </Box>

//         {selectedFiles.length > 0 && (
//           <Box mt={3}>
//             <Typography variant="subtitle1" fontWeight="500" gutterBottom>
//               Files to upload:
//             </Typography>
//             <ul
//               style={{
//                 maxHeight: '140px',
//                 overflowY: 'auto',
//                 paddingLeft: '1rem',
//               }}
//             >
//               {selectedFiles.map((file, i) => (
//                 <li key={i}>{file.name}</li>
//               ))}
//             </ul>
//           </Box>
//         )}

//         {uploading && (
//           <Box mt={3}>
//             <Typography variant="body2" gutterBottom>
//               Uploading...
//             </Typography>
//             <LinearProgress variant="determinate" value={uploadProgress} />
//           </Box>
//         )}
//       </DialogContent>

//       <DialogActions>
//         <Button onClick={handleClose} disabled={uploading}>
//           Cancel
//         </Button>
//         <Button
//           variant="contained"
//           color="primary"
//           disabled={selectedFiles.length === 0 || uploading}
//           onClick={simulateUpload}
//         >
//           Upload
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default UploadModal;
