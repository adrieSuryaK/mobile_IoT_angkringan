import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set, update } from "firebase/database";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDLuInJa5hICCuC6Iei9arM2frJYFgTJ40",
    authDomain: "iot-angkringan.firebaseapp.com",
    databaseURL: "https://iot-angkringan-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "iot-angkringan",
    storageBucket: "iot-angkringan.appspot.com",
    messagingSenderId: "54386626276",
    appId: "1:54386626276:web:af6b076cfbce279f91a6f1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
const updateControl = update;

// const getUserData = (uid) => {
//     return new Promise((resolve, reject) => {
//         const userRef = ref(database, `users/${uid}`);
//         onValue(userRef, (snapshot) => {
//             if (snapshot.exists()) {
//                 const data = snapshot.val();
//                 resolve(data);
//             } else {
//                 reject('No data available');
//             }
//         }, (error) => {
//             reject(error.message);
//         });
//     });
// };

const getUserData = (uid, setData) => {
    const userRef = ref(database, `users/${uid}`);
    onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            setData(data);
        }
    });
};

const setData = (path, value) => {
    return set(ref(database, path), value);
}

// const updateUserData = (uid, updateData) => {
//     const userRef = ref(database, `users/${uid}`);
//     onValue(userRef, (snapshot) => {
//         if (snapshot.exists()) {
//             const data = snapshot.val();
//             updateData(data);
//         }
//     });
// };

// const updateData = (path, value) => {
//     return update(ref(database, path), value);
// }

const lampuRef = (database, path) => {
    return ref(database, `${path}`);
  };

  const servoRef = (database, path) => {
    return ref(database, `${path}`);
  };

export { database, auth, signInWithEmailAndPassword, getUserData, onAuthStateChanged, setData, updateControl, lampuRef, servoRef };
