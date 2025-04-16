<template>
  <LoadingSpinner v-if="loading" />
  <AdminDashboard
    v-else
    :users="users"
    :users-count="usersCount"
    @edit-user-event="editUserHandler"
    @delete-user-event="deleteUserHandler"
  />
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { getUsers } from "src/api/users";
import { showToast } from "src/utils/toast";
import { UserType } from "src/utils/types";
import useGetLoadingStore from "src/composables/useGetLoadingStore";
import LoadingSpinner from "src/components/layout/others/LoadingSpinner.vue";
import AdminDashboard from "src/components/layout/dashboard/AdminDashboard.vue";

const { loading, setLoading } = useGetLoadingStore();

const users = ref<UserType[]>([]);
const usersCount =ref<number>( 0);

onBeforeMount(async () => {
  try {
    setLoading(true);
    const { data, message } = await getUsers();
    if (data) {
      const { allUsers, count } = data;
      usersCount.value = count;
      users.value = allUsers;
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
  const index = users.value.findIndex((user) => user.id === editedUser.id);
  if (index !== -1) {
    users.value[index] = editedUser;
  }
};

const deleteUserHandler = (id: number) => {
  const index = users.value.findIndex((user) => user.id === id);
  if (index !== -1) {
    users.value.splice(index, 1);
  }
};
</script>
