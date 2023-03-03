import { Pinia, createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

export const pinia: Pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
