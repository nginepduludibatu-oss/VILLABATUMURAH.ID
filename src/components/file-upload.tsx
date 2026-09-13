'use client'

import React, { useState, useCallback } from 'react'
import { Upload, X, Image as ImageIcon, FileText } from 'lucide-react'

interface FileUploadProps {
  onFilesChange: (files: string[]) => void
  existingFiles?: string[]
  accept?: string
  multiple?: boolean
  label?: string
  maxSize?: number // in MB
}

export function FileUpload({
  onFilesChange,
  existingFiles = [],
  accept = 'image/*',
  multiple = true,
  label = 'Upload Files',
  maxSize = 5
}: FileUploadProps) {
  const [files, setFiles] = useState<string[]>(existingFiles)
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const droppedFiles = Array.from(e.dataTransfer.files)
    processFiles(droppedFiles)
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    processFiles(selectedFiles)
  }, [])

  const processFiles = async (fileList: File[]) => {
    const processedFiles: string[] = []

    for (const file of fileList) {
      // Check file size
      if (file.size > maxSize * 1024 * 1024) {
        alert(`File ${file.name} exceeds ${maxSize}MB limit`)
        continue
      }

      // Check file type
      if (accept && !file.type.match(accept.replace('*', '.*'))) {
        alert(`File ${file.name} is not an accepted type`)
        continue
      }

      // Convert to base64 (for storage in JSON)
      const reader = new FileReader()
      reader.onload = () => {
        const base64 = reader.result as string
        processedFiles.push(base64)
        
        if (processedFiles.length === fileList.length) {
          const newFiles = [...files, ...processedFiles]
          setFiles(newFiles)
          onFilesChange(newFiles)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index)
    setFiles(newFiles)
    onFilesChange(newFiles)
  }

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium">{label}</label>
      
      {/* Drop Zone */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging
            ? 'border-blue-500 bg-blue-50'
            : 'border-slate-300 hover:border-slate-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileSelect}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer flex flex-col items-center"
        >
          <Upload className="h-12 w-12 text-slate-400 mb-4" />
          <p className="text-sm text-slate-600 mb-2">
            Drag & drop files here, or click to select
          </p>
          <p className="text-xs text-slate-400">
            Maximum file size: {maxSize}MB
          </p>
        </label>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-700">
            {files.length} file{files.length !== 1 ? 's' : ''} selected
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="relative group bg-slate-50 rounded-lg overflow-hidden"
              >
                {file.startsWith('data:image') ? (
                  <img
                    src={file}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-24 object-cover"
                  />
                ) : (
                  <div className="h-24 flex items-center justify-center">
                    <FileText className="h-8 w-8 text-slate-400" />
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
