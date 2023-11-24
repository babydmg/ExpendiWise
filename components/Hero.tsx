'use client';

import { useRouter } from 'next/navigation';
import styles from '@/styles/Hero.module.css';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const Hero = () => {
  const [user, setUser] = useState<{
    name: string | null;
    email: string | null;
    photo: string | null;
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
  return (
    <section className={styles.hero_section}>
      <h1>ExpendiWise</h1>
      <div className={styles.hero_description}>
        <p>
          Welcome to ExpendiWise, where financial management meets simplicity.
          Effortlessly track and categorize expenses, gaining real-time insights
          through dynamic charts. Set personalized budgets and receive timely
          alerts to stay on track. Our secure platform prioritizes your privacy
          with encrypted data. Seamlessly sync your financial data across
          devices for anytime, anywhere access. Whether you're a budgeting pro
          or just starting, ExpendiWise empowers you on your financial journey.
          Take the first step towards financial control – sign up today for a
          smarter, more intuitive approach to managing your money.
        </p>
      </div>

      {user != null || user != undefined ? (
        <div style={{ marginTop: '0.5rem' }}>
          <Link href='/dashboard' className={styles.link}>
            Go to dashboard
          </Link>
        </div>
      ) : (
        <div className={styles.btnContainer}>
          <button onClick={getStarted} className={styles.getStartedBtn}>
            Get Started
          </button>
          <button onClick={login} className={styles.loginBtn}>
            Login
          </button>
        </div>
      )}
    </section>
  );
};

export default Hero;
