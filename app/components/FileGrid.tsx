import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ImageIcon from '@mui/icons-material/Image';
import DescriptionIcon from '@mui/icons-material/Description';
import TableChartIcon from '@mui/icons-material/TableChart';

const getIcon = (name: string) => {
  const ext = name.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'pdf':
    case 'docx':
      return <DescriptionIcon sx={{ color: '#a86b44' }} />;
    case 'png':
    case 'jpg':
      return <ImageIcon sx={{ color: '#a86b44' }} />;
    case 'csv':
      return <TableChartIcon sx={{ color: '#a86b44' }} />;
    default:
      return <InsertDriveFileIcon sx={{ color: '#a86b44' }} />;
  }
};

const FileGrid = ({ files }: { files: { name: string; url: string }[] }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {files.map((file) => (
        <div
          key={file.name}
          onClick={() => window.open(file.url, '_blank')}
          className="bg-[#fdf8f2] border border-[#e4dcd2] p-4 rounded-xl transition-all hover:shadow-sm hover:scale-[1.02] cursor-pointer"
        >
          <div className="flex items-center gap-2 mb-2">{getIcon(file.name)}</div>
          <p className="text-sm truncate text-[#2e2e2e]">{file.name}</p>
        </div>
      ))}
    </div>
  );
};

export default FileGrid;
