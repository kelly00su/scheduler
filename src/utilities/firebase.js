import { initializeApp } from 'firebase/app';
import { useState, useEffect } from 'react';
import { getDatabase, onValue, ref, set } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyB7-S1llMUH7_kN5odwvgA5vAf7u51elV8",
    authDomain: "scheduler-9d453.firebaseapp.com",
    databaseURL: "https://scheduler-9d453.firebaseio.com",
    projectId: "scheduler-9d453",
    storageBucket: "scheduler-9d453.appspot.com",
    messagingSenderId: "45125325191",
    appId: "1:45125325191:web:67da1b95ec6649c1ab8322",
    measurementId: "G-LW6CL4BXWB"
  };

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
  
    useEffect(() => {
      const dbRef = ref(database, path);
      const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
      if (devMode) { console.log(`loading ${path}`); }
      return onValue(dbRef, (snapshot) => {
        const val = snapshot.val();
        if (devMode) { console.log(val); }
        setData(transform ? transform(val) : val);
        setLoading(false);
        setError(null);
      }, (error) => {
        setData(null);
        setLoading(false);
        setError(error);
      });
    }, [path, transform]);
  
    return [data, loading, error];
  };

