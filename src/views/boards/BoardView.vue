<script setup lang="ts">
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, EllipsisHorizontalIcon, EllipsisVerticalIcon, PencilSquareIcon, PlusIcon, TrashIcon } from '@heroicons/vue/24/solid';
import {
  FwbButton, FwbDropdown
} from 'flowbite-vue'
import { useTemplateRef } from 'vue';

const columnContainer = useTemplateRef("column-container")

const scrollLeft = () => {
  columnContainer.value?.scroll({
    left: -100000,
    behavior: "smooth"
  });
}

const scrollRight = () => {
  columnContainer.value?.scroll({
    left: 100000,
    behavior: "smooth"
  });
}
</script>

<template>
  <div class="flex-1 flex flex-col overflow-scroll gap-4 p-4">
    <!-- Board Info Start -->
    <div class="flex items-center justify-between px-4">
      <h1 class="text-3xl" v-text="'{{ Board Name }}'"></h1>

      <div class="flex items-center gap-4">
        <div class="flex items-center justify-end gap-2">
          <fwb-button @click="scrollLeft" color="alternative" class="cursor-pointer">
            <ChevronDoubleLeftIcon class="w-5 h-5" />
          </fwb-button>

          <fwb-button @click="scrollRight" color="alternative" class="cursor-pointer">
            <ChevronDoubleRightIcon class="w-5 h-5" />
          </fwb-button>
        </div>

        <fwb-dropdown placement="bottom">
          <template #trigger>
            <fwb-button color="alternative" class="cursor-pointer">
              <template #prefix>
                <EllipsisVerticalIcon class="w-5 h-5" />
              </template>
              <span>Settings</span>
            </fwb-button>
          </template>
          <nav class="text-sm text-gray-700 dark:text-gray-200 *:cursor-pointer">
            <fwb-button href="#" color="alternative"
              class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full">
              <template #prefix>
                <PencilSquareIcon class="w-5 h-5" />
              </template>
              <span>Rename</span>
            </fwb-button>
            <fwb-button href="#" color="alternative"
              class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full">
              <template #prefix>
                <TrashIcon class="w-5 h-5" />
              </template>
              <span>Delete</span>
            </fwb-button>
          </nav>
        </fwb-dropdown>
      </div>
    </div>
    <!-- Board Info End -->

    <div ref="column-container" class="flex-1 overflow-scroll flex justify-start gap-4 pb-4">
      <!-- Columns Start -->
      <div class=" bg-slate-200 rounded-lg w-96 min-w-96 flex flex-col min-h-full">
        <div class="flex items-center justify-between px-4 my-1">
          <h1 class="text-2xl" v-text="'{{ Column Name }}'"></h1>
          <fwb-dropdown placement="bottom">
            <template #trigger>
              <EllipsisHorizontalIcon class="w-7 h-7 cursor-pointer" />
            </template>
            <nav class="text-sm text-gray-700 dark:text-gray-200 *:cursor-pointer">
              <fwb-button href="#" color="alternative"
                class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full">
                <template #prefix>
                  <PencilSquareIcon class="w-5 h-5" />
                </template>
                <span>Rename</span>
              </fwb-button>
              <fwb-button href="#" color="alternative"
                class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full">
                <template #prefix>
                  <TrashIcon class="w-5 h-5" />
                </template>
                <span>Delete</span>
              </fwb-button>
            </nav>
          </fwb-dropdown>
        </div>

        <div class="flex-1 flex flex-col gap-2 px-4 my-1 overflow-scroll *:rounded-lg *:p-4">
          <div class="bg-white text-black ">Lorem ipsum dolor sit
            amet consectetur
            adipisicing
            elit. Ullam
            accusantium
            reiciendis veritatis.</div>
          <div class="bg-white text-black">2</div>
          <div class="bg-white text-black">3</div>
          <div class="bg-white text-black">1</div>
          <div class="bg-white text-black">2</div>
          <div class="bg-white text-black">3</div>
          <div class="bg-white text-black">1</div>
          <div class="bg-white text-black">2</div>
          <div class="bg-white text-black">3</div>
          <div class="bg-white text-black">1</div>
          <div class="bg-white text-black">2</div>
          <div class="bg-white text-black">3</div>
          <div class="bg-white text-black">3</div>
          <div class="bg-white text-black">3</div>
          <div class="bg-white text-black">3</div>
          <div class="bg-white text-black">3</div>
          <div class="bg-white text-black">3</div>
          <div class="bg-white text-black">3</div>
          <div class="bg-white text-black">3</div>
        </div>

        <div>
          <button class="w-full flex items-center gap-2 p-4 cursor-pointer hover:bg-slate-300 rounded-b-lg">
            <PlusIcon class="w-6 h-6" />
            <span>Add Task</span>
          </button>
        </div>
      </div>
      <!-- Columns End -->

      <!-- Columns Start -->
      <div class=" bg-slate-200 rounded-lg w-96 min-w-96 flex flex-col min-h-full">
        <div class="flex items-center justify-between px-4 my-1">
          <h1 class="text-2xl" v-text="'{{ Column Name }}'"></h1>
          <fwb-dropdown placement="bottom">
            <template #trigger>
              <EllipsisHorizontalIcon class="w-7 h-7 cursor-pointer" />
            </template>
            <nav class="text-sm text-gray-700 dark:text-gray-200 *:cursor-pointer">
              <fwb-button href="#" color="alternative"
                class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full">
                <template #prefix>
                  <PencilSquareIcon class="w-5 h-5" />
                </template>
                <span>Rename</span>
              </fwb-button>
              <fwb-button href="#" color="alternative"
                class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full">
                <template #prefix>
                  <TrashIcon class="w-5 h-5" />
                </template>
                <span>Delete</span>
              </fwb-button>
            </nav>
          </fwb-dropdown>
        </div>

        <div class="flex-1 flex flex-col gap-2 px-4 my-1 overflow-scroll *:rounded-lg *:p-4">
          <div class="bg-white text-black ">Lorem ipsum dolor sit
            amet consectetur
            adipisicing
            elit. Ullam
            accusantium
            reiciendis veritatis.</div>
          <div class="bg-white text-black">2</div>
          <div class="bg-white text-black">3</div>
        </div>

        <div>
          <button class="w-full flex items-center gap-2 p-4 cursor-pointer hover:bg-slate-300 rounded-b-lg">
            <PlusIcon class="w-6 h-6" />
            <span>Add Task</span>
          </button>
        </div>
      </div>
      <!-- Columns End -->

      <!-- Columns Start -->
      <div class=" bg-slate-200 rounded-lg w-96 min-w-96 flex flex-col min-h-full">
        <div class="flex items-center justify-between px-4 my-1">
          <h1 class="text-2xl" v-text="'{{ Column Name }}'"></h1>
          <fwb-dropdown placement="bottom">
            <template #trigger>
              <EllipsisHorizontalIcon class="w-7 h-7 cursor-pointer" />
            </template>
            <nav class="text-sm text-gray-700 dark:text-gray-200 *:cursor-pointer">
              <fwb-button href="#" color="alternative"
                class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full">
                <template #prefix>
                  <PencilSquareIcon class="w-5 h-5" />
                </template>
                <span>Rename</span>
              </fwb-button>
              <fwb-button href="#" color="alternative"
                class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full">
                <template #prefix>
                  <TrashIcon class="w-5 h-5" />
                </template>
                <span>Delete</span>
              </fwb-button>
            </nav>
          </fwb-dropdown>
        </div>

        <div class="flex-1 flex flex-col gap-2 px-4 my-1 overflow-scroll *:rounded-lg *:p-4">
          <div class="bg-white text-black ">Lorem ipsum dolor sit
            amet consectetur
            adipisicing
            elit. Ullam
            accusantium
            reiciendis veritatis.</div>
          <div class="bg-white text-black ">Lorem ipsum dolor sit
            amet consectetur
            adipisicing
            elit. Ullam
            accusantium
            reiciendis veritatis.</div>
          <div class="bg-white text-black ">Lorem ipsum dolor sit
            amet consectetur
            adipisicing
            elit. Ullam
            accusantium
            reiciendis veritatis.</div>
          <div class="bg-white text-black ">Lorem ipsum dolor sit
            amet consectetur
            adipisicing
            elit. Ullam
            accusantium
            reiciendis veritatis.</div>
          <div class="bg-white text-black ">Lorem ipsum dolor sit
            amet consectetur
            adipisicing
            elit. Ullam
            accusantium
            reiciendis veritatis.</div>
          <div class="bg-white text-black ">Lorem ipsum dolor sit
            amet consectetur
            adipisicing
            elit. Ullam
            accusantium
            reiciendis veritatis.</div>
        </div>

        <div>
          <button class="w-full flex items-center gap-2 p-4 cursor-pointer hover:bg-slate-300 rounded-b-lg">
            <PlusIcon class="w-6 h-6" />
            <span>Add Task</span>
          </button>
        </div>
      </div>
      <!-- Columns End -->

      <!-- Columns Start -->
      <div class=" bg-slate-200 rounded-lg w-96 min-w-96 flex flex-col min-h-full">
        <div class="flex items-center justify-between px-4 my-1">
          <h1 class="text-2xl" v-text="'{{ Column Name }}'"></h1>
          <fwb-dropdown placement="bottom">
            <template #trigger>
              <EllipsisHorizontalIcon class="w-7 h-7 cursor-pointer" />
            </template>
            <nav class="text-sm text-gray-700 dark:text-gray-200 *:cursor-pointer">
              <fwb-button href="#" color="alternative"
                class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full">
                <template #prefix>
                  <PencilSquareIcon class="w-5 h-5" />
                </template>
                <span>Rename</span>
              </fwb-button>
              <fwb-button href="#" color="alternative"
                class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full">
                <template #prefix>
                  <TrashIcon class="w-5 h-5" />
                </template>
                <span>Delete</span>
              </fwb-button>
            </nav>
          </fwb-dropdown>
        </div>

        <div class="flex-1 flex flex-col gap-2 px-4 my-1 overflow-scroll *:rounded-lg *:p-4">
          <div class="bg-white text-black ">Lorem ipsum dolor sit
            amet consectetur
            adipisicing
            elit. Ullam
            accusantium
            reiciendis veritatis.</div>
          <div class="bg-white text-black">2</div>
          <div class="bg-white text-black">3</div>
          <div class="bg-white text-black">1</div>
          <div class="bg-white text-black">2</div>
          <div class="bg-white text-black">3</div>
          <div class="bg-white text-black">1</div>
          <div class="bg-white text-black">2</div>
          <div class="bg-white text-black">3</div>
          <div class="bg-white text-black">1</div>
          <div class="bg-white text-black">2</div>
          <div class="bg-white text-black">3</div>
          <div class="bg-white text-black">3</div>
          <div class="bg-white text-black">3</div>
          <div class="bg-white text-black">3</div>
          <div class="bg-white text-black">3</div>
          <div class="bg-white text-black">3</div>
          <div class="bg-white text-black">3</div>
          <div class="bg-white text-black">3</div>
        </div>

        <div>
          <button class="w-full flex items-center gap-2 p-4 cursor-pointer hover:bg-slate-300 rounded-b-lg">
            <PlusIcon class="w-6 h-6" />
            <span>Add Task</span>
          </button>
        </div>
      </div>
      <!-- Columns End -->

      <div class="bg-slate-200 rounded-lg w-96 min-w-96 h-fit">
        <button class="w-full flex items-center gap-2 p-4 cursor-pointer hover:bg-slate-300 rounded-lg">
          <PlusIcon class="w-6 h-6" />
          <span>Add Column</span>
        </button>
      </div>
    </div>


  </div>


</template>