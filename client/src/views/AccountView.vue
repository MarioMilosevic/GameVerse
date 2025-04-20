<!-- :src="`http://localhost:3000/public/${user.image}`" -->
<template>
  <main
    class="max-w-[1280px] p-8 mx-auto mt-8 flex gap-4 bg-slate-100 dark:bg-slate-800 rounded-2xl"
  >
    <section class="w-1/3 flex flex-col gap-8">
      <img
        :src="`${apiUrl}/public/${user.image}`"
        :alt="user.image"
        class="object-cover rounded-lg"
      />

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

    <section class="w-2/3 flex flex-col gap-4">
      <FormComponent
        id="editAccountForm"
        class="gap-6"
        type="regular"
        @submit.prevent="accountHandler"
      >
        <template #title>
          <SubtitleComponent justify="start">
            Update account settings
          </SubtitleComponent>
        </template>
        <template #inputs>
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
                    {{ accountFormErrors[input.name as AccountFields] }}
                  </FormError>
                </template>
              </FormBlock>
            </template>
          </RenderlessComponent>
        </template>
        <template #submit>
          <div class="flex gap-4">
            <ActionButton
              :disabled="!accountSettingsFieldsCompleted"
              type="submit"
              >Change Settings</ActionButton
            >
            <ActionButton @click="disableAccount">Disable Account</ActionButton>
          </div>
        </template>
      </FormComponent>

      <FormComponent
        type="regular"
        @submit.prevent="imageHandler"
        id="photoForm"
        enctype="multipart/form-data"
      >
        <template #title>
          <SubtitleComponent justify="start"> Update photo </SubtitleComponent>
        </template>

        <template #inputs>
          <FormBlock class="items-start">
            <template #label>
              <FormLabel id="file" class="pl-1"> Upload File </FormLabel>
            </template>
            <template #input>
              <FormFile @file-event="photoHandler" name="image" />
              <p class="pl-1 text-sm text-slate-500 dark:text-slate-300">
                SVG, PNG, JPG or GIF
              </p>
            </template>
            <template #error>
              <FormError> </FormError>
            </template>
          </FormBlock>
        </template>
        <template #submit>
          <ActionButton
            type="submit"
            :style="{ alignSelf: 'start', marginTop: '0.5rem' }"
            >Change Photo</ActionButton
          >
        </template>
      </FormComponent>
    </section>
  </main>
</template>

<script setup lang="ts">
import useGetUserStore from "src/composables/useGetUserStore";
import SubtitleComponent from "src/components/layout/others/SubtitleComponent.vue";
import RenderlessComponent from "src/components/layout/others/RenderlessComponent.vue";
import FormComponent from "src/components/form/FormComponent.vue";
import FormLabel from "src/components/form/FormLabel.vue";
import FormInput from "src/components/form/FormInput.vue";
import FormFile from "src/components/form/FormFile.vue";
import FormBlock from "src/components/form/FormBlock.vue";
import FormLine from "src/components/form/FormLine.vue";
import FormError from "src/components/form/FormError.vue";
import ActionButton from "src/components/layout/buttons/ActionButton.vue";
import { useRouter } from "vue-router";
import { AccountSettingsType } from "src/utils/types";
import { formattedDate } from "src/utils/helpers";
import { accountInputs, apiUrl } from "src/utils/constants";
import { ref, computed } from "vue";
import {
  accountSchema,
  AccountFieldErrors,
  getAccountFieldError,
  AccountFields,
  AccountTouchedFields,
} from "src/schemas/accountPage";
import {
  disableUserAccount,
  editUserNameAndEmail,
  signOut,
  updateUserImage,
} from "src/api/users";
import { showToast } from "src/utils/toast";


const { user, setUser } = useGetUserStore();
const router = useRouter();

const accountSettings = ref<AccountSettingsType>({
  fullName: "",
  email: "",
});

const touchedFields = ref<AccountTouchedFields>({});
const accountFormErrors = ref<AccountFieldErrors>({});

const accountPhoto = ref<File | null>(null);

const accountSettingsFieldsCompleted = computed(() => {
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
      const { data, message } = await editUserNameAndEmail(
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

const disableAccount = async () => {
  try {
    if (user.value.id) {
      const { data, message } = await disableUserAccount(user.value.id);
      if (data) {
        signOut(
          router,
          user.value,
          "Disabled for now — reactivate by signing in."
        );
      } else {
        showToast(message, "error");
      }
    }
  } catch (error) {
    console.error(error);
  }
};

const photoHandler = (file: File) => {
  console.log("uslo");
  accountPhoto.value = file;
  console.log(accountPhoto.value);
};

const imageHandler = async () => {
  try {
    if (user.value.id && accountPhoto.value) {
      const response = await updateUserImage(
        user.value.id,
        accountPhoto.value as File
      );
      console.log(response);
    } else {
      showToast("Please provide image", "error");
    }
  } catch (error) {
    console.error(error);
  }
  // valjalo bi da dodam neku validaciju za sliku, da postoji da nije prazno
};
</script>
