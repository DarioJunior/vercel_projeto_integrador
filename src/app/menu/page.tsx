'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import logo from '../../../public/heart_icon.png';
import avatar from '../../../public/user_avatar.png';

import './page.css';

export default function Menu() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  
  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      setUser(JSON.parse(user))
    } else {
      router.push('/')
    }
  }, [])
  return (
    <main className="MenuContainer">
      <div className="MenuContent">
        <header className="MenuHeader">
          <div className="IconsContainer">
            <Image className="MenuLogo" src={logo} alt="logo" />
            <Image className="MenuLogo" src={avatar} alt="user avatar" />
            <Image className="MenuLogo" src={logo} alt="logo" />
          </div>
          <div className="UserInfosContainer">
            <p>
              Olá, <span className="MenuUserName">{user?.email.split('@')[0]}!</span>
            </p>
            <p>
              Selecione o serviço desejado:
            </p>
          </div>
        </header>
        <div className="MenuMainContentContainer">
          <button
            className="MenuButtonContainer"
            onClick={() => router.push('/doar-itens')}
          >
            <p className="MenuMainButtonText">
              Doar Itens
            </p>
          </button>
          <button
            className="MenuButtonContainer"
            onClick={() => router.push('/buscar-doacoes')}
          >
            <p className="MenuMainButtonText">
              Buscar Doações
            </p>
          </button>
          <button
            className="MenuButtonContainer"
            onClick={() => router.push('/outras-informacoes')}
          >
            <p className="MenuMainButtonText">
              Outras <br/>Informações
            </p>
          </button>
        </div>
      </div>
    </main>
  )
}