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
        count: 0,
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export const saveCreateCard = async (
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

export const sendCreateCard = async (
  cardCover: string,
  cardContent: string,
  recipientEmail: string,
  user: User
) => {
  try {
    const usersSnapsshot = await getDocs(collection(db, "users"));
    const allUsers = usersSnapsshot.docs.map((doc) => doc.data());
    const recipient = allUsers.find((u) => u.email === recipientEmail);
    if (!recipient) {
      alert("Recipient email not found");
      return false;
    }
    const recipientUID = recipient.uid;
    const readCardRef = doc(db, "read", recipientUID);
    const readCardSnapshot = await getDoc(readCardRef);
    if (readCardSnapshot.exists()) {
      const cardsObjArr = readCardSnapshot.data();
      cardsObjArr.cards.push({
        cover: cardCover,
        content: cardContent,
        date: new Date(),
        senderName: user.displayName,
        count: cardsObjArr.cards.length,
      });
      await updateDoc(readCardRef, {
        cards: cardsObjArr.cards,
      });
    } else {
      await setDoc(readCardRef, {
        cards: [
          {
            cover: cardCover,
            content: cardContent,
            date: new Date(),
            senderName: user.displayName,
            count: 0,
          },
        ],
      });
    }
    return true;
  } catch (error) {
    console.error(error);
  }
};

export const resetCreateCard = async (user: User) => {
  try {
    const createCardRef = doc(db, "create", user.uid);
    const createCardSnapshot = await getDoc(createCardRef);
    const createCardData = createCardSnapshot.data();
    const count = createCardData?.count;
    await updateDoc(createCardRef, {
      cover: "",
      content: "",
      count: count + 1,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getReadCards = async (uid: string) => {
  try {
    const readCardRef = doc(db, "read", uid);
    const readCardSnapshot = await getDoc(readCardRef);
    if (readCardSnapshot.exists()) {
      const readCardData = readCardSnapshot.data();
      return readCardData;
    }
  } catch (error) {
    console.error(error);
  }
};

export const getReadCardById = async (uid: string, id: number) => {
  try {
    const readCardRef = doc(db, "read", uid);
    const readCardSnapshot = await getDoc(readCardRef);
    if (readCardSnapshot.exists()) {
      const readCardData = readCardSnapshot.data();
      return readCardData.cards[id];
    }
  } catch (error) {
    console.error(error);
  }
};

export const getCreateCardId = async (user: User) => {
  try {
    const createCardRef = doc(db, "create", user.uid);
    const createCardSnapshot = await getDoc(createCardRef);
    const createCardData = createCardSnapshot.data();
    return createCardData?.count;
  } catch (error) {
    console.error(error);
  }
};
