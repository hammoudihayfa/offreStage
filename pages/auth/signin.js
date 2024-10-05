import React from 'react';
import { signIn } from "next-auth/react";
import styles from './SignIn.module.css';

const SignIn = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Se connecter</h1>
        <p className={styles.description}>Connectez-vous pour accéder à votre compte.</p>
        <button onClick={() => signIn("google")} className={styles.button}>
          Se connecter avec Google
        </button>
      </div>
    </div>
  );
};

export default SignIn;
