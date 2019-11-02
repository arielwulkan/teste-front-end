<template>
  <div class="container mb-3">
    <div class="d-flex mb-3">
      <div class="mr-auto">
        <h3>Resultados para "{{ reformattedSearchString }}"</h3>
      </div>
    </div>

    <div class="row">
      <div class="col-md-4 mb-4" v-bind:key="video.id.videoId" v-for="video in videos">
        <div class="card h-100">
          <VideoGridItem v-bind:video="video"/>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import VideoGridItem from './VideoGridItem';

export default {
  name: 'SearchResults',
  components: {
    VideoGridItem
  },
  data() {
    return {
      title: 'Search Results',
      displayMode: 'grid'
    };
  },
  methods: {
    changeDisplayMode(displayMode) {
      this.displayMode = displayMode;
    },
    handleScroll () {
      window.onscroll = () => {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;

        if (bottomOfWindow) {
          this.$emit('next-page');
        }
      };
    },
  },
  props: ['videos', 'reformattedSearchString', 'nextPageToken'],
  mounted() {
    this.handleScroll();
  }
};
</script>

<style scoped>
button:focus {
  box-shadow: none !important;
}
</style>