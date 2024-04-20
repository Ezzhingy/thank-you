import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/firebase/firebase";

export const uploadCard = async (filePath: string, card: File) => {
  try {
    const cardRef = ref(storage, filePath);
    await uploadBytesResumable(cardRef, card);
    return await getDownloadURL(cardRef);
  } catch (error) {
    console.error(error);
  }
};
