export interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size?: number;
  lastModified?: Date;
}

export interface Breadcrumb {
  name: string;
  path: string;
}