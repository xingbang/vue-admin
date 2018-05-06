<template>
  <section class="app-main" style="min-height:100%;padding:30px;background-color: #f0f2f5;">
    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </section>
</template>
