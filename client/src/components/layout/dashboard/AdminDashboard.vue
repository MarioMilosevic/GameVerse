<template>
  <main class="max-w-[1280px] mx-auto border mt-12">
    <SubtitleComponent> Dashboard </SubtitleComponent>
    <UsersTable>
      <UserData v-for="user in users" :key="user.id" :user="user"/>  
    </UsersTable>
  </main>
</template>

<script setup lang="ts">
import SubtitleComponent from "src/components/layout/others/SubtitleComponent.vue";
import UserData from "./UserData.vue";
import UsersTable from "src/components/layout/dashboard/UsersTable.vue";
import { UserType } from "src/utils/types";
import { PropType } from "vue";

defineProps({
  users: {
    type: Array as PropType<UserType[]>,
    required: true,
  },
});
</script>
