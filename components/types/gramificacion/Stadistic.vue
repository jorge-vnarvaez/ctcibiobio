<template>
  <div class="bg-slate-700 text-white absolute bottom-8 right-16 z-50 px-4 py-3 w-[250px]">
    <span class="block mb-4 text-xs font-bold">
      {{ foco_data.winner_title }}
    </span>

    <div>
      <div class="flex justify-between">
        <span class="text-[14px] font-bold text-slate-300">Ranking</span>
        <span class="text-[14px]">{{ index + (irrelevant ? 17 : 1) }}</span>
      </div>

      <div class="flex justify-between">
        <span class="text-[14px] font-bold text-slate-300">Aceptación</span>
        <span class="text-[14px]">{{
          parseFloat(foco_data.normalized_skill).toFixed(2)
        }}</span>
      </div>

      <div class="flex justify-between">
        <span class="text-[14px] font-bold text-slate-300">Victorias</span>
        <span class="text-[14px]">{{ foco_data.wins }}</span>
      </div>

      <div class="flex justify-between">
        <span class="text-[14px] font-bold text-slate-300">Derrotas</span>
        <span class="text-[14px]">{{ foco_data.loses }}</span>
      </div>

      <div class="flex justify-between">
        <span class="text-[14px] font-bold text-slate-300">% victorias</span>
        <span class="text-[14px]"
          >{{ parseFloat(foco_data.victory_percentage).toFixed(2) }}%</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    foco_data: {
      type: Object,
      default: null,
    },
    index: {
        type: Number,
        default: null,
    },
    irrelevant: {
        type: Boolean,
        default: false,
    }
  },
};
</script>

<style></style>
