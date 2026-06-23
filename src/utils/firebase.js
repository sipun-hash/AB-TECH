import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Collection Reference
const snapshotsCollection = collection(db, 'snapshots');

/**
 * Fetch all snapshots from Firestore ordered by creation date (newest first).
 * @returns {Promise<Array>} List of snapshots
 */
export async function fetchSnapshots() {
  const q = query(snapshotsCollection, orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  const snapshots = [];
  querySnapshot.forEach((doc) => {
    snapshots.push({ id: doc.id, ...doc.data() });
  });
  return snapshots;
}

/**
 * Add a new snapshot to Firestore.
 * @param {Object} snapshotData - The snapshot fields (title, desc, category, url, isVideo, gridClass)
 * @returns {Promise<string>} The new document's ID
 */
export async function addSnapshot(snapshotData) {
  const docRef = await addDoc(snapshotsCollection, {
    ...snapshotData,
    createdAt: serverTimestamp()
  });
  return docRef.id;
}
