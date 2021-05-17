<template>
  <div>
    <button type="button" class="neo-button btn-before">Large button</button>
  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>


<style scoped>
.neo-button {
  margin-top: 25%;
  padding: 10px;
  background-color: #EFEEEE;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
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
</style>
