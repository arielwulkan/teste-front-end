import Home from './components/Home.vue';
import Video from './components/Video.vue';
import VideoDetails from './components/VideoDetails.vue';

const routes = [
    { path: '/', component: Home, name: 'home' },
    { path: '/video/:id', component: Video, name: 'video' },
    { path: '/video_details/:id', component: VideoDetails }
];

export default routes;