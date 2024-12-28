import { create } from "zustand";

const userStore = (set) => ({
  user: null,

  setUser: (newUser) => {
    set((state) => {
      user: newUser;
    });
  },

  removeUser: () => {
    set(() => {
      user: null;
    });
  },
});

const useUserStore = create(userStore);
export default useUserStore;
