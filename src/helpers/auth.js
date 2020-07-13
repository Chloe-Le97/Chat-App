import { auth } from "../services/firebase";

export async function signup(userName, email, password) {
  await auth().createUserWithEmailAndPassword(email, password);

  await auth().currentUser.updateProfile({ displayName: userName });
}

export function signin(email, password) {
  return auth().signInWithEmailAndPassword(email, password);
}

export async function signInWithGoogle() {
  const provider = new auth.GoogleAuthProvider();
  await auth().signInWithPopup(provider);
}
export function resetPassword(email) {
  return auth().sendPasswordResetEmail(email);
}
