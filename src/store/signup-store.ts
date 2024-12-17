import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createSelectors } from "./create-selectors";
import { ROLE } from "@prisma/client";

type SignupStateType = {
  role?: ROLE;
  fullname?: string;
  phoneNum?: string;
  selfie?: File;
  latitude?: number;
  longitude?: number;
  setRole: (role: ROLE) => void;
  setFullname: (role: string) => void;
  setPhoneNum: (role: string) => void;
  setSelfie: (role: File) => void;
  setLatitude: (role: number) => void;
  setLongitude: (role: number) => void;
  reset: () => void;
};

const useSignupStore = create<SignupStateType>()(
  immer(
    persist(
      (set) => ({
        role: undefined,
        fullname: undefined,
        phoneNum: undefined,
        selfie: undefined,
        longitude: undefined,
        latitude: undefined,
        setRole: (role: ROLE) => set(() => ({ role })),
        setFullname: (fullname: string) => set(() => ({ fullname })),
        setPhoneNum: (phoneNum: string) => set(() => ({ phoneNum })),
        setSelfie: (selfie: File) => set(() => ({ selfie })),
        setLongitude: (longitude: number) => set(() => ({ longitude })),
        setLatitude: (latitude: number) => set(() => ({ latitude })),
        reset: () =>
          set({
            role: undefined,
            fullname: undefined,
            phoneNum: undefined,
            selfie: undefined,
            longitude: undefined,
            latitude: undefined,
          }),
      }),
      { name: "signupStore" }
    )
  )
);

export const useSignupStoreSelector = createSelectors(useSignupStore);
