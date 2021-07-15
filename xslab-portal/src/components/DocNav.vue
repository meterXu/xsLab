<template>
  <div class="sidebar">
    <ul class="sidebar-links">
      <li v-for="(item, i) in menu" :key="i">
        <div class="sidebar-group">
          <p class="sidebar-heading"><span>{{ item.title }}</span></p>
          <ul class="sidebar-group-items">
            <li v-for="(st,j) in item.sub" :key="j">
              <router-link :to="st.to" class="sidebar-link" exact-active-class="sidebar-link-active" exact>{{st.title}}</router-link>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'DocNav',
  props: {
    menu: {
      default: null,
      type: Array
    }
  }
}
</script>

<style scoped>
  a{
    text-decoration: none;
  }
  .sidebar {
    font-size: 15px;
    background-color: #fff;
    width: 20rem;
    position: fixed;
    z-index: 10;
    margin: 0;
    top: 3.6rem;
    left: 0;
    bottom: 0;
    box-sizing: border-box;
    border-right: 1px solid #eaecef;
    overflow-y: auto;
  }
  @media screen and (max-width:600px){
    .sidebar{
      display: none;
    }
  }
  .sidebar .sidebar-links {
    padding: 1.5rem 0;
  }
  .sidebar ul {
    padding: 0;
    margin: 0;
    list-style-type: none;
  }
  .sidebar a {
    display: inline-block;
  }
  a.sidebar-link {
    font-weight: 400;
    display: inline-block;
    color: #2c3e50;
    border-left: .25rem solid transparent;
    padding: .35rem 1rem .35rem 1.25rem;
    line-height: 1.4;
    width: 100%;
    box-sizing: border-box;
  }
  .sidebar-group:not(.collapsable) .sidebar-heading {
    cursor: auto;
    color: inherit;
  }
  .sidebar-heading {
    color: #999;
    transition: color .15s ease;
    cursor: pointer;
    font-size: 1.1em;
    font-weight: 700;
    padding: 0 1.5rem;
    margin-top: 0;
    margin-bottom: .5rem;
  }
  .sidebar ul {
    padding: 0;
    margin: 0;
    list-style-type: none;
  }
  .sidebar-group-items {
    transition: height .1s ease-out;
    overflow: hidden;
  }
  .sidebar-group a.sidebar-link {
    padding-left: 2rem;
  }
  a.sidebar-link:hover {
    color: #3E4257;
  }
  a.sidebar-link.active {
    font-weight: 600;
    color: #3E4257;
    border-left-color: #3E4257;
  }
  a.sidebar-link-active{
    font-weight: 600;
    color: #3E4257;
    border-left-color: #3E4257;
  }
</style>
