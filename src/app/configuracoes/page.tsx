import Image from 'next/image'
import logo from '../../../public/heart_icon.png'
import './page.css'

export default function Configuracoes() {
  return (
    <main className="ConfigContainer">
      <div className="ContentContainer">
        <header className="MenuHeader">
          <div className="IconsContainer">
            <Image className="MenuLogo" src={logo} alt="logo" />
          </div>
        </header>
        <div className="ConfigContentContainer">
          <button className="ConfigButton">
            Editar Perfil
          </button>
          <button className="ConfigButton">
            Desativar Conta
          </button>
          <button className="ConfigButton">
            Política de Acesso à Informação
          </button> 
          <button className='ConfigNavigationButton'>
            Voltar
          </button>
        </div>
      </div>
    </main>
  )
}