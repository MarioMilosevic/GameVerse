<template>
  <header class="w-full flex justify-between items-center mb-8">
    <p class="semibold">{{ usersObj.count }} <span>total users</span></p>
    <FormInput
      :style="{ width: '70%' }"
      placeholder="Search for user..."
      v-model="searchValue"
      @update:model-value="searchHandler"
    />
    <FormBlock position="row" :style="{ width: '16%' }">
      <template #label>
        <FormLabel id="sort">Sort by:</FormLabel>
      </template>
      <template #input>
        <FormSelect
          id="sort"
          :options="sortUserOptins"
          v-model="sortValue"
          @update:model-value="sortHandler"
        />
      </template>
    </FormBlock>
  </header>
</template>

<script setup lang="ts">
import FormInput from "src/components/form/FormInput.vue";
import FormSelect from "src/components/form/FormSelect.vue";
import FormBlock from "src/components/form/FormBlock.vue";
import FormLabel from "src/components/form/FormLabel.vue";
import { PropType, ref } from "vue";
import { UsersResponseType } from "src/utils/types";
import { sortUserOptins } from "src/utils/constants";

const props = defineProps({
  usersObj: {
    type: Object as PropType<UsersResponseType>,
    required: true,
  },
  search: {
    type: String,
    required: true,
  },
  sort: {
    type: String,
    required: true,
  },
});

const searchValue = ref<string>(props.search);
const sortValue = ref<string>(props.sort);

const emits = defineEmits(["sort-value-event", "search-event"]);

const sortHandler = (value: string) => emits("sort-value-event", value);

const searchHandler = (value: string) =>
  emits("search-event", value.toLowerCase());
</script>
