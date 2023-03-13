'use client'
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import logo from '../../../public/heart_icon.png';

import './page.css';

interface FilePreview {
  file: File;
  previewUrl: string;
}

export default function DoarItens() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<FilePreview[]>([]);
  const [textAreaValue, setTextAreaValue] = useState('');
  const [quantidade, setQuantidade] = useState(0);
  const [tipo, setTipo] = useState('');
  const [user, setUser] = useState(null)

  useEffect(() => {
    if(!user) {
      const user = localStorage.getItem('user')
      if(user) {
        console.log(JSON.parse(user).email)
        setUser(JSON.parse(user).email)
      }
    }
  }
  , [])

  const handleStateChange = (event: any) => {
    if (event.target.name === 'textAreaValue') {
      setTextAreaValue(event.target.value);
    }

    if (event.target.name === 'quantidade') {
      setQuantidade(event.target.value);
    }

    if (event.target.name === 'tipo') {
      setTipo(event.target.value);
    }
  }

  const handleFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setSelectedFiles([...selectedFiles, ...newFiles]);

      const newPreviews = newFiles.map((file) => {
        const previewUrl = URL.createObjectURL(file);
        return { file, previewUrl };
      });

      setFilePreviews([...filePreviews, ...newPreviews]);
    }
  };

  const renderImages = () => {
    return selectedFiles?.map((image, index) => {
      return <img key={index} className="DoarItensFotoExemplo" src={URL.createObjectURL(image)} alt="uploaded" />;
    });
  };


  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await axios.post('/api/doar', {
      tipo,
      quantidade,
      descricao: textAreaValue,
      email: user,
    });
    console.log(result);
  
  }
  return (
    <main className="DoarItensContainer">
      <div className="DoarItensContent">
        <header className="DoarItensHeader">
          <div className="IconsContainer">
            <Image className="DoarItensLogo" src={logo} alt="logo" />
            <Image className="DoarItensLogo" src={logo} alt="logo" />
          </div>
          <div className="UserInfosContainer">
            <p>
              Que tipos de itens deseja doar?
            </p>
          </div> 
        </header>
        <form onSubmit={handleSubmitForm} className="DoarItensMainContentContainer">
          <select 
            className="DoarItensSelect"
            name='tipo'
            value={tipo}
            onChange={handleStateChange}
          >
          <option value="" selected disabled hidden>Itens</option>
            <option value="roupas">Roupas</option>
            <option value="moveis">Móvies</option>
            <option value="ut_domesticos">Utensílios Domésticos</option>
            <option value="eletronicos">eletronicos</option>
            <option value="cama_mesa_banho">Cama, Mesa e Banho</option>
          </select>
          <input
            type="number"
            name="quantidade"
            id="quantidade"
            placeholder="Quantidade"
            min="0"
            onChange={handleStateChange}
            className="DoarItensInputNumber"
            value={quantidade}    
          />  

          <textarea 
            className="DoarItensInputTextArea"
            placeholder='Descrição dos itens...'
            value={textAreaValue}
            name="textAreaValue"
            onChange={handleStateChange}
          >
          </textarea>
          <input
            type="file"
            id="file"
            className="DoarItensUploadInput"
            accept="image/*"
            multiple
            onChange={handleFileSelection}
          />
          <button type="submit" className="DoarItensUploadButton">
            Cadastrar
          </button>
        </form>
        <div className="DoarItensUploadContainer">
          <div className="DoarItensUploadGallery" id="foto">
            {selectedFiles && selectedFiles?.length > 0 && <div>{renderImages()}</div>}
          </div>
        </div>
      </div>
    </main>
  )
}