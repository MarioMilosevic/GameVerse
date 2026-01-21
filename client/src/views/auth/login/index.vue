<template>
  <FormWrapper @submit.prevent="submitHandler" id="loginForm" class="px-6">
    <template #title>
      <h1 class="text-2xl text-center uppercase">Login</h1>
    </template>
    <template #inputs>
      <SlotProvider>
        <template v-for="input in loginInputs" :key="input.name">
          <FormBlock>
            <template #label>
              <FormLabel :id="input.name">
                <template #default>
                  {{ input.label }}
                </template>
              </FormLabel>
            </template>
            <template #input>
              <FormInput
                @blur-event="blurHandler(input.name as LoginFields)"
                v-bind="input"
                v-model="
                  loginCredentials[input.name as keyof typeof loginCredentials]
                "
              />
            </template>
            <template #line>
              <FormLine />
            </template>
            <template #error>
              <FormError>
                {{ loginFormErrors[input.name as LoginFields] }}
              </FormError>
            </template>
          </FormBlock>
        </template>
      </SlotProvider>
    </template>
    <template #submit>
      <Button
        type="submit"
        :disabled="!allFieldsCompleted"
        :is-loading="isSubmiting"
        :style="{ marginTop: '0.5rem' }"
      >
        LOG IN
      </Button>
    </template>
    <template #text>
      <FormGuest text="Sign Up" />
    </template>
  </FormWrapper>
</template>

<script setup lang="ts">
import FormWrapper from "@/shared/components/form/FormWrapper.vue";
import SlotProvider from "@/shared/components/SlotProvider.vue";
import FormInput from "@/shared/components/form/FormInput.vue";
import FormLabel from "@/shared/components/form/FormLabel.vue";
import FormBlock from "@/shared/components/form/FormBlock.vue";
import FormError from "@/shared/components/form/FormError.vue";
import Button from "@/shared/components/Button.vue";
import FormLine from "@/shared/components/form/FormLine.vue";
import FormGuest from "@/shared/components/form/FormGuest.vue";
import { loginInputs, tokenName } from "@/utils/constants";
import { ref, computed } from "vue";
import { LoginCredentialsType } from "@/utils/types";
import {
  getLoginFieldError,
  loginSchema,
  LoginFieldErrors,
  LoginFields,
  LoginTouchedFields,
  getLoginErrors,
} from "@/schemas/loginPage";
import { loginUser } from "@/api/users";
import { useRouter } from "vue-router";
import { showToast } from "@/utils/toast";

const loginCredentials = ref<LoginCredentialsType>({
  email: "",
  password: "",
});
const touchedFields = ref<LoginTouchedFields>({});
const loginFormErrors = ref<LoginFieldErrors>({});
const isSubmiting = ref<boolean>(false);

const allFieldsCompleted = computed(() => {
  return loginSchema.safeParse(loginCredentials.value).success;
});

const router = useRouter();

const blurHandler = (property: LoginFields) => {
  const message = getLoginFieldError(
    property,
    loginCredentials.value[property],
  );
  loginFormErrors.value[property] = message;
  touchedFields.value[property] = true;
};

const submitHandler = async () => {
  isSubmiting.value = true;
  try {
    const { error } = loginSchema.safeParse(loginCredentials.value);
    if (error) {
      Object.entries(getLoginErrors(error)).forEach(([key, value]) => {
        loginFormErrors.value[key as LoginFields] = value;
      });
    }
    const { data, message } = await loginUser(loginCredentials.value);
    if (data) {
      localStorage.setItem(tokenName, data);
      router.push("/");
    } else {
      showToast(message, "error");
      isSubmiting.value = false;
    }
  } catch (error) {
    console.error(error);
    showToast("Unexpected error occured", "error");
  }
};
</script>
