import React, { useRef } from 'react';
import { Upload, File, CheckCircle, Clock, Trash2, FileText, Mail } from 'lucide-react';
import type { Document } from '../App';

interface DocumentUploadProps {
  onUpload: (files: FileList) => void;
  documents: Document[];
}

export function DocumentUpload({ onUpload, documents }: DocumentUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onUpload(files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onUpload(e.target.files);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return <File className="h-5 w-5 text-red-500" />;
    if (type.includes('word')) return <FileText className="h-5 w-5 text-blue-500" />;
    if (type.includes('email')) return <Mail className="h-5 w-5 text-green-500" />;
    return <File className="h-5 w-5 text-gray-500" />;
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Document Upload</h3>
          <p className="text-sm text-gray-600 mt-1">
            Upload PDFs, DOCX files, and email documents
          </p>
        </div>

        <div
          className="p-8 border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="text-center">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">
              Drop files here or click to upload
            </h4>
            <p className="text-sm text-gray-600 mb-4">
              Supports PDF, DOCX, and email formats up to 10MB each
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-200">
              Choose Files
            </button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.docx,.doc,.eml,.msg"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      </div>

      {/* Document List */}
      {documents.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">
              Uploaded Documents ({documents.length})
            </h3>
          </div>

          <div className="divide-y divide-gray-100">
            {documents.map((doc) => (
              <div key={doc.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getFileIcon(doc.type)}
                    <div>
                      <h4 className="font-medium text-gray-900">{doc.name}</h4>
                      <div className="flex items-center space-x-3 text-sm text-gray-600 mt-1">
                        <span>{formatFileSize(doc.size)}</span>
                        <span>•</span>
                        <span>{doc.clauses} clauses extracted</span>
                        <span>•</span>
                        <span>{doc.uploadedAt.toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    {doc.processed ? (
                      <div className="flex items-center space-x-1 text-green-600">
                        <CheckCircle className="h-5 w-5" />
                        <span className="text-sm font-medium">Processed</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-1 text-amber-600">
                        <Clock className="h-5 w-5" />
                        <span className="text-sm font-medium">Processing...</span>
                      </div>
                    )}

                    <button className="p-1 text-gray-400 hover:text-red-500 transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {doc.processed && (
                  <div className="mt-3 bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Processing Complete</span>
                      <span className="text-blue-600 font-medium">Ready for queries</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}