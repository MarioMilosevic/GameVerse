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
          @delete-event="openDeleteModalHandler"
          @edit-event="editUserHandler"
        />
      </template>
    </UsersTable>

    <UserModal
      v-if="isUserModalOpen"
      :user="user"
      @close-modal-event="isUserModalOpen = false"
      @submit-event="submitHandler"
    />

    <DeleteModal
      :is-delete-open="isDeleteOpen"
      :user="user"
      @delete-event="deleteUserHandler"
      @close-modal-event="isDeleteOpen = false"
    />
  </main>
</template>

<script setup lang="ts">
import SubtitleComponent from "src/components/layout/others/SubtitleComponent.vue";
import UserData from "./UserData.vue";
import UsersTable from "src/components/layout/dashboard/UsersTable.vue";
import UserHeading from "src/components/layout/dashboard/UserHeading.vue";
import UserModal from "src/components/layout/dashboard/UserModal.vue";
import DeleteModal from "src/components/layout/others/DeleteModal.vue";
import { UserType } from "src/utils/types";
import { PropType, ref } from "vue";
import { emptyUser } from "src/utils/constants";
import { deleteUser } from "src/api/users";
import { showToast } from "src/utils/toast";

const isUserModalOpen = ref<boolean>(false);
const isDeleteOpen = ref<boolean>(false);
const user = ref<UserType>(emptyUser);

defineProps({
  users: {
    type: Array as PropType<UserType[]>,
    required: true,
  },
});

const emits = defineEmits(["edit-user-event"]);

const deleteUserHandler = async (id: number) => {
  console.log("da brise iz baze", id);
  const response = await deleteUser(id);
  if (response?.ok) {
    console.log("user deleted");
  } else {
    const { message } = await response?.json();
    showToast(message, "error");
  }
};

const openDeleteModalHandler = (deleteUser: UserType) => {
  isDeleteOpen.value = true;
  user.value = deleteUser;
};

const editUserHandler = (selectedUser: UserType) => {
  isUserModalOpen.value = true;
  user.value = selectedUser;
};

const submitHandler = (updatedUser: UserType) => {
  emits("edit-user-event", updatedUser);
  isUserModalOpen.value = false;
};
</script>
