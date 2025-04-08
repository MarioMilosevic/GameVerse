<template>
  <main class="max-w-[1280px] p-8 mx-auto border mt-8 flex gap-4">
    <section class="w-1/3 flex flex-col gap-8">
      <img :src="user.image" :alt="user.image" class="h-[100px] w-[100px]" />
      <article class="flex flex-col gap-2">
        <SubtitleComponent justify="start">About You</SubtitleComponent>
        <p class="font-semibold">
          Full Name: <span class="font-normal">{{ user.fullName }}</span>
        </p>
        <p class="font-semibold">
          Email: <span class="font-normal">{{ user.email }}</span>
        </p>
        <p class="font-semibold">
          Member since:
          <span class="font-normal">{{ formattedDate(user.createdDate) }}</span>
        </p>
      </article>
    </section>

    <section class="border w-2/3 flex flex-col gap-4">
      <SubtitleComponent justify="start">
        Update account settings
      </SubtitleComponent>

      <form class="border flex flex-col gap-6" @submit.prevent="accountHandler">
        <RenderlessComponent>
          <template v-for="input in accountInputs" :key="input.name">
            <FormBlock>
              <template #label>
                <FormLabel :id="input.name">
                  {{ input.label }}
                </FormLabel>
              </template>
              <template #input>
                <FormInput
                  @blur-event="blurHandler(input.name as AccountFields)"
                  v-bind="input"
                  v-model="accountSettings[input.name as keyof typeof accountSettings]"
                />
              </template>
              <template #line>
                <FormLine />
              </template>
              <template #error>
                <FormError>
                  <template #default>{{
                    accountFormErrors[input.name as AccountFields]
                  }}</template>
                </FormError>
              </template>
            </FormBlock>
          </template>
        </RenderlessComponent>
        <div class="flex gap-4">
          <ActionButton :disabled="!allFieldsCompleted" type="submit"
            >Change Settings</ActionButton
          >
          <ActionButton>Disable Account</ActionButton>
        </div>
      </form>
    </section>
  </main>
</template>

<script setup lang="ts">
import useGetUserStore from "src/composables/useGetUserStore";
import SubtitleComponent from "src/components/layout/others/SubtitleComponent.vue";
import RenderlessComponent from "src/components/layout/others/RenderlessComponent.vue";
import { formattedDate } from "src/utils/helpers";
import { accountInputs } from "src/utils/constants";
import { ref, computed } from "vue";
import FormLabel from "src/components/form/FormLabel.vue";
import FormInput from "src/components/form/FormInput.vue";
import FormBlock from "src/components/form/FormBlock.vue";
import FormLine from "src/components/form/FormLine.vue";
import FormError from "src/components/form/FormError.vue";
import { AccountSettingsType } from "src/utils/types";
import ActionButton from "src/components/layout/buttons/ActionButton.vue";
import {
  accountSchema,
  AccountFieldErrors,
  getAccountFieldError,
  AccountFields,
  AccountTouchedFields,
} from "src/schemas/accountPage";
import { editUserProfile } from "src/api/users";
import { showToast } from "src/utils/toast";

const { user, setUser } = useGetUserStore();

const accountSettings = ref<AccountSettingsType>({
  fullName: "",
  email: "",
});
const touchedFields = ref<AccountTouchedFields>({});
const accountFormErrors = ref<AccountFieldErrors>({});

const allFieldsCompleted = computed(() => {
  return accountSchema.safeParse(accountSettings.value).success;
});

const blurHandler = (property: AccountFields) => {
  const message = getAccountFieldError(
    property,
    accountSettings.value[property]
  );
  accountFormErrors.value[property] = message;
  touchedFields.value[property] = true;
};

const accountHandler = async () => {
  try {
    if (user.value.id) {
      const { data, message } = await editUserProfile(
        user.value.id,
        accountSettings.value
      );
      if (data) {
        setUser(data);
      } else {
        showToast(message, "error");
      }
    }
  } catch (error) {
    console.error(error);
  }
};
</script>
