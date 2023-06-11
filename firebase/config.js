import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDPAJQ3742DMhmkkylmSa-H-FOPIteUyZc',
  authDomain: 'jobhunter-190f2.firebaseapp.com',
  databaseURL: 'https://jobhunter-190f2-default-rtdb.firebaseio.com/',
  projectId: 'jobhunter-190f2',
  appId: '1:661423426326:android:3c131ece09d6dba44d5e37',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };