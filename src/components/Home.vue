<template>
  <div>
<!--    <button-->
<!--        class="neo-button btn-before">-->
<!--      Убрать первый символ-->
<!--    </button>-->
    <div id="type" class="mx-auto" :key=isRerender>
      {{ fetchedString }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      fetchedString: 'QWERTYUIOPASDFGHJKLZXCVBNM',
      isRerender: true,
    }
  },
  methods: {
    keyDown(event) {
      if (event.key === this.fetchedString[0]) {
        this.fetchedString = this.fetchedString.substring(1);
      }
    },
  },
  mounted() {
    document.addEventListener('keydown', this.keyDown);
  },
}
</script>


<style scoped>
.neo-button {
  padding: 10px;
  background-color: #EFEEEE;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  cursor: pointer;
}

.btn-before {
  box-shadow:
      6px 6px 16px 0 rgba(0, 0, 0, 0.25),
      -6px -6px 12px 0 rgba(255, 255, 255, 0.3);
}

.btn-after {
  box-shadow:
      6px 6px 16px 0 rgba(255, 255, 255, 0.3) inset,
      -6px -6px 12px 0 rgba(0, 0, 0, 0.25) inset;
}

#type {
  padding-left: 50px;
  height: 200px;
  width: 100%;
  font-size: 98px;
  text-align: left;
}

div:first-letter {
  color: darkslategrey;
}
</style>
