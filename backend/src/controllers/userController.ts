import mssql from 'mssql';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { sqlConfig } from '../config/sqlConfig';
import { userUpdateValidator, loginValidator} from '../validators/validators'
import { LoginUserRequest, RegisterUserRequest } from '../interface/user'
import Connection from '../dbhelpers/dbhelper'


dotenv.config();

const dbhelpers=new Connection;
const secret = process.env.SECRET || '';
export const registerUser = async (req: { body: RegisterUserRequest }, res: any) => {
    try {
      const userId = uuidv4();
      const { userPhone, userName, userEmail, userPassword, profilePic } = req.body;
      const hashedPwd = await bcrypt.hash(userPassword, 8);
  
      const result = await dbhelpers.execute('registerUserProc', {
        userId,
        userPhone,
        userName,
        userEmail,
        userPassword: hashedPwd,
        profilePic,
      });
  
      if (result && result.rowsAffected[0] === 1) {
        return res.status(200).json({ message: 'Registered successfully' });
      } else {
        return res.status(400).json({ message: 'Registration Failed' });
      }
    } catch (error: any) {
      return res.json({ Error: error.message });
    }
  };
  
export  const loginUser = async (req: { body: LoginUserRequest }, res: any) => {
    try {
      const { userEmail, userPassword, role, userId, profilePic } = req.body;
  
      if (!userEmail || !userPassword) {
        return res.status(400).json({ error: 'Kindly input your credentials' });
      }
  
      const { error } = loginValidator.validate(req.body);
  
      if (error) {
        return res.status(422).json(error.details[0].message);
      }
  
      const user = await dbhelpers.execute('userLoginProc', { userEmail })
  
      if (user && user.recordset.length > 0) {
        const hashedPwd = user.recordset[0].userPassword;
        const comparePassword = await bcrypt.compare(userPassword, hashedPwd)
  
        if (comparePassword) {
          const { userPassword, userId, role, profilePic, ...payload } = user.recordset[0]
          const token = jwt.sign(payload, secret, { expiresIn: '360000s' });          
          return res.status(200).json({ message: 'Logged in successfully', token, role, userId, profilePic })
        } else {
          return res.status(400).json({ message: 'Invalid Log in' })
        }
      } else {
        return res.status(400).json({ message: 'Wrong Log in Details' })
      }
    } catch (error) {
      return res.json({ message: 'Wrong Log in Details' })
    }
  }
  

export  const updateUser = async (req: { params: { userId: string }; body: RegisterUserRequest }, res: any) => {
    try {
      const { userId } = req.params;
      const { userName, userEmail, userPhone, userPassword, profilePic } = req.body;
  
      const { error } = userUpdateValidator.validate(req.body)
  
      const hashedPwd = await bcrypt.hash(userPassword, 10)
  
      const result = await dbhelpers.execute('userUpdateProc', {
        userId,
        userName,
        userEmail,
        userPhone,
        userPassword: hashedPwd,
        profilePic,
      })
  
      if (result && result.rowsAffected[0] === 1) {
        return res.status(200).json({ message: 'Details updated successfully' })
      } else {
        return res.status(400).json({ message: 'Details not updated' })
      }
    } catch (error) {
      return res.json({ Error: error })
    }
  }
  
 
  