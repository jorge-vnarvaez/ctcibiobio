<template>
  <div class="flex align-center lg:justify-center space-x-4">
    <div
      class="bg-blue-900 border-8 border-white rounded-full h-[80px] lg:h-[113px] w-[80px] lg:w-[113px] z-10"
    >
      <div class="flex h-full align-center justify-center">
        <font-awesome-icon
          :icon="item.icon"
          class="w-8 lg:w-10 h-8 lg:h-10 text-white"
        />
      </div>
    </div>

    <div>
      <div class="flex flex-col justify-center">
        <div class="flex">
          <span class="text-white text-3xl lg:text-5xl font-bold">
            +
          </span>
          <animated-number
              v-if="can_run"
              :value="item.value"
              :duration="3000"
              :delay="1000"
              :formatValue="formatValue"
              round
              class="text-white text-3xl lg:text-5xl font-bold"
            />

            <span v-if="!can_run" class="text-white text-3xl lg:text-5xl font-bold">
              {{ item.value }}
            </span>
        </div>
        
        <span class="text-white text-sm ml-4 font-bold">{{ item.label }}</span>
      </div>
    </div>
    
  </div>
</template>

<script>

import AnimatedNumber from "animated-number-vue";

export default {
  components: {
    AnimatedNumber,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    can_run: {
      type: Boolean,
      required: true,
    }
  },
  methods: {
    formatValue(value) {
      return value.toFixed(0);
    },
  }
};
</script>

<style></style>
