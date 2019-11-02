import Home from './components/Home.vue';
import Video from './components/Video.vue';

const routes = [
    { path: '/', component: Home, name: 'home', meta: { keepAlive: true } },
    { path: '/video/:id', component: Video, name: 'video', meta: { keepAlive: false } },
];

export default routes;