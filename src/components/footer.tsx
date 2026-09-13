import React from 'react'
import Link from 'next/link'
import { Logo } from './logo'

export function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-slate-600">
              Platform penyewaan villa terpercaya di Batu dan Malang dengan harga terjangkau.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold text-slate-900">Tautan Cepat</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/villas" className="text-slate-600 hover:text-emerald-600 transition-colors">
                  Semua Villa
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="text-slate-600 hover:text-emerald-600 transition-colors">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-600 hover:text-emerald-600 transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-600 hover:text-emerald-600 transition-colors">
                  Hubungi Kami
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Locations */}
          <div>
            <h3 className="mb-4 font-semibold text-slate-900">Lokasi Populer</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/villas?location=Batu" className="text-slate-600 hover:text-emerald-600 transition-colors">
                  Villa di Batu
                </Link>
              </li>
              <li>
                <Link href="/villas?location=Malang" className="text-slate-600 hover:text-emerald-600 transition-colors">
                  Villa di Malang
                </Link>
              </li>
              <li>
                <Link href="/villas?location=Songgoriti" className="text-slate-600 hover:text-emerald-600 transition-colors">
                  Villa di Songgoriti
                </Link>
              </li>
              <li>
                <Link href="/villas?location=Panderman" className="text-slate-600 hover:text-emerald-600 transition-colors">
                  Villa di Panderman
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-semibold text-slate-900">Hubungi Kami</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>📞 +62 812 1691 9381</li>
              <li>📧 info@villabatumurah.id</li>
              <li>📍 Jl. Panderman No. 45, Batu</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-slate-600">
          <p>&copy; 2024 VillaBatuMurah.ID. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}