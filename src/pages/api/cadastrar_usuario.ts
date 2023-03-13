import fs from 'fs';
import { NextApiRequest, NextApiResponse } from "next";
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { 
      email,
      password,
      phone,
      birthdate,
    } = req.body;

    const jsonDirectory = path.join(process.cwd(), 'storage');
    const fileContents = fs.readFileSync(jsonDirectory + '/database.json', 'utf-8')
    const parsedFileContents = JSON.parse(fileContents)

    const users = parsedFileContents.users

    if(!users[email]) {
      users[email] = {
        email,
        password,
        phone,
        birthdate
      }
      
      parsedFileContents.users = users
    
      fs.writeFile(jsonDirectory + '/database.json', JSON.stringify(parsedFileContents), {
        encoding: 'utf-8',  
        flag: 'w',
      }, (err) => {
        if (err) {
          console.log(err)
        }
      }) 
    }
  }

  return res.status(200).json({ message: 'Usuário cadastrado com sucesso.' });
}