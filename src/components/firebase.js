import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyD_t96XKmYBTH5kbnmHg2qQ-Gy6tzJjiek",
    authDomain: "image-upload-task.firebaseapp.com",
    projectId: "image-upload-task",
    storageBucket: "image-upload-task.appspot.com",
    messagingSenderId: "529717179285",
    appId: "1:529717179285:web:40ce71cb32cfdbe2267c9c",
    measurementId: "G-DX31NEDZ8M"
  };    

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage, app };