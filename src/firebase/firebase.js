import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

const firebaseConfig = {

apiKey: "AIzaSyBm3YVsPOs7QxIZVerE4tYf5R0O9BDzdF4",

authDomain: "velora-forms.firebaseapp.com",

projectId: "velora-forms",

storageBucket: "velora-forms.firebasestorage.app",

messagingSenderId: "104312887915",

appId: "1:104312887915:web:b9afb8be46073c25f4af2e"

};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);