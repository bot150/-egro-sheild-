import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromCache, getDocFromServer } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import firebaseConfig from './config';

// Validate config before initialization
if (!firebaseConfig || !firebaseConfig.apiKey || firebaseConfig.apiKey === 'TODO_KEYHERE') {
  console.error('Firebase configuration is missing or invalid. Please check your firebase-applet-config.json file.');
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const storage = getStorage(app);

// Test connection to Firestore
async function testConnection() {
  try {
    // Attempt to fetch a non-existent doc from server to verify connectivity
    await getDocFromServer(doc(db, '_connection_test_', 'ping'));
    console.log('Firestore connection verified.');
  } catch (error: any) {
    if (error.message?.includes('the client is offline')) {
      console.error("CRITICAL: Firebase configuration is incorrect or the domain is not authorized. Please check your Firebase settings.");
    }
    // Other errors (like 404 or permission denied) are expected for this test path
  }
}

testConnection();
