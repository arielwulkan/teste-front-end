<template>
  <div>
    <img class="card-img-top" :src="video.snippet.thumbnails.medium.url" alt="YouTube thumbnail">
    <div class="card-body">
      <h5 class="card-title">{{ video.snippet.title }}</h5>
      <h6
        class="card-subtitle mb-2 text-muted"
      >{{ video.snippet.channelTitle }}</h6>
      <p class="card-text">{{ video.snippet.description }}</p>
      <router-link :to="{name: 'video', params: {id: video.id.videoId}}">
        <button class="btn btn-outline-info">DETALHES DO VÍDEO</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VideoGridItem',
  props: ['video']
};
</script>