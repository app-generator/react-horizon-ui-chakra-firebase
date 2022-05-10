import React from 'react';
// Firebase auth functions
import { 
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged
} from 'firebase/auth';
import firebaseAuth from 'lib/firebase'

const provider = new GoogleAuthProvider()
// Contexts
export const AuthContext = React.createContext(null);

export const ContextProvider = props => {
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  const [user, setUser] = React.useState(null);


  React.useEffect(() => {
    // Listen to auth status updates
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setIsSignedIn(true)
        setUser(user)
      } else {
        setIsSignedIn(false)
        setUser(null)
      }
    })
  }, [])

  // Auth methods
  const signIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (err) {
      console.log(err.message);
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(firebaseAuth);
    } catch (err) {
      console.log(err.message);
    }
  };

  const googleSignIn = async () => {
    try {
      await signInWithPopup(firebaseAuth, provider);
    } catch (err) {
      console.log(err.message);
    }
  };

  // Context provider
  return (
    <AuthContext.Provider
      value={{
        isSignedIn,
        user,
        signIn,
        signOut,
        googleSignIn
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
