// Firebase config
import { db, storage, firestore } from "../firebase"; // Import firestore
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
} from "@firebase/firestore";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";

import * as FileSystem from "expo-file-system";

// Upload Data para database
const uploadDatabase = async (table, data) => {
  try {
    await addDoc(collection(db, table), data);
    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// Upload media
const uploadMedia = async (image) => {
  try {
    const { uri } = await FileSystem.getInfoAsync(image);

    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        resolve(xhr.response);
      };
      xhr.onerror = (e) => {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const filename = image.substring(image.lastIndexOf("/") + 1);
    const storageRef = ref(storage, filename);
    await uploadBytes(storageRef, blob);

    return filename;
  } catch (error) {
    console.error("Error uploading media:", error);
    return false;
  }
};

// Fetch data by id
const fetchById = async (tableName, id) => {
  const docRef = doc(db, tableName, id);

  try {
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists) {
      const imageUrl = await getImageUrl(docSnapshot.data().nomeImagemEncoded); // Call getImageUrl here
      const data = docSnapshot.data();
      data.imageUrl = imageUrl; // Assuming you want to attach imageUrl to the returned data
      return data;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    throw error; // rethrow the error if necessary
  }
};

// Find Image URL
const getImageUrl = async (nomeImagemEncoded) => {
  const storage = getStorage();
  const imageRef = ref(storage, nomeImagemEncoded);
  try {
    const imageUrl = await getDownloadURL(imageRef);
    return imageUrl;
  } catch (error) {
    throw error;
  }
};

// Fetch All
const fetchAll = (tableName, callback) => {
  if (tableName === "materiais") {
    return onSnapshot(collection(db, tableName), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        nome: doc.data().nome,
        nomeImagemEncoded: doc.data().nomeImagemEncoded,
        quantidade: doc.data().quantidade,
        precoCusto: doc.data().precoCusto,
        calculoPreco: Number(doc.data().calculoPreco), // Convert calculoPreco to a number
      }));
      callback(data);
    });
  }

  return onSnapshot(collection(db, tableName), (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      nome: doc.data().nome,
      nomeImagemEncoded: doc.data().nomeImagemEncoded,
      quantidade: doc.data().quantidade,
      precoCusto: doc.data().precoCusto,
    }));
    callback(data);
  });
};

export { uploadDatabase, uploadMedia, fetchById, getImageUrl, fetchAll };
