import { Session } from "@supabase/supabase-js";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { client as supabase } from "../configs/supabase";

type AuthContextType = {
  signed: boolean;
  isLoading: boolean;
  signOut: () => void;
  user?: Session["user"];
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [user, setUser] = useState<Session["user"]>();
  const [isLoading, setIsLoading] = useState(true);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  useEffect(() => {
    async function loadSession() {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user);
      if (data) setIsLoading(false);
    }

    loadSession();

    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user);
      setIsLoading(false);

      console.log("session?.user", session?.user);
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  const values = {
    signed: !!user,
    isLoading,
    signOut,
    user,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
