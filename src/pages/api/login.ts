import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, pwd } = req.body;

    const jsonDirectory = path.join(process.cwd(), 'storage');
    const fileContents = fs.readFileSync(jsonDirectory + '/database.json', 'utf-8')
    const parsedFileContents = JSON.parse(fileContents) 

    console.log(parsedFileContents)


    if(!parsedFileContents.users[email]) {
      return res.status(200).json({
        message: 'Usuário não encontrado.'
      })
    }

    if (pwd !== parsedFileContents.users[email].password) {
      res.status(200).json({ message: 'Senha incorreta.' });
    } else {
      return res.status(200).json({ 
        message: 'Login realizado com sucesso.',
        user: parsedFileContents.users[email]
      });
    }
  } else {
    res.status(405).json({ message: 'Método não permitido.' });
  }
}
