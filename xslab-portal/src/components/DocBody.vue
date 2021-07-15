<template>
  <div>
    <div>
      <iframe :src="htmlUrl" v-if="isHtml"></iframe>
    </div>
    <vue-markdown v-if="body" :source="body"></vue-markdown>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import hljs from 'highlight.js'
import 'highlight.js/styles/agate.css'
export default {
  name: 'DocBody',
  props: {
    type: {
      default: '0',
      type: String
    },
    id: {
      default: '1',
      type: String
    },
    html: {
      default: '0',
      type: String
    }
  },
  components: {
    VueMarkdown
  },
  data () {
    return {
      body: null,
      htmlUrl: null
    }
  },
  computed: {
    isHtml: function () {
      if (this.html && this.html === '1') {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    id (nv) {
      this.setBody(this.type, nv, this.html)
    },
    type (nv) {
      this.setBody(nv, this.id, this.html)
    }
  },
  methods: {
    setBody (type, id, html) {
      if (id) {
        this.axios.get(this.$backUrl + type + '_' + id + '.md').then(c => {
          this.body = c.data
        })
      }
      if (html && html === '1') {
        this.htmlUrl = this.$backUrl + type + '_' + id + '.html'
      }
    }
  },
  updated () {
    let blocks = this.$el.querySelectorAll('pre code')
    blocks.forEach((block) => {
      hljs.highlightBlock(block)
    })
    let ps = this.$el.querySelectorAll('blockquote p ')
    ps.forEach((p) => {
      p.classList.add('blockquote_p')
    })
  },
  mounted () {
    this.setBody(this.type, this.id, this.html)
  }
}
</script>

<style scoped>
  .blockquote_p {
    border-left: 0.5rem solid #17A2B8;
    padding-inline-start: 0.8rem;
    background: #f3f5f7;
    padding-block-start: 0.5rem;
    padding-block-end: 0.5rem;
  }
  .hljs{
    font-size: 0.85rem;
    background-color: #282c34;
    padding: 1.25rem;
    border-radius: 6px;
  }
  iframe{
    border: none;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 800px;
  }
  img{
    box-sizing: border-box;
  }
</style>
