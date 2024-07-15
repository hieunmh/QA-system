import { SIGNIN_URL } from '@/lib/apiEndPoints';
import axios from '@/lib/axios';
import { AuthOptions } from 'next-auth';

import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {

  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials, req) {
        const res = await axios.post(SIGNIN_URL, credentials);
        const response = res.data;
        const user = response?.user;
        if (user) {
          return user;
        } 
        return null;
      }
    })
  ]
}