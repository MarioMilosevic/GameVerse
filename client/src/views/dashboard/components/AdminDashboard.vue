<template>
  <main class="max-w-[1280px] mx-auto mt-8 sm:mt-12">
    <UsersTable>
      <template #title>
        <PageSubtitle> Dashboard </PageSubtitle>
      </template>
      <template #header>
        <SearchHeader
          :sort="sort"
          :search="search"
          :users-obj="usersObj"
          @search-event="searchHandler"
          @sort-value-event="sortHandler"
        />
      </template>
      <template #head>
        <UserHeading />
      </template>

      <template #data>
        <UserData
          v-if="usersObj.users.length > 0"
          v-for="user in usersObj.users"
          :key="user.id"
          :user="user"
          @delete-event="openDeleteModalHandler"
          @edit-event="editUserHandler"
        />
        <NotFound v-else />
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
    <TablePagination
      :users="usersObj.count"
      :current-page="page"
      @previous-event="emits('previous-event')"
      @next-event="emits('next-event')"
    />
  </main>
</template>

<script setup lang="ts">
import PageSubtitle from "@/shared/components/PageSubtitle.vue";
import UserData from "./UserData.vue";
import UsersTable from "@/views/dashboard/components/UsersTable.vue";
import UserHeading from "@/views/dashboard/components/UserHeading.vue";
import UserModal from "@/views/dashboard/components/UserModal.vue";
import DeleteModal from "@/shared/components/DeleteModal.vue";
import NotFound from "@/views/dashboard/components/NotFound.vue";
import SearchHeader from "@/views/dashboard/components/SearchHeader.vue";
import TablePagination from "@/views/dashboard/components/TablePagination.vue";
import { UsersResponseType, UserType } from "@/utils/types";
import { PropType, ref } from "vue";
import { emptyUser } from "@/shared/constants";
import { deleteUser } from "@/api/users";
import { showToast } from "@/utils/helpers/showToast";

defineProps({
  usersObj: {
    type: Object as PropType<UsersResponseType>,
    required: true,
  },
  sort: {
    type: String,
    required: true,
  },
  search: {
    type: String,
    required: true,
  },
  page: {
    type: Number,
    required: true,
  },
});

const isUserModalOpen = ref<boolean>(false);
const isDeleteOpen = ref<boolean>(false);
const user = ref<UserType>(emptyUser);

const emits = defineEmits([
  "edit-user-event",
  "delete-user-event",
  "sort-value-event",
  "search-event",
  "previous-event",
  "next-event",
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

const searchHandler = (value: string) => emits("search-event", value.toLowerCase());
</script>
