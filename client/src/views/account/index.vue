<template>
  <main
    class="max-w-[1280px] py-8 sm:px-8 sm:py-8 mx-auto sm:mt-8 flex sm:flex-row flex-col sm:gap-4 gap-8 bg-slate-100 dark:bg-slate-800 rounded-xl"
  >
    <section class="sm:w-1/3 flex flex-col gap-4 px-4 sm:px-0 sm:gap-8">
      <img :src="renderUserImage(user.image)" :alt="user.fullName + 'image'" class="object-cover rounded-xl h-full" />

      <article class="flex flex-col gap-2">
        <PageSubtitle justify="start">About You</PageSubtitle>
        <p class="sm:text-base text-sm font-semibold">
          Full Name: <span class="font-normal">{{ user.fullName }}</span>
        </p>
        <p class="sm:text-base text-sm font-semibold">
          Email: <span class="font-normal">{{ user.email }}</span>
        </p>
        <p class="sm:text-base text-sm font-semibold">
          Member since:
          <span class="font-normal">{{ formatDate(user.createdDate) }}</span>
        </p>
      </article>
    </section>

    <section class="sm:w-2/3 flex flex-col gap-4 w-full">
      <FormWrapper id="editAccountForm" class="gap-6 px-4" type="regular" @submit.prevent="accountHandler">
        <template #title>
          <PageSubtitle justify="start"> Update account settings </PageSubtitle>
        </template>
        <template #inputs>
          <SlotProvider>
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
          </SlotProvider>
        </template>
        <template #submit>
          <div class="flex gap-4">
            <Button :disabled="!accountSettingsFieldsCompleted" type="submit">Change Settings</Button>
            <Button @click="disableAccount">Disable Account</Button>
          </div>
        </template>
      </FormWrapper>

      <FormWrapper
        type="regular"
        @submit.prevent="imageHandler"
        id="photoForm"
        class="px-4"
        enctype="multipart/form-data"
      >
        <template #title>
          <PageSubtitle justify="start"> Update photo </PageSubtitle>
        </template>

        <template #inputs>
          <FormBlock class="items-start">
            <template #label>
              <FormLabel id="file" class="pl-1"> Upload File </FormLabel>
            </template>
            <template #input>
              <FormFile @file-event="photoHandler" name="image" />
              <p class="pl-1 text-sm text-slate-500 dark:text-slate-300">SVG, PNG, JPG or GIF</p>
            </template>
            <template #error>
              <FormError> </FormError>
            </template>
          </FormBlock>
        </template>
        <template #submit>
          <Button type="submit" :style="{ alignSelf: 'start', marginTop: '0.5rem' }">Change Photo</Button>
        </template>
      </FormWrapper>
    </section>
  </main>
  <AppFooter />
</template>

<script setup lang="ts">
import useGetUserStore from "@/composables/useGetUserStore";
import PageSubtitle from "@/shared/components/PageSubtitle.vue";
import SlotProvider from "@/shared/components/SlotProvider.vue";
import FormWrapper from "@/shared/components/form/FormWrapper.vue";
import FormLabel from "@/shared/components/form/FormLabel.vue";
import FormInput from "@/shared/components/form/FormInput.vue";
import FormFile from "@/shared/components/form/FormFile.vue";
import FormBlock from "@/shared/components/form/FormBlock.vue";
import FormLine from "@/shared/components/form/FormLine.vue";
import FormError from "@/shared/components/form/FormError.vue";
import AppFooter from "@/shared/components/AppFooter.vue";
import Button from "@/shared/components/Button.vue";
import { useRouter } from "vue-router";
import { AccountSettingsType } from "@/utils/types";
import { renderUserImage } from "@/utils/helpers/renderUserImage";
import { formatDate } from "@/utils/helpers/formatDate";
import { accountInputs, emptyAccountSettings, guestMessage } from "@/shared/constants";
import { ref, computed } from "vue";
import {
  accountSchema,
  AccountFieldErrors,
  getAccountFieldError,
  AccountFields,
  AccountTouchedFields,
} from "@/schemas/account";
import { disableUserAccount, editUserNameAndEmail, signOut, updateUserImage } from "@/api/users";
import { showToast } from "@/utils/helpers/showToast";

const { user, setUser, resetUser } = useGetUserStore();
const router = useRouter();

const accountSettings = ref<AccountSettingsType>({ ...emptyAccountSettings });

const touchedFields = ref<AccountTouchedFields>({});
const accountFormErrors = ref<AccountFieldErrors>({});

const accountPhoto = ref<File | null>(null);

const accountSettingsFieldsCompleted = computed(() => {
  return accountSchema.safeParse(accountSettings.value).success;
});

const blurHandler = (property: AccountFields) => {
  const message = getAccountFieldError(property, accountSettings.value[property]);
  accountFormErrors.value[property] = message;
  touchedFields.value[property] = true;
};

const accountHandler = async () => {
  try {
    if (user.value.id) {
      const { data, message } = await editUserNameAndEmail(user.value.id, accountSettings.value);
      if (data) {
        setUser(data);
        showToast("Settings updated sucessfully");
        accountSettings.value = {
          fullName: "",
          email: "",
        };
      } else {
        showToast(message, "error");
      }
    } else {
      router.push("/login");
      setTimeout(() => {
        showToast(guestMessage, "error");
      }, 500);
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
        signOut(user.value, "See you soon! Login in anytime.");
        router.push("/");
        resetUser();
      } else {
        showToast(message, "error");
      }
    } else {
      router.push("/login");
      setTimeout(() => {
        showToast(guestMessage, "error");
      }, 500);
      return;
    }
  } catch (error) {
    console.error(error);
  }
};

const photoHandler = (file: File) => {
  accountPhoto.value = file;
};

const imageHandler = async () => {
  try {
    if (!user.value.id) {
      router.push("/login");
      setTimeout(() => {
        showToast(guestMessage, "error");
      }, 500);
      return;
    }

    if (accountPhoto.value) {
      const { data, message } = await updateUserImage(user.value.id, accountPhoto.value as File);
      if (data) {
        setUser(data);
        showToast("Image updated");
        accountPhoto.value = null;
      } else {
        showToast(message, "error");
      }
    } else {
      showToast("Please provide image", "error");
    }
  } catch (error) {
    console.error(error);
  }
};
</script>
