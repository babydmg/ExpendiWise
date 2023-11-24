'use client';

import styles from '@/styles/Login.module.css';
import { auth } from '@/firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect } from 'react';

const Login = () => {
  const router = useRouter();

  const provider = new GoogleAuthProvider();

  useEffect(() => {
    if (
      localStorage.getItem('user') == null ||
      localStorage.getItem('user') == undefined
    ) {
      return;
    } else router.push('/dashboard');
  }, []);

  const handleClick = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        router.push('/dashboard');
        window.location.reload();
        if (
          localStorage.getItem('user') == null ||
          localStorage.getItem('user') == undefined
        ) {
          localStorage.setItem(
            'user',
            JSON.stringify({
              uid: res?.user.uid,
              name: res?.user.displayName,
              email: res?.user.email,
              photo: res?.user.photoURL,
            })
          );
        } else return;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.container}>
      <h1>Expense Tracker</h1>
      <button onClick={handleClick} className={styles.loginBtn}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          height='1em'
          viewBox='0 0 488 512'>
          <path d='M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z' />
        </svg>
        Login with Google
      </button>
      <Link href='/get-started' className={styles.link}>
        Not have an account?
      </Link>
    </div>
  );
};

export default Login;
