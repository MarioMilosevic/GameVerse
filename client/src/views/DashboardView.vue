<template>
  <LoadingSpinner v-if="loading" />
  <AdminDashboard
    v-else
    :users-obj="usersObj"
    @edit-user-event="editUserHandler"
    @delete-user-event="deleteUserHandler"
  />
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { getUsers } from "src/api/users";
import { showToast } from "src/utils/toast";
import { UsersResponseType, UserType } from "src/utils/types";
import useGetLoadingStore from "src/composables/useGetLoadingStore";
import LoadingSpinner from "src/components/layout/others/LoadingSpinner.vue";
import AdminDashboard from "src/components/layout/dashboard/AdminDashboard.vue";

const { loading, setLoading } = useGetLoadingStore();

const usersObj = ref<UsersResponseType>({
  count: 0,
  users: [],
});

onBeforeMount(async () => {
  try {
    setLoading(true);
    const { data, message } = await getUsers();
    if (data) {
      const { allUsers, count } = data;
      usersObj.value.users = allUsers;
      usersObj.value.count = count;
    } else {
      showToast(message, "error");
    }
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
});

const editUserHandler = (editedUser: UserType) => {
  const index = usersObj.value.users.findIndex(
    (user) => user.id === editedUser.id
  );
  if (index !== -1) {
    usersObj.value.users[index] = editedUser;
  }
};

const deleteUserHandler = (id: number) => {
  const index = usersObj.value.users.findIndex((user) => user.id === id);
  if (index !== -1) {
    usersObj.value.users.splice(index, 1);
    usersObj.value.count -= 1;
  }
};
</script>
