import { create } from "zustand";

type AuthStore = {
  token: string | null;
  setToken: (token: string | null) => void;
};

type ModalStore = {
  isCreateEmployeeModalOpen: boolean;
  isUpdateEmployeeModalOpen: boolean;
  isDeleteEmployeeModalOpen: boolean;
  isCreateTaskModalOpen: boolean;
  isUpdateTaskModalOpen: boolean;
  isRemoveTaskModalOpen: boolean;
  setIsCreateEmployeeModalOpen: (value: boolean) => void;
  setIsUpdateEmployeeModalOpen: (value: boolean) => void;
  setIsDeleteEmployeeModalOpen: (value: boolean) => void;
  setIsCreateTaskModalOpen: (value: boolean) => void;
  setIsUpdateTaskModalOpen: (value: boolean) => void;
  setIsRemoveTaskModalOpen: (value: boolean) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  token: null,
  setToken: (token: string | null) => {
    set({ token });
  },
}));

export const useModalStore = create<ModalStore>((set) => ({
  isCreateEmployeeModalOpen: false,
  setIsCreateEmployeeModalOpen: (value: boolean) => {
    set({ isCreateEmployeeModalOpen: value });
  },
  isUpdateEmployeeModalOpen: false,
  setIsUpdateEmployeeModalOpen: (value: boolean) => {
    set({ isUpdateEmployeeModalOpen: value });
  },
  isDeleteEmployeeModalOpen: false,
  setIsDeleteEmployeeModalOpen: (value: boolean) => {
    set({ isDeleteEmployeeModalOpen: value });
  },
  isCreateTaskModalOpen: false,
  setIsCreateTaskModalOpen: (value: boolean) => {
    set({ isCreateTaskModalOpen: value });
  },
  isUpdateTaskModalOpen: false,
  setIsUpdateTaskModalOpen: (value: boolean) => {
    set({ isUpdateTaskModalOpen: value });
  },
  isRemoveTaskModalOpen: false,
  setIsRemoveTaskModalOpen(value) {
    set({ isRemoveTaskModalOpen: value });
  },
}));
