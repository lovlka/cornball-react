import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIRESTORE_PROJECT_ID
});

export const db = firebase.firestore();

export const { increment } = firebase.firestore.FieldValue;
