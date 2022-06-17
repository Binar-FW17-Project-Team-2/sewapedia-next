import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY_FIREBASE,
  authDomain: 'pipin-latihan-firebase.firebaseapp.com',
  projectId: 'pipin-latihan-firebase',
  storageBucket: 'pipin-latihan-firebase.appspot.com',
  messagingSenderId: '429074664693',
  appId: '1:429074664693:web:a48b6f20bdee5bd7a5c9bc',
  measurementId: 'G-E683J47S1M',
}

const app = initializeApp(firebaseConfig)
const storage = getStorage(app)

export { app, storage }
