<template>
  <main class="max-w-[1280px] mx-auto mt-12">
    <UsersTable>
      <template #title>
        <SubtitleComponent class="mb-12"> Dashboard </SubtitleComponent>
      </template>
      <template #header>
        <header class="w-full flex justify-between items-center mb-8">
          <p class="semibold">{{ usersObj.count }} <span>total users</span></p>
          <FormInput
            :style="{ width: '70%' }"
            placeholder="Search for user..."
          />
          <FormBlock position="row" :style="{ width: '16%'}">
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
      <template #head>
        <UserHeading />
      </template>
      <template #data>
        <UserData
          v-for="user in usersObj.users"
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
import FormInput from "src/components/form/FormInput.vue";
import FormSelect from "src/components/form/FormSelect.vue";
import FormBlock from "src/components/form/FormBlock.vue";
import FormLabel from "src/components/form/FormLabel.vue";
import { UsersResponseType, UserType } from "src/utils/types";
import { PropType, ref } from "vue";
import { emptyUser, sortUserOptins } from "src/utils/constants";
import { deleteUser } from "src/api/users";
import { showToast } from "src/utils/toast";

const props = defineProps({
  usersObj: {
    type: Object as PropType<UsersResponseType>,
    required: true,
  },
  sort: {
    type: String,
    required: true,
  },
});

const isUserModalOpen = ref<boolean>(false);
const isDeleteOpen = ref<boolean>(false);
const user = ref<UserType>(emptyUser);
const sortValue = ref<string>(props.sort)


const emits = defineEmits([
  "edit-user-event",
  "delete-user-event",
  "sort-value-event",
]);

const deleteUserHandler = async (id: number) => {
  const response = await deleteUser(id);
  if (response?.ok) {
    emits("delete-user-event", id);
    showToast("User sucessfully deleted");
    isDeleteOpen.value = false;
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

const sortHandler = (value: string) => emits("sort-value-event", value);
</script>
