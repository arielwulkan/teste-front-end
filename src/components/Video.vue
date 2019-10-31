<template>
  <div class="container">
    <div class="justify-content-md-center mt-5">
      <div class="col-md-6 text-centered">

          <div v-bind:key="video.id.videoId" v-for="video in videos">
            
            <img :src="video.snippet.thumbnails.medium.url" alt="YouTube thumbnail">
            <p>{{video.snippet.channelTitle}}</p>
            <p>Likes: {{video.statistics.likeCount}}</p>
            <p>Diskes: {{video.statistics.dislikeCount}}</p>
            <p>Descrição: {{video.snippet.description}}</p>
            <p>Views: {{video.statistics.viewCount}}</p>
          </div>

      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Video',
  props: ['videoId'],
  data() {
    return {
      videos: [],
      reformattedSearchString: '',
      api: {
        baseUrl: 'https://www.googleapis.com/youtube/v3/videos?',
        part: 'snippet',
        type: 'video',
        order: 'viewCount',
        maxResults: 12,
        video_id: this.$route.params.id,
        key: 'AIzaSyB5u43mc2kk-ABL9X5neCp0r27v8fTIGIU',
        prevPageToken: '',
        nextPageToken: ''
      }
    };
  },
  methods: {
    search() {
      const { baseUrl, part, video_id, key } = this.api;
      const apiUrl = `${baseUrl}id=${video_id}&part=${part},statistics&key=${key}`;
      this.getData(apiUrl);
    },

    getData(apiUrl) {
      axios
        .get(apiUrl)
        .then(res => {
          this.videos = res.data.items;
          this.api.prevPageToken = res.data.prevPageToken;
          this.api.nextPageToken = res.data.nextPageToken;
        })
        //.catch(error => console.log(error));
    }
  },
  created: function() {
    //this.console.log(this.$route.params.id)
    this.search()
  }
};
</script>