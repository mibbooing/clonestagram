import 'firebase/compat/auth';
import firebaseApp from 'firebase/compat/app';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: 'AIzaSyA6FLtQo5N00aXaIfn8O_QToRgzsMPFlvw',
  authDomain: 'clonestagram-p1.firebaseapp.com',
  databaseURL: 'https://clonestagram-p1-default-rtdb.firebaseio.com',
  projectId: 'clonestagram-p1',
  storageBucket: 'clonestagram-p1.appspot.com',
  messagingSenderId: '380996504782',
  appId: '1:380996504782:web:e9c8af80c09dac0820d49f',
  measurementId: 'G-1X6NH161PM'
};

// Initialize Firebase
firebaseApp.initializeApp(firebaseConfig);

export default firebaseApp;

// import { getAuth } from 'firebase/auth';
// import { initializeApp } from 'firebase/app';

// var firebaseConfig = {
//   apiKey: 'AIzaSyA6FLtQo5N00aXaIfn8O_QToRgzsMPFlvw',
//   authDomain: 'clonestagram-p1.firebaseapp.com',
//   databaseURL: 'https://clonestagram-p1-default-rtdb.firebaseio.com',
//   projectId: 'clonestagram-p1',
//   storageBucket: 'clonestagram-p1.appspot.com',
//   messagingSenderId: '380996504782',
//   appId: '1:380996504782:web:e9c8af80c09dac0820d49f',
//   measurementId: 'G-1X6NH161PM'
// };

// export const app = initializeApp(firebaseConfig);
// export const authService = getAuth();
