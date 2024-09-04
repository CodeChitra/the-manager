import { create } from "zustand";

type AuthStore = {
  token: string | null;
  setToken: (token: string | null) => void;
};

type ModalStore = {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  token: null,
  setToken: (token: string | null) => {
    set({ token });
  },
}));

export const useModalStore = create<ModalStore>((set) => ({
  isModalOpen: false,
  setIsModalOpen: (value: boolean) => {
    set({ isModalOpen: value });
  },
}));
