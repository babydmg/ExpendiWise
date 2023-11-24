'use client';

import { useRouter } from 'next/navigation';
import { auth } from '@/firebase';
import { signOut } from 'firebase/auth';
import styles from '@/styles/Navbar.module.css';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [user, setUser] = useState<{
    name: string;
    email: string;
    photo: string;
  } | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (
      localStorage.getItem('user') != null ||
      localStorage.getItem('user') != undefined
    ) {
      const data = JSON.parse(localStorage.getItem('user') as string);

      setUser({
        name: data.name,
        email: data.email,
        photo: data.photo,
      });
    }
  }, []);

  const getStarted = () => {
    router.push('/get-started');
  };

  const login = () => {
    router.push('/login');
  };

  const logout = () => {
    const userPermision = confirm('Are you sure you want to logout?');

    if (userPermision) {
      signOut(auth);
      localStorage.removeItem('user');
      window.location.reload();
    } else {
      return;
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_logo}>
        <Link href='/' style={{ textDecoration: 'none', color: 'black' }}>
          <h2>ExpendiWise</h2>
        </Link>
      </div>

      <div className={styles.photoContainer}>
        <Image
          src={user != null ? user?.photo : ''}
          alt={user != null ? user?.name : ''}
          className={styles.photo}
          width={50}
          height={50}
        />
        <h3>{user?.name}</h3>
      </div>

      {user != null ? (
        <div>
          <Link href='/dashboard' className={styles.link}>
            Dashboard
          </Link>
          <button onClick={logout} className={styles.logoutBtn}>
            Logout
          </button>
        </div>
      ) : (
        <div className={styles.btn_container}>
          <button className={styles.getStartedBtn} onClick={getStarted}>
            Get Started
          </button>
          <button className={styles.loginBtn} onClick={login}>
            Login
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
