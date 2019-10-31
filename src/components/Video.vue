<template>
  <div>

    <ul>
      <li v-bind:key="video.id.videoId" v-for="video in videos">
        {{video.snippet.title}}
      </li>
    </ul>

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
      const { baseUrl, part, video_id, type, key } = this.api;
      const apiUrl = `${baseUrl}id=${video_id}&part=${part}&type=${type},statistic&key=${key}`;
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