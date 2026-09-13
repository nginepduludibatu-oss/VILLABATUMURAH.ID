'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Dialog, DialogContent } from './ui/dialog'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface ImageGalleryProps {
  images: string[]
  title: string
  currentImage?: number
  onImageClick?: (index: number) => void
  customBadge?: string
  discountPercent?: number
}

export function ImageGallery({ images, title, currentImage = 0, onImageClick, customBadge, discountPercent }: ImageGalleryProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(currentImage)

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') handlePrevious()
    if (e.key === 'ArrowRight') handleNext()
    if (e.key === 'Escape') setIsOpen(false)
  }

  const handleOpen = (index: number) => {
    setSelectedIndex(index)
    setIsOpen(true)
    if (onImageClick) onImageClick(index)
  }

  return (
    <>
      {/* Thumbnail Grid */}
      <div className="grid grid-cols-1 gap-4">
        {/* Main Image */}
        <div 
          className="relative h-96 overflow-hidden rounded-lg cursor-pointer group"
          onClick={() => handleOpen(0)}
        >
          <Image
            src={images[0]}
            alt={`${title} - Main`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
            <span className="text-white text-sm font-medium">Klik untuk melihat</span>
          </div>
          <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            1 / {images.length}
          </div>
          
          {/* Badges */}
          {customBadge && (
            <Badge className="absolute top-4 left-4 bg-emerald-600 z-10">
              {customBadge}
            </Badge>
          )}
          {discountPercent && discountPercent > 0 && (
            <Badge className="absolute top-4 right-16 bg-red-500 z-10">
              -{discountPercent}%
            </Badge>
          )}
        </div>
        
        {/* Thumbnail Grid */}
        <div className="grid grid-cols-4 gap-2">
          {images.slice(1, 5).map((image, index) => (
            <div 
              key={index}
              className="relative h-24 overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => handleOpen(index + 1)}
            >
              <Image
                src={image}
                alt={`${title} ${index + 2}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
          {images.length > 5 && (
            <div 
              className="relative h-24 overflow-hidden rounded-lg cursor-pointer bg-slate-900 flex items-center justify-center text-white hover:bg-slate-800 transition-colors"
              onClick={() => handleOpen(5)}
            >
              <span className="text-sm font-medium">
                +{images.length - 5} Foto
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent 
          className="max-w-6xl w-full p-0 bg-black/95 border-0"
          onKeyDown={handleKeyDown}
        >
          <div className="relative w-full flex flex-col" style={{ minHeight: '600px' }}>
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/50 to-transparent">
              <span className="text-white font-medium">
                {selectedIndex + 1} / {images.length}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Main Image */}
            <div className="flex-1 relative bg-black flex items-center justify-center min-h-[500px] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="relative flex items-center justify-center w-full h-full"
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={images[selectedIndex]}
                      alt={`${title} ${selectedIndex + 1}`}
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                onClick={handlePrevious}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                onClick={handleNext}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            </div>

            {/* Thumbnail Strip */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedIndex(index)}
                    className={`relative flex-shrink-0 w-20 h-20 rounded overflow-hidden border-2 transition-colors ${
                      index === selectedIndex
                        ? 'border-white'
                        : 'border-transparent hover:border-white/50'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${title} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}