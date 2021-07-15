<template>
  <footer class="bd-footer text-muted">
    <div class="container-fluid p-3 p-md-3">
      <p><a href="https://www.isaacxu.com">Copyright © {{year}} by isaac</a></p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  computed: {
    year: function () {
      return new Date().getFullYear()
    }
  }
}
</script>

<style scoped lang="scss">
  .bd-footer {
    margin-top: 4rem;
    font-size:.875rem;
    text-align: center;
    background-color: #f7f7f7;

    a {
      font-weight: normal;
      color: #495057;

      &:hover,
      &:focus {
        color: #42b983;
      }
    }

    p {
      margin-bottom: 0;
    }

    media-breakpoint-up(sm) {
      text-align: left;
    }
  }

  .bd-footer-links {
    padding-left: 0;
    margin-bottom: 1rem;

    li {
      display: inline-block;

      + li {
        margin-left: 1rem;
      }
    }
  }

</style>
