<template>
  <div class="tm-message">
    <publish></publish>
    <timeline></timeline>
    <div class="tm-message__pagination">
      <pagination :page-count="pageCount" :current-page="currentPage" @change="handlePageChange"></pagination>
    </div>
  </div>
</template>

<script>
  import Publish from './message/publish.vue'
  import Timeline from './message/timeline.vue'
  import Pagination from './message/pagination.vue'

  export default {
    name: 'TmMessage',

    components: {
      Publish,
      Timeline,
      Pagination
    },

    data () {
      return {
        pageCount: 10,
        currentPage: 3
      }
    },

    methods: {
      handlePageChange (page) {
        this.currentPage = page
      }
    }
  }
</script>

<style lang="postcss">
  @component-namespace tm {

    @b message {
      position: relative;
      max-width: 80rem;
      min-width: 20rem;
      margin-right: auto;
      margin-left: auto;
      padding-right: 1rem;
      padding-left: 1rem;
      box-sizing: border-box;

      @e pagination {
        margin: 1rem 0;
        text-align: center;
      }
    }
  }

  @media (max-width: 85.375rem) {
    @component-namespace tm {

      @b message {
        max-width:71.25rem
      }
    }
  }

  @media (max-width: 64rem) {
    @component-namespace tm {

      @b message {
        max-width:53.75rem
      }
    }
  }

  @media (max-width: 55rem) {
    @component-namespace tm {

      @b message {
        max-width:43.125rem
      }
    }
  }
</style>
