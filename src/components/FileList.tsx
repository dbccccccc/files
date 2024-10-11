import React from 'react';
import { FileItem } from '../types';
import { File, Folder } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

interface FileListProps {
  files: FileItem[];
  onFileClick: (file: FileItem) => void;
}

const FileList: React.FC<FileListProps> = ({ files, onFileClick }) => {
  const { darkMode } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <motion.div
      className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md rounded-lg overflow-hidden`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Size</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Last Modified</th>
          </tr>
        </thead>
        <tbody className={`${darkMode ? 'bg-gray-800' : 'bg-white'} divide-y divide-gray-200 dark:divide-gray-700`}>
          {files.map((file) => (
            <motion.tr
              key={file.id}
              onClick={() => onFileClick(file)}
              className={`hover:${darkMode ? 'bg-gray-700' : 'bg-gray-100'} cursor-pointer transition-colors duration-150`}
              variants={itemVariants}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  {file.type === 'folder' ? <Folder className="mr-2 text-blue-500" /> : <File className="mr-2 text-gray-500 dark:text-gray-400" />}
                  <span className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>{file.name}</span>
                </div>
              </td>
              <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                {file.type === 'file' ? `${file.size} KB` : '-'}
              </td>
              <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                {file.lastModified?.toLocaleDateString()}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default FileList;