import {initializeApp} from 'firebase/app';
import {getFirestore, collection, getDocs} from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyA7wUmYcw93Cfv57IttUu1WAT3PnJXStZI",
    authDomain: "varad-siddhi-constructio-9b7dd.firebaseapp.com",
    projectId: "varad-siddhi-constructio-9b7dd",
    storageBucket: "varad-siddhi-constructio-9b7dd.firebasestorage.app",
    messagingSenderId: "183339782673",
    appId: "1:183339782673:web:8a1d2980192edea96757b0",
    measurementId: "G-N9S2KKD12T"
  };

//initialise firebase
initializeApp(firebaseConfig);

//init services
const db = getFirestore()

//collection reference
const colRef = collection(db, 'Employee') 

//get collecion data
getDocs(colRef)
.then((snapshot)=>{
    let Employee = []
    snapshot.docs.forEach((doc)=>{
        Employee.push({...doc.data(), id:doc.id})
    })
    console.log(Employee)
})
.catch(err=>{
    console.log(err.message)
})