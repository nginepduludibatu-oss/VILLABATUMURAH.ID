'use client'

import React from 'react'
import { Star, Quote } from 'lucide-react'
import { Card, CardContent } from './ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'

const testimonials = [
  {
    name: 'Budi Santoso',
    location: 'Jakarta',
    rating: 5,
    text: 'Villa Edelwis sangat bagus! Kolam renang bersih, pemandangan gunung indah, dan staff sangat ramah. Pasti akan kembali lagi.',
    villa: 'Villa Edelweis Batu',
  },
  {
    name: 'Siti Rahayu',
    location: 'Surabaya',
    rating: 5,
    text: 'Pengalaman menginap yang luar biasa di Villa Matahari. Anak-anak sangat senang dengan fasilitas bermainnya. Harga sangat terjangkau.',
    villa: 'Villa Matahari Songgoriti',
  },
  {
    name: 'Ahmad Fauzi',
    location: 'Malang',
    rating: 4,
    text: 'Villa Family Retreat sangat cocok untuk keluarga besar. Ruang luas, fasilitas lengkap, dan lokasi strategis dekat wisata.',
    villa: 'Villa Family Retreat',
  },
]

export function Testimonials() {
  return (
    <div className="mb-12">
      <h2 className="mb-6 text-center text-2xl font-bold text-slate-900">
        Apa Kata Tamu Kami?
      </h2>
      
      <Carousel className="max-w-4xl mx-auto">
        <CarouselContent>
          {testimonials.map((testimonial, index) => (
            <CarouselItem key={index}>
              <Card className="mx-auto max-w-2xl bg-white">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center gap-2">
                    <Quote className="h-8 w-8 text-traveloka" />
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                  
                  <p className="mb-4 text-lg italic text-slate-600">
                    "{testimonial.text}"
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">{testimonial.name}</p>
                      <p className="text-sm text-slate-600">{testimonial.location}</p>
                    </div>
                    <div className="text-sm text-slate-600">
                      Menginap di <span className="font-medium text-traveloka">{testimonial.villa}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </div>
  )
}