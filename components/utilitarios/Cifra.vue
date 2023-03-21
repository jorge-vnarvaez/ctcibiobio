<template>
  <div>
    <div
      name="icon"
      class="bg-blue-900 rounded-full h-[40px] w-[40px] z-10 relative top-8 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      <div class="flex h-full align-center justify-center">
        <font-awesome-icon
          :icon="item.icon"
          class="w-4 h-4 text-white"
        />
      </div>
    </div>
    <div class="bg-amber-400 drop-shadow-xl h-[116px] w-[272px] rounded-xl">
      <div class="flex flex-col align-center justify-center text-white h-full">
        <span class="text-4xl font-bold">{{ item.value }}</span>
        <span class="text-sm font-bold">{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style></style>
