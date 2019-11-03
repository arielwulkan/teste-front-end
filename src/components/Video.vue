<template>
  <div class="container">
    <button class="btn btn-outline-secondary mt-2" @click="back()"><i class="fas fa-chevron-left"></i></button>
    <div class="col-md-6 mr-auto ml-auto">
        <div v-bind:key="video.id.videoId" v-for="video in videos">
          <h6 class="mb-3">{{ video.snippet.title }}</h6>
          <div class="embed-responsive embed-responsive-16by9">
            <iframe lass="embed-responsive-item" :src="'https://www.youtube.com/embed/'+video.id" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
          </div>
          <div class="d-flex justify-content-between mt-3">
            <p>{{video.snippet.channelTitle}}</p>
            <div class="d-flex">
              <p class="mr-2">
                <i class="fas fa-thumbs-up"></i>
                {{video.statistics.likeCount}}
              </p>
              <p>
                <i class="fas fa-thumbs-down"></i>
                {{video.statistics.dislikeCount}}
              </p>
            </div>
          </div>
          <p>Descrição: {{video.snippet.description}}</p>
          <p><i class="fas fa-eye"></i> {{video.statistics.viewCount}}</p>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { API_KEY } from '@/utils/api';

export default {
  name: 'Video',
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
        key: API_KEY,
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
    back() {
      this.$router.go(-1);
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