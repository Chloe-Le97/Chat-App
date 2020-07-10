import { auth } from "../services/firebase";

export async function signup(userName, email, password) {
  await auth().createUserWithEmailAndPassword(email, password);
  auth().onAuthStateChanged(function (user) {
    if (user) {
      user.updateProfile({
        displayName: userName,
      });
    }
  });
}

export function signin(email, password) {
  return auth().signInWithEmailAndPassword(email, password);
}

export function signInWithGoogle() {
  const provider = new auth.GoogleAuthProvider();
  return auth().signInWithPopUp(provider);
}
export function resetPassword(email) {
  return auth().sendPasswordResetEmail(email);
}
