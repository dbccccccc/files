import React, { useState } from 'react';
import { FileItem, Breadcrumb } from './types';
import FileList from './components/FileList';
import Breadcrumbs from './components/Breadcrumbs';
import DarkModeToggle from './components/DarkModeToggle';
import { ThemeProvider, useTheme } from './context/ThemeContext';

const initialFiles: FileItem[] = [
  { id: '1', name: 'Documents', type: 'folder' },
  { id: '2', name: 'Images', type: 'folder' },
  { id: '3', name: 'report.pdf', type: 'file', size: 2048, lastModified: new Date('2023-03-15') },
  { id: '4', name: 'presentation.pptx', type: 'file', size: 5120, lastModified: new Date('2023-03-20') },
];

function AppContent() {
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [files, setFiles] = useState<FileItem[]>(initialFiles);
  const { darkMode } = useTheme();

  const breadcrumbs: Breadcrumb[] = [
    { name: 'Home', path: '' },
    ...currentPath.map((folder, index) => ({
      name: folder,
      path: currentPath.slice(0, index + 1).join('/'),
    })),
  ];

  const handleFileClick = (file: FileItem) => {
    if (file.type === 'folder') {
      setCurrentPath([...currentPath, file.name]);
      setFiles(initialFiles.filter((f) => f.type === 'file'));
    } else {
      console.log('Downloading or previewing file:', file.name);
    }
  };

  const handleBreadcrumbClick = (path: string) => {
    const newPath = path.split('/').filter(Boolean);
    setCurrentPath(newPath);
    setFiles(initialFiles);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">File Sharing</h1>
          <DarkModeToggle />
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-4">
            <Breadcrumbs items={breadcrumbs} onBreadcrumbClick={handleBreadcrumbClick} />
          </div>
          <FileList files={files} onFileClick={handleFileClick} />
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;