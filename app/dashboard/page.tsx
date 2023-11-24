'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/styles/Dashboard.module.css';
import { db } from '@/firebase';
import {
  addDoc,
  collection,
  onSnapshot,
  deleteDoc,
  doc,
} from 'firebase/firestore';

const Dashboard = () => {
  const router = useRouter();
  const [income, setIncome] = useState('');
  const [month, setMonth] = useState(
    `${new Date().toLocaleString('default', { month: 'long' })}`
  );
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');

  const [user, setUser] = useState<{
    uid: string;
    name: string;
    email: string;
    photo: string;
  } | null>(null);
  const [monthlyIncomes, setMonthlyIncomes] = useState<[any] | null>();
  const [expenses, setExpenses] = useState<[any] | null>();

  useEffect(() => {
    if (
      localStorage.getItem('user') != null ||
      localStorage.getItem('user') != undefined
    ) {
      const data = JSON.parse(localStorage.getItem('user') as string);

      setUser({
        uid: data.uid,
        name: data.name,
        email: data.email,
        photo: data.photo,
      });

      onSnapshot(collection(db, 'monthlyIncomes'), (snapshot) => {
        const isThereYourDailyIncome = snapshot.docs.filter(
          (e) => data?.uid == e.data().uid
        );

        // @ts-ignore
        setMonthlyIncomes(isThereYourDailyIncome);
      });

      onSnapshot(collection(db, 'expenses'), (snapshot) => {
        const isThereYourExpense = snapshot.docs.filter(
          (e) => data?.uid == e.data().uid
        );

        // @ts-ignore
        setExpenses(isThereYourExpense);
      });
    } else router.push('/');
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newDoc = await addDoc(collection(db, 'monthlyIncomes'), {
      monthlyIncome: income.replaceAll(',', ''),
      uid: user?.uid,
      month: month.toLowerCase(),
    }).then(() => {
      setIncome('');
    });
  };

  const addNewExpense = async (e: FormEvent) => {
    e.preventDefault();

    const newDoc = await addDoc(collection(db, 'expenses'), {
      uid: user?.uid,
      amount: expenseAmount.replaceAll(',', ''),
      expense: expenseName,
    }).then(() => {
      setExpenseName('');
      setExpenseAmount('');
    });
  };

  const deleteHandler = async (id: string) => {
    await deleteDoc(doc(db, 'expenses', id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.monthlyIncomeContainer}>
        <h2>Monthly Income</h2>
        <form className={styles.monthIncomeForm} onSubmit={handleSubmit}>
          <div>
            <label>Income</label>
            <input
              type='text'
              className={styles.input}
              value={income}
              onChange={(e) => setIncome(e.target.value)}
            />
          </div>
          <div style={{ marginTop: '0.5rem' }}>
            <label>Month</label>
            <select
              name=''
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className={styles.monthDropDownList}>
              <option value='January'>January</option>
              <option value='February'>February</option>
              <option value='March'>March</option>
              <option value='April'>April</option>
              <option value='May'>May</option>
              <option value='June'>June</option>
              <option value='July'>July</option>
              <option value='August'>August</option>
              <option value='October'>October</option>
              <option value='November'>November</option>
              <option value='December'>December</option>
            </select>
          </div>
          <div>
            <button className={styles.addIncomeBtn}>Add</button>
          </div>
        </form>

        {monthlyIncomes?.map((mi, i) => (
          <div key={i} className={styles.incomeCard}>
            <h3 style={{ textTransform: 'capitalize' }}>
              Month: <span>{mi?.data().month}</span>
            </h3>
            <h3>
              Income: <span>Rs.{mi?.data().monthlyIncome}</span>
            </h3>
          </div>
        ))}
      </div>

      <div className={styles.expenseContainer}>
        <h1>Expenses</h1>

        <form onSubmit={addNewExpense} className={styles.newExpenseForm}>
          <h3>Add New Expense</h3>
          <div style={{ marginTop: '0.5rem' }}>
            <label>Expense Name</label>
            <input
              type='text'
              className={styles.input}
              value={expenseName}
              onChange={(e) => setExpenseName(e.target.value)}
            />
          </div>
          <div style={{ marginTop: '0.5rem' }}>
            <label>Expense Amount</label>
            <input
              type='text'
              className={styles.input}
              value={expenseAmount}
              onChange={(e) => setExpenseAmount(e.target.value)}
            />
          </div>
          <button className={styles.addNewExpnBtn}>Add</button>
        </form>

        <div className={styles.expContainer}>
          {expenses?.map((expense, i) => (
            <div
              key={i}
              className={styles.expenseCard}
              style={{
                overflowY:
                  expenses == null || expenses == undefined ? 'hidden' : 'auto',
              }}>
              <h3>
                Expense: <span>{expense.data().expense}</span>
              </h3>
              <h3>
                Amount: <span>Rs.{expense.data().amount}</span>
              </h3>
              <div>
                <button
                  onClick={() => deleteHandler(expense?.id)}
                  className={styles.deleteBtn}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
