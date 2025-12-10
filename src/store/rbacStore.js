import { create } from "zustand";

export const useRBACStore = create((set) => ({
  permissions: {},   
  setPermissions: (data) => set({ permissions: data }),
  getRoleMenu: (role) => {
    return Object.keys(useRBACStore.getState().permissions[role] || {});
  },
  canRead: (role, menu) => {
    const perm = useRBACStore.getState().permissions[role]?.[menu];
    return perm ? perm.read : false;
  },
  canWrite: (role, menu) => {
    const perm = useRBACStore.getState().permissions[role]?.[menu];
    return perm ? perm.write : false;
  }
}));
