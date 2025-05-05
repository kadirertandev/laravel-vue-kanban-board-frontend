<script setup lang="ts">
import { FwbCard, FwbButton } from 'flowbite-vue'

let boards = [
  { id: 1, name: "Eddie Shelton Eddie Shelton Eddie Shelton Eddie Shelton Eddie Shelton Eddie Shelton Eddie Shelton" },
  { id: 2, name: "George Rowe" },
  { id: 3, name: "Delia Soto" },
  { id: 4, name: "Sylvia Obrien" },
  { id: 5, name: "Craig Burton" },
  { id: 6, name: "Dustin Waters" },
  { id: 7, name: "Roy Owen" },
  { id: 8, name: "Lucile Fletcher" },
  { id: 9, name: "Bettie Ball" },
  { id: 10, name: "Della Copeland" },
  { id: 11, name: "Eddie Shelton" },
  { id: 12, name: "George Rowe" },
  { id: 13, name: "Delia Soto" },
  { id: 14, name: "Sylvia Obrien" },
  { id: 15, name: "Craig Burton" },
  { id: 16, name: "Dustin Waters" },
  { id: 17, name: "Roy Owen" },
  { id: 18, name: "Lucile Fletcher" },
  { id: 19, name: "Bettie Ball" },
  { id: 13, name: "Delia Soto" },
  { id: 14, name: "Sylvia Obrien" },
  { id: 15, name: "Craig Burton" },
  { id: 16, name: "Dustin Waters" },
  { id: 17, name: "Roy Owen" },
  { id: 18, name: "Lucile Fletcher" },
  { id: 19, name: "Bettie Ball" },
  { id: 20, name: "Lucile Fletcher" },
  { id: 21, name: "Bettie Ball" },
];
// boards = [];
</script>

<template>
  <div class="flex-1 flex flex-col p-4 overflow-scroll">
    <div class="mb-2">
      <fwb-button color="dark" class="cursor-pointer">Create Board</fwb-button>
    </div>

    <div v-if="boards.length > 0" class="grid grid-cols-1 md:grid-cols-4 gap-2">
      <fwb-card v-for="(board, index) in boards" :key="index" class="h-24 overflow-scroll shadow-2xs shadow-slate-500">
        <RouterLink :to="{ name: 'boardView', params: { boardId: board.id } }">
          <div class="p-5 ">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white ">
              {{ board.name }}
            </h5>
          </div>
        </RouterLink>
      </fwb-card>
    </div>
    <div v-else class="flex-1 flex items-center justify-center">
      <h1 class="text-3xl italic">No board found.</h1>
    </div>
  </div>


</template>