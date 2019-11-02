<template>
  <div>
    <Header/>
    <SearchForm v-on:search="search"/>
    <SearchResults
      v-if="videos.length > 0"
      v-bind:videos="videos"
      v-bind:reformattedSearchString="reformattedSearchString"
      v-on:next-page="nextPage"
    />
    <NoResults v-if="noResults"></NoResults>
  </div>
</template>

<script>
import Header from './layout/Header';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import NoResults from './NoResults';
import axios from 'axios';

export default {
  name: 'Home',
  components: {
    Header,
    SearchForm,
    SearchResults,
    NoResults
  },
  data() {
    return {
      videos: [],
      reformattedSearchString: '',
      noResults: false,
      api: {
        baseUrl: 'https://www.googleapis.com/youtube/v3/search?',
        part: 'snippet',
        type: 'video',
        order: 'viewCount',
        maxResults: 12,
        q: '',
        key: 'AIzaSyCyLyT_Gk3Q2tw-CHLj5W2nXs7aSY8PAjI',
        prevPageToken: '',
        nextPageToken: ''
      }
    };
  },
  methods: {
    search(searchParams) {
      this.videos = []
      this.reformattedSearchString = searchParams.join(' ');
      this.api.q = searchParams.join('+');
      const { baseUrl, part, type, order, maxResults, q, key } = this.api;
      const apiUrl = `${baseUrl}part=${part}&type=${type}&order=${order}&q=${q}&maxResults=${maxResults}&key=${key}`;
      this.getData(apiUrl);
    },

    prevPage() {
      const { baseUrl, part, type, order, maxResults, q, key, prevPageToken } = this.api;
      const apiUrl = `${baseUrl}part=${part}&type=${type}&order=${order}&q=${q}&maxResults=${maxResults}&key=${key}&pageToken=${prevPageToken}`;
      this.getData(apiUrl);
    },

    nextPage() {
      const { baseUrl, part, type, order, maxResults, q, key, nextPageToken } = this.api;
      const apiUrl = `${baseUrl}part=${part}&type=${type}&order=${order}&q=${q}&maxResults=${maxResults}&key=${key}&pageToken=${nextPageToken}`;
      this.getData(apiUrl);
    },

    getData(apiUrl) {
      axios
        .get(apiUrl)
        .then(res => {
          let items = []
          items = res.data.items;
          this.videos.push(...items);
          this.api.prevPageToken = res.data.prevPageToken;
          this.api.nextPageToken = res.data.nextPageToken;
          if (items.length == 0){
            this.noResults = true
          }
        })
        //.catch(error => console.log(error));
    }
    
  }
};
</script>