import firebase from 'firebase';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyAJngE6b-uhhnPR6UV1YnnBrwKldqKlrE8",
    authDomain: "csc322-group-p.firebaseapp.com",
    databaseURL: "https://csc322-group-p.firebaseio.com",
    projectId: "csc322-group-p",
    storageBucket: "csc322-group-p.appspot.com",
    messagingSenderId: "784129974552",
    appId: "1:784129974552:web:1a4c41f03663cf58e4be6d",
    measurementId: "G-32H9T882JH"
  };


  
  
  class Fire {
      constructor() {
          firebase.initializeApp(firebaseConfig);
      }
      
      getCollection = (collection) => {
          return firebase.firestore().collection(collection);
      }
  
      // Used for realtime database
      getRef = (reference) => {
          return firebase.database().ref(reference);
      }
  
      off() {
          this.ref.off();
      }
  
     // async logEvent(eventName, properties) {
          //await Analytics.logEvent(eventName, properties);
      //}
  
     // async logScreen(screenName) {
         // await Analytics.setCurrentScreen(screenName);
     // }
  }
  
  Fire.db = new Fire();
  export default Fire;