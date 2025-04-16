<template>
  <LoadingSpinner v-if="loading" />
  <AdminDashboard
    v-else
    :users-obj="usersObj"
    :sort="paginationOptions.sort"
    :search="paginationOptions.search"
    @edit-user-event="editUserHandler"
    @delete-user-event="deleteUserHandler"
    @sort-value-event="sortHandler"
    @search-event="searchHandler"
  />
</template>

<script setup lang="ts">
import { onBeforeMount, ref, watch } from "vue";
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

const paginationOptions = ref<{
  currentPage: number;
  sort: string;
  search: string;
}>({
  currentPage: 1,
  sort: "A-Z",
  search: "",
});

const searchTimeout = ref<number | null>(null);

onBeforeMount(async () => {
  try {
    setLoading(true);
    const { currentPage, sort } = paginationOptions.value;
    const { data, message } = await getUsers(currentPage, sort);
    if (data) {
      const { allUsers, count } = data;
      usersObj.value.users = allUsers;
      usersObj.value.count = count;
    } else {
      showToast(message, "error");
    }
  } catch (error) {
    showToast("Unable to fetch data", "error");
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

const sortHandler = (value: string) => {
  paginationOptions.value.sort = value;
};

const searchHandler = (value: string) => {
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value);
  }
  searchTimeout.value = setTimeout(() => {
    console.log(value);
    paginationOptions.value.search = value;
    paginationOptions.value.currentPage = 1
  }, 500);
};

// const searchHandler = (searchValue: string) => {
//   if (searchTimeout.value) {
//     clearTimeout(searchTimeout.value)
//   }
//   searchTimeout.value = setTimeout(() => {
//     pageStore.setPageStore('page', 1)
//     sortFilterStore.setSearchValue(searchValue)
//     const currentQuery = { ...router.currentRoute.value.query }
//     router.push({
//       query: { ...currentQuery, searchValue },
//     })
//   }, 500) as unknown as number
// }

watch(
  () => paginationOptions.value.sort,
  async (newSort) => {
    try {
      const { data, message } = await getUsers(
        paginationOptions.value.currentPage,
        newSort
      );
      if (data) {
        const { allUsers, count } = data;
        usersObj.value.users = allUsers;
        usersObj.value.count = count;
      } else {
        showToast(message, "error");
      }
    } catch (error) {
      console.error(error);
    }
  }
);
</script>
