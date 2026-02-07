<template>
  <BaseOverlay>
    <BaseModal>
      <FormWrapper
        id="editUserForm"
        class="bg-slate-200 dark:bg-slate-700 w-full h-full sm:p-6 relative"
        @submit.prevent="submitHandler"
      >
        <template #title>
          <h1 class="text-2xl text-center uppercase">Edit User</h1>
        </template>
        <v-icon name="ri-close-circle-fill" class="absolute top-3 right-2 cursor-pointer" />
        <template #inputs>
          <SlotProvider>
            <template v-for="input in userInputs">
              <FormBlock>
                <template #label>
                  <FormLabel :id="input.name">{{ input.label }}</FormLabel>
                </template>
                <template #input>
                  <FormInput v-bind="input" v-model="user[input.name as 'email' | 'fullName']" />
                </template>
              </FormBlock>
            </template>
          </SlotProvider>
          <FormBlock>
            <template #label>
              <FormLabel id="role">Role</FormLabel>
            </template>
            <template #input>
              <FormSelect v-model="user.role" id="role" :options="dashboardOptions" :selected="user.role" />
            </template>
          </FormBlock>
        </template>
        <template #submit>
          <div class="flex items-center justify-between">
            <FormBlock position="row">
              <template #input>
                <FormLabel id="checkbox">Active</FormLabel>
              </template>
              <template #label>
                <FormCheckbox id="checkbox" v-model="user.active" />
              </template>
            </FormBlock>
            <Button type="submit">Submit</Button>
          </div>
        </template>
      </FormWrapper>
    </BaseModal>
  </BaseOverlay>
</template>

<script setup lang="ts">
import BaseOverlay from "@/shared/components/BaseOverlay.vue";
import BaseModal from "@/shared/components/BaseModal.vue";
import FormLabel from "@/shared/components/form/FormLabel.vue";
import FormInput from "@/shared/components/form/FormInput.vue";
import FormBlock from "@/shared/components/form/FormBlock.vue";
import FormSelect from "@/shared/components/form/FormSelect.vue";
import FormCheckbox from "@/shared/components/form/FormCheckbox.vue";
import FormWrapper from "@/shared/components/form/FormWrapper.vue";
import SlotProvider from "@/shared/components/SlotProvider.vue";
import Button from "@/shared/components/Button.vue";
import { userInputs, dashboardOptions } from "@/shared/constants";
import { PropType, ref } from "vue";
import { UserType } from "@/utils/types";
import { editUserProfile } from "@/api/users";
import { showToast } from "@/utils/helpers/showToast";

const emits = defineEmits(["close-modal-event", "submit-event"]);
const props = defineProps({
  user: {
    type: Object as PropType<UserType>,
    required: true,
  },
});

const user = ref<UserType>({ ...props.user });

const submitHandler = async () => {
  try {
    const { data, message } = await editUserProfile(user.value);
    if (data) {
      emits("submit-event", data);
    } else {
      showToast(message, "error");
    }
  } catch (error) {
    console.error(error);
  }
};
</script>
