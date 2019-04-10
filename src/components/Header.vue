<template>
  <header class="header">
    <div class="header_inner">
      <h1 class="header_title">Memory Training</h1>
      <div class="header_info">created with Vue.js</div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style lang="scss" scoped>
.header {
  &_inner {
    margin-top: 40px;
  }

  &_title {
    text-align: center;
    font-size: 3.8rem;
    color: $cr-green;
    text-shadow: 1px 1px 1px lighten($cr-black, 20%);

    @include mq("tab") {
      font-size: 6.4rem;
      margin-left: -10px;
      text-shadow: 3px 3px 3px lighten($cr-black, 20%);
    }
  }

  &_info {
    margin-top: 10px;
    text-align: center;
    color: $cr-black;

    @include mq("tab") {
      font-size: 2rem;
    }
  }
}
</style>
