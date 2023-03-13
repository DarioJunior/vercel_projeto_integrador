'use client'
import Image from 'next/image';
import logo from '../../../public/heart_icon.png';
import './page.css';

import { useRouter } from 'next/navigation';
import Mapa from '../../components/map';

const coordenadas = [[51.5, -0.1],[51.52, -0.11], [51.50, -0.13], [51.47, -0.05],[51.46, -0.08], [51.51, -0.12], [51.49, -0.05]];

export default function BuscarItens() {
  const router = useRouter();

  const handleNavigation = () => {
    router.push('/menu');
  }
  return (
    <main className="BuscarItensContainer">
      <div className="ContentContainer">
        <header className="MenuHeader">
          <div className="IconsContainer">
            <Image className="MenuLogo" src={logo} alt="logo" />
          <button
            type="button"
            className="NavigationMapButton"
            onClick={handleNavigation}    
          >voltar</button>
          </div>
        </header>
        <div className="BuscarItensContentContainer">
          <div className='MapContainer'>
            { /* @ts-ignore */ }
            <Mapa coordenadas={coordenadas} />
          </div>
        </div>
      </div>
    </main>
  )
}