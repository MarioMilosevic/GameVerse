<template>
  <main class="max-w-[1280px] mx-auto mt-12">
    <UsersTable>
      <template #header>
        <SubtitleComponent class="mb-12"> Dashboard </SubtitleComponent>
      </template>
      <template #head>
        <UserHeading />
      </template>
      <template #data>
        <UserData
          v-for="user in users"
          :key="user.id"
          :user="user"
          @delete-event="deleteUserHandler"
          @edit-event="editUserHandler"
        />
      </template>
    </UsersTable>

    <UserModal
      v-if="isUserModalOpen"
      :user="user"
      @close-modal-event="isUserModalOpen = false"
    />
  </main>
</template>

<script setup lang="ts">
import SubtitleComponent from "src/components/layout/others/SubtitleComponent.vue";
import UserData from "./UserData.vue";
import UsersTable from "src/components/layout/dashboard/UsersTable.vue";
import UserHeading from "src/components/layout/dashboard/UserHeading.vue";
import UserModal from "src/components/layout/dashboard/UserModal.vue";
import { UserType } from "src/utils/types";
import { PropType, ref } from "vue";
import { emptyUser } from "src/utils/constants";

const isUserModalOpen = ref<boolean>(false);
const user = ref<UserType>(emptyUser)

defineProps({
  users: {
    type: Array as PropType<UserType[]>,
    required: true,
  },
});

const deleteUserHandler = (id: number) => {
  console.log("radi", id);
};

const editUserHandler = (selectedUser: UserType) => {
  console.log(selectedUser)
  isUserModalOpen.value = true;
  user.value = selectedUser
  console.log("radi ", selectedUser);
};
</script>
