<template>
  <div class="loader">
    <div class="image-container">
      <v-img src="/img/iso_ctci.png" width="150" height="150" contain></v-img>
      <span>Ciencia, Tecnología, Conocimiento e Innovación</span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #ffffff;
  padding: 0 5rem;
}

.image-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  opacity: 0;
  animation-name: fade-in;
  animation-duration: 1s;
  animation-delay: 0.5s;
  animation-fill-mode: forwards;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.image-container span {
  font-size: 1.2rem;
  color: #888888;
  opacity: 0;
  animation-name: slide-up;
  animation-duration: 0.5s;
  animation-delay: 1s;
  animation-fill-mode: forwards;
}

@keyframes slide-up {
  from {
    transform: translateY(1rem);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

</style>
