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

export const getCardInfo = async (
  user: User,
  setCardCover: Dispatch<SetStateAction<boolean>>,
  setCardContent: Dispatch<SetStateAction<boolean>>
) => {
  try {
    const createCardRef = doc(db, "create", user.uid);
    const createCardSnapshot = await getDoc(createCardRef);
    if (createCardSnapshot.exists()) {
      if (
        createCardSnapshot.data().cover &&
        createCardSnapshot.data().content
      ) {
        setCardCover(true);
        setCardContent(true);
      } else if (createCardSnapshot.data().content) {
        setCardContent(true);
      } else if (createCardSnapshot.data().cover) {
        setCardCover(true);
      } else {
        setCardCover(false);
        setCardContent(false);
      }
    }
  } catch (error) {
    console.error(error);
  }
};
