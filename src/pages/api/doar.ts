import fs from 'fs';
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { 
      tipo,
      quantidade,
      descricao,
      email
    } = req.body;

    console.log(email , tipo, descricao, quantidade)
    const jsonDirectory = path.join(process.cwd(), 'storage');
    const fileContents = fs.readFileSync(jsonDirectory + '/database.json', 'utf-8')
    const parsedFileContents = JSON.parse(fileContents)

    console.log(parsedFileContents['doacoes'])

    const doacoes = parsedFileContents['doacoes']
    const doacao = {
      name: tipo,
      description: descricao,
      value: quantidade,
      date: new Date(),
    }

    doacoes[email].doacoes.push(doacao)

    // const users = parsedFileContents.users
      parsedFileContents.doacoes = doacoes
    
      fs.writeFile(jsonDirectory + '/database.json', JSON.stringify(parsedFileContents), {
        encoding: 'utf-8',  
        flag: 'w',
      }, (err) => {
        if (err) {
          console.log(err)
        }
      }) 
    }
  return res.status(200).json({ message: 'Usuário cadastrado com sucesso.' });
}