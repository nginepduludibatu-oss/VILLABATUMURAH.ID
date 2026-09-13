import { prisma } from '@/lib/prisma'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { EditForm } from './edit-form'
import Link from 'next/link'

async function getVilla(id: string) {
  try {
    const villa = await prisma.villa.findUnique({
      where: { id },
    })
    return villa
  } catch (error) {
    console.error('Error fetching villa:', error)
    return null
  }
}

export default async function EditVillaPage({
  params,
}: {
  params: { id: string }
}) {
  const villa = await getVilla(params.id)

  if (!villa) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-4">Villa tidak ditemukan</h1>
            <Link href="/admin">
              <Button>Kembali ke Admin</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/admin">
            <Button variant="outline" className="mb-4">
              ← Kembali
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Edit Villa</h1>
          <p className="text-slate-600">{villa.title}</p>
        </div>

        <EditForm villa={villa} />
      </main>

      <Footer />
    </div>
  )
}
