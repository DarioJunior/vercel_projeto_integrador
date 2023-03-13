'use client'
import { useRouter } from 'next/navigation'
import './page.css'

export default function Home() {
  const router = useRouter()

  return (
    <main className='HomeContainer'>
      <div className='ContentContainer'>
        <button 
          className='HomePurpleButtonContainer'
          onClick={() => router.push('/login')}
        >
          LOGIN
        </button>
        <button
          className='HomePurpleButtonContainer'
          onClick={() => router.push('/cadastro')}
        >
          CADASTRO
        </button>
      </div>
    </main>
  )
}
