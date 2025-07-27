
'use client';

import Sidebar from '@/components/SideBar';
import FileGrid from '@/components/FileGrid';
import Loader from '@/components/Loader';
import SearchBar from '@/components/SearchBar';
import UploadModal from '@/components/UploadModal';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

import {
  Menu,
  MenuItem,
  IconButton,
  Avatar
} from '@mui/material';
import { Upload, MoreVert } from '@mui/icons-material';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState<{ name: string; url: string }[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [filteredFiles, setFilteredFiles] = useState<{ name: string; url: string }[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const open = Boolean(anchorEl);

  useEffect(() => {
    setTimeout(() => {
      setFiles([
        { name: 'Document.pdf', url: '#' },
        { name: 'Resume.docx', url: '#' },
        { name: 'Photo.png', url: '/' },
        { name: 'Design.fig', url: '#' },
        { name: 'Data.csv', url: '#' },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const handleUploadClick = () => {
    setIsUploadModalOpen(true);
  };

  const handleUploadConfirm = () => {
    if (!selectedFiles.length) return;

    setUploading(true);
    setUploadProgress(0);
    let progress = 0;

    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);

        const uploaded = selectedFiles.map(file => ({
          name: file.name,
          url: '#',
        }));

        setFiles(prev => {
          const existingNames = new Set(prev.map(f => f.name));
          const uniqueUploads = uploaded.filter(f => !existingNames.has(f.name));
          return [...uniqueUploads, ...prev];
        });

        // ✅ Hot Toast success
        toast.success(
          `Uploaded ${selectedFiles.length} file${selectedFiles.length > 1 ? 's' : ''}`
        );

        setSelectedFiles([]);
        setIsUploadModalOpen(false);
        setUploading(false);
      }
    }, 100);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => setAnchorEl(null);

  const handleSearch = (query: string) => {
    const lowerQuery = query.toLowerCase();
    const results = files.filter(file => file.name.toLowerCase().includes(lowerQuery));
    setFilteredFiles(results);
  };

  return (
    <>

      <div className="min-h-screen flex bg-white text-[#2e2e2e]">
        <Sidebar />

        <main className="flex-1 w-full px-4 sm:px-6 lg:px-10 py-6">

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-6">
            <div className="flex items-center gap-3 ml-16">
              <FolderOpenIcon className="text-[#d39243]" fontSize="large" />
              <h1 className="text-2xl sm:text-3xl font-semibold">Your Files</h1>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <SearchBar onSearch={handleSearch} />
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  onClick={handleUploadClick}
                  disabled={uploading}
                  className="bg-[#f4e3c1] hover:bg-[#f0d9a6] text-[#2e2e2e] font-medium px-5 py-2 rounded-xl shadow-sm transition duration-150 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Upload fontSize="small" />
                  Upload
                </button>

                <IconButton onClick={handleMenuClick} sx={{ color: '#2e2e2e' }}>
                  <MoreVert />
                </IconButton>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="w-full flex justify-center py-20">
              <Loader loading />
            </div>
          ) : (
            <div className="bg-[#f9f3eb] p-4 sm:p-6 rounded-2xl shadow-inner animate-fade-in">
              <FileGrid files={filteredFiles.length ? filteredFiles : files} />
            </div>
          )}

          <UploadModal
            open={isUploadModalOpen}
            onClose={() => {
              setSelectedFiles([]);
              setIsUploadModalOpen(false);
            }}
            selectedFiles={selectedFiles}
            setSelectedFiles={setSelectedFiles}
            onUploadConfirm={handleUploadConfirm}
            uploading={uploading}
            uploadProgress={uploadProgress}
          />
        </main>
      </div>

    </>
  );
}


