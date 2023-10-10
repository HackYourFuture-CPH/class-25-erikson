import { create } from 'zustand';
import { NotificationInterface, NotificationState } from '../types';

const useNotificationStore = create<NotificationState>((set) => ({
  notification: null,
  setNotification: (notification: NotificationInterface | null) => set({ notification }),
}));

export default useNotificationStore;
