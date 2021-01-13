import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC17u7bihQMc3gnhnPYeQLRRzZuXTQCkyc',
  authDomain: 'react-realtime-chat-b9974.firebaseapp.com',
  projectId: 'react-realtime-chat-b9974',
  storageBucket: 'react-realtime-chat-b9974.appspot.com',
  messagingSenderId: '154435418237',
  appId: '1:154435418237:web:f16926863f23313a009914',
};

export const fire = firebase.initializeApp(firebaseConfig);
