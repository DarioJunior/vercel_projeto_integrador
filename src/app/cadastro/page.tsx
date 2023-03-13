'use client'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import logo from '../../../public/heart_icon.png'
import './page.css'

export default function Cadastro() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [photo, setPhoto] = useState('')

  const handleStateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    switch (name) {
      case 'email':
        setEmail(value)
        break
      case 'password':
        setPassword(value)
        break
      case 'phone':
        setPhone(value)
        break
      case 'birthDate':
        setBirthDate(value)
        break
      case 'photo':
        setPhoto(value)
        break
      default:
        break
    }
  }

  const handleSubmitRegisterForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = {
      email,
      password,
      phone,
      birthDate,
      photo,
    }

    const result = await axios.post(
      '/api/cadastrar_usuario',
      data
    )

    if(result.status === 200) {
      alert('Cadastro realizado com sucesso!')
      return router.push('/login')
    }
  }

  const handleNavigate = (pathname: string) => {
    return router.push(pathname)
  }

  return (
    <div>
      <main className='CadastroContainer'>
        <div className='ContentContainer'>
          <header className="MenuHeader">
            <div className="IconsContainer">
              <Image className="MenuLogo" src={logo} alt="logo" />
            </div>
          </header>
          <form onSubmit={handleSubmitRegisterForm}>
            <label className='LoginInputPurpleLabel'>
              email:
              <input
                type="email"
                className='LoginPurpleEmailContainer'
                name="email"
                value={email}
                onChange={handleStateChange}
                required
              />
            </label>
            <label
              className='LoginInputPurpleLabel'
            >
              Senha:
              <input
                type="password"
                className='LoginPurplePwdContainer'
                name="password"
                value={password}
                onChange={handleStateChange}
                required
              />
            </label>
            <label className='LoginInputPurpleLabel'>
              Telefone:
              <input
                type="text"
                className='LoginPurplePwdContainer'
                name="phone"
                value={phone}
                onChange={handleStateChange}
                required
              />
            </label>
            <label className='LoginInputPurpleLabel'>
              Data de nascimento:
              <input
                type="date"
                className='LoginPurplePwdContainer'
                name="birthDate"
                value={birthDate}
                onChange={handleStateChange}
                required
              />
            </label>
            {/* <label className='LoginInputPurpleLabel'>
            Envie uma foto:
            <input
              type="file"
              className='CadastroPurpleUploadContainer'
              name="photo"
              value={photo}
              onChange={handleStateChange}
            />
          </label> */}
            {/* <div> */}
              <button className='LoginPurpleButton'>Cadastrar</button>
            {/* </div> */}
              <button className='LoginPurpleButton' onClick={() => handleNavigate('/home')}>Voltar</button>
          </form>
        </div>
      </main>
    </div>
  ) 
}
