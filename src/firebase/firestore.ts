import { User } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { Dispatch, SetStateAction } from "react";

export const saveUser = async (user: User) => {
  try {
    const usersSnapshot = await getDocs(collection(db, "users"));
    const allUsers = usersSnapshot.docs.map((doc) => doc.data());
    const userExists = allUsers.some((u) => u.uid === user.uid);
    if (!userExists) {
      await addDoc(collection(db, "users"), {
        email: user.email,
        displayName: user.displayName,
        uid: user.uid,
      });
      await setDoc(doc(db, "create", user.uid), {
        cover: "",
        content: "",
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export const saveCard = async (
  isCover: boolean,
  user: User,
  cardURL: string
) => {
  if (!user) return;

  try {
    const createCardRef = doc(db, "create", user.uid);
    await updateDoc(createCardRef, {
      [isCover ? "cover" : "content"]: cardURL,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getCreateCardInfo = async (
  user: User,
  setCardCover: Dispatch<SetStateAction<string>>,
  setCardContent: Dispatch<SetStateAction<string>>
) => {
  try {
    const createCardRef = doc(db, "create", user.uid);
    const createCardSnapshot = await getDoc(createCardRef);
    if (createCardSnapshot.exists()) {
      setCardCover(createCardSnapshot.data().cover);
      setCardContent(createCardSnapshot.data().content);
    }
  } catch (error) {
    console.error(error);
  }
};

export const sendCard = async (
  cardCover: string,
  cardContent: string,
  recipientEmail: string,
  user: User
) => {
  try {
    const readCardRef = doc(db, "read", recipientEmail);
    const readCardSnapshot = await getDoc(readCardRef);
    if (readCardSnapshot.exists()) {
      const coverArr = readCardSnapshot.data().cover;
      const contentArr = readCardSnapshot.data().content;
      const dateArr = readCardSnapshot.data().date;
      const senderNameArr = readCardSnapshot.data().senderName;
      coverArr.push(cardCover);
      contentArr.push(cardContent);
      dateArr.push(new Date());
      senderNameArr.push(user.displayName);
      await updateDoc(readCardRef, {
        cover: coverArr,
        content: contentArr,
        date: dateArr,
        senderName: senderNameArr,
      });
    } else {
      await setDoc(readCardRef, {
        cover: [cardCover],
        content: [cardContent],
        date: [new Date()],
        senderName: [user.displayName],
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export const resetCreateCard = async (user: User) => {
  try {
    const createCardRef = doc(db, "create", user.uid);
    await updateDoc(createCardRef, {
      cover: "",
      content: "",
    });
  } catch (error) {
    console.error(error);
  }
};

export const getReadCards = async (user: User) => {
  if (!user.email) return;

  try {
    const readCardRef = doc(db, "read", user.email);
    const readCardSnapshot = await getDoc(readCardRef);
    if (readCardSnapshot.exists()) {
      return readCardSnapshot.data();
    }
  } catch (error) {
    console.error(error);
  }
};
