import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, collection, query, orderBy, limit, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDb24koSMf6axOSURK_oOcAZRX_DdjUDb0",
    authDomain: "pinga-match.firebaseapp.com",
    projectId: "pinga-match",
    storageBucket: "pinga-match.firebasestorage.app",
    messagingSenderId: "267145382352",
    appId: "1:267145382352:web:daca970e22c63308a411d5",
    measurementId: "G-G98V65N16F"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export async function salvarProgressoNoFirebase(uid, maxLevel) {
    const userRef = doc(db, "usuarios", uid);
    try {
        await setDoc(userRef, {
            maxLevelReached: maxLevel,
            lastUpdate: new Date()
        }, { merge: true });
        console.log("Progresso salvo na nuvem!");
    } catch (e) {
        console.error("Erro ao salvar na nuvem:", e);
    }
}

export async function carregarProgressoDoFirebase(uid) {
    const userRef = doc(db, "usuarios", uid);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
        return docSnap.data().maxLevelReached;
    }
    return null;
}

export async function salvarPontuacaoNoFirebase(uid, nome, pontosGanhos) {
    const userRef = doc(db, "usuarios", uid);
    const docSnap = await getDoc(userRef);
    let totalAtual = 0;

    if (docSnap.exists()) {
        totalAtual = docSnap.data().totalScore || 0;
    }

    await setDoc(userRef, {
        totalScore: totalAtual + pontosGanhos,
        userName: nome,
        lastUpdate: new Date()
    }, { merge: true });
}

export async function buscarRankingGlobal() {
    const q = query(collection(db, "usuarios"), orderBy("totalScore", "desc"), limit(100));
    const querySnapshot = await getDocs(q);
    let ranking = [];
    querySnapshot.forEach((doc) => {
        ranking.push({ id: doc.id, ...doc.data() });
    });
    return ranking;
}

export { auth, db, googleProvider, signInWithPopup, signOut, onAuthStateChanged, doc, setDoc, getDoc, collection, query, orderBy, limit, getDocs };