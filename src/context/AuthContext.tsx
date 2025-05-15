import React, {useEffect, useState, createContext, useContext} from 'react'
import { supabase } from '../../supabase-client'
import type { Session } from '@supabase/supabase-js';



interface AuthContextType {
  session: Session | null;
  signupNewUser: any
  signOut: () => void;
  signIn: (email: string, password: string) => Promise<{
    success: boolean;
    error?: any;
    data?: {
        user: any;
        session: any;
    };
}>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({ children}: { children: React.ReactNode}) => {
    const [session, setSession] = useState<Session | null>(null)

    const signupNewUser = async (email: string, password: string, username: string) => {
    //   const {data, error} = await supabase.auth.signUp({
    //     email: email,
    //     password: password,
    //     options: {
    //       data: {
    //         name: username, 
    //       }
    //     }
    //   })

    //   if(error) {
    //     console.error('There was a problem signing up: ', error);
    //     return { success: false, error }
    //   }
    //   return { success: true, data }

    // 1. Sign up the user
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            name: username,
          }
        }
      });

      // Optional: handle signup error early
      if (signUpError) {
        console.error("Signup failed:", signUpError.message);
        return { success: false, signUpError }
      }

    // 2. Insert into custom users table
      const { data: insertData, error: insertError } = await supabase
        .from('users')
        .insert([
          {
            // id: signUpData.user?.id, // recommended to include user ID
            email: email,
            username: username,
          },
        ]);

      // Optional: handle insert error
      if (insertError) {
        console.error("Insert into users table failed:", insertError.message);
      }

      return { success: true, signUpData }
      
    }

    // console.log("Signup result:", data);

    const signOut = async () => {
      const {error} = await supabase.auth.signOut();

      if(error) {
        console.error('There was a problem signing out: ', error);
      }
    }

    const signIn = async (email: string, password: string) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      });

      if (error) {
        console.error('There was a problem signing in: ', error);
        return { success: false, error };
      }

      return { success: true, data };
    }


    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        console.log('AuthChange', session)
        setSession(session)
      })

      console.log(session)

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
          console.log('AuthChange', session)
        setSession(session)
      })

      return () => subscription.unsubscribe()
    }, [])

    return (
      <AuthContext.Provider value={{session, signupNewUser, signOut, signIn}}>
        {children}
      </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("UserAuth must be used within an AuthContextProvider");
    }
    return context;
} 

