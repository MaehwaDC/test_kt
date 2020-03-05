import firebase from 'firebase';
import { TasksApi } from './tasks';

const firebaseConfig = {
  apiKey: "AIzaSyCAf_VM7g5ATHJEd9QAmOzDxT3Iv0cSMIA",
  authDomain: "test-kt-5d13d.firebaseapp.com",
  databaseURL: "https://test-kt-5d13d.firebaseio.com",
  projectId: "test-kt-5d13d",
  storageBucket: "test-kt-5d13d.appspot.com",
  messagingSenderId: "65677686427",
  appId: "1:65677686427:web:7d4379a0175ffc2a7b783e"
};

// Initialize Firebase
export const fire = firebase.initializeApp(firebaseConfig);

export default { 
  tasks: new TasksApi(fire),
};
