'use client'
// import { Inter } from 'next/font/google';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import logo from '../../../public/heart_icon.png';
import './page.css';

// const inter = Inter({ subsets: ['latin'] })

const URL = process.env.REACT_APP_VERCEL_URL 



export default function Login() {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const router = useRouter()

  const handleChangeState = (event: any) => {
    if (event.target.name === 'email') {
      setEmail(event.target.value);
    } else if (event.target.name === 'pwd') {
      setPwd(event.target.value);
    }
  }

  const handleLogin = async () => {
    const result = await axios.post(
      `/api/login`,
      {
        email: email,
        pwd: pwd
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    console.log(result)

    if (result.status === 200) {
      if (result.data.message === 'Usuário não encontrado.') {
        return alert('Usuário não encontrado')
      }

      if (result.data.message === 'Senha incorreta.') {
        return alert('Senha incorreta')
      }

      if (result.data.message === 'Login realizado com sucesso.') {
        localStorage.setItem('user', JSON.stringify(result.data.user))
        return router.push('/menu')
      }
    }
  }

  return (
    <div /*className={inter.className} */>
      <main className='HomeContainer'>
        <div className='ContentContainer'>
          <Image className="LoginLogo" src={logo} alt="logo" />
          <label className='LoginInputPurpleLabel'>
            Email:
            <input
              type="text"
              className='LoginPurpleCpfContainer'
              name='email'
              value={email}
              required
              onChange={handleChangeState}
            />
          </label>
          <label className='LoginInputPurpleLabel'>
            Senha:
            <input
              type="text"
              className="LoginPurplePwdContainer"
              name='pwd'
              value={pwd}
              onChange={handleChangeState}
              required
            />
          </label>
          <div>
            <button
              className='LoginPurpleButton'
              onClick={handleLogin}
            >
              Entrar
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
