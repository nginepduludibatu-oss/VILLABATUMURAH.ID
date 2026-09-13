'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock, Zap } from 'lucide-react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'

export function FlashSale() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const { hours, minutes, seconds } = prev
        if (seconds > 0) {
          return { ...prev, seconds: seconds - 1 }
        } else if (minutes > 0) {
          return { ...prev, minutes: minutes - 1, seconds: 59 }
        } else if (hours > 0) {
          return { ...prev, hours: hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <Card className="border-2 border-red-500 bg-gradient-to-r from-red-50 to-orange-50">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-red-500 p-3">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-red-600">Flash Sale Hari Ini!</h3>
                <p className="text-sm text-slate-600">Diskon hingga 30% untuk villa pilihan</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-red-500" />
                <div className="flex gap-2">
                  {[
                    { value: timeLeft.hours, label: 'Jam' },
                    { value: timeLeft.minutes, label: 'Menit' },
                    { value: timeLeft.seconds, label: 'Detik' },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex flex-col items-center rounded-lg bg-red-500 px-3 py-2 text-white"
                    >
                      <span className="text-xl font-bold">{String(item.value).padStart(2, '0')}</span>
                      <span className="text-xs">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Button className="bg-red-500 hover:bg-red-600">
              Lihat Penawaran
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}