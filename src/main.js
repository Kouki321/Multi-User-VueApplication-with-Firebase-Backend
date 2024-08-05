// main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { QuillEditor } from 'vue3-quill';

import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

const app = createApp(App);

app.use(store);
app.use(router);
app.component('QuillEditor', QuillEditor); // Register QuillEditor globally

app.mount('#app');
