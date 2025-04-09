<template>
  <FormComponent @submit.prevent="submitHandler">
    <template #title>
      <h1 class="text-2xl text-center uppercase">Login</h1>
    </template>
    <template #inputs>
      <RenderlessComponent>
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
                v-model="loginCredentials[input.name as keyof typeof loginCredentials]"
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
      </RenderlessComponent>
    </template>
    <template #submit>
      <ActionButton
        type="submit"
        :disabled="!allFieldsCompleted"
        :style="{ marginTop: '0.5rem' }"
        :is-loading="isLoading"
      >
        LOG IN
      </ActionButton>
    </template>
  </FormComponent>
</template>

<script setup lang="ts">
import FormComponent from "src/components/form/FormComponent.vue";
import RenderlessComponent from "src/components/layout/others/RenderlessComponent.vue";
import FormInput from "src/components/form/FormInput.vue";
import FormLabel from "src/components/form/FormLabel.vue";
import FormBlock from "src/components/form/FormBlock.vue";
import FormError from "src/components/form/FormError.vue";
import ActionButton from "src/components/layout/buttons/ActionButton.vue";
import FormLine from "src/components/form/FormLine.vue";
import { loginInputs, tokenName } from "src/utils/constants";
import { ref, computed } from "vue";
import { LoginCredentialsType } from "src/utils/types";
import {
  getLoginFieldError,
  loginSchema,
  LoginFieldErrors,
  LoginFields,
  LoginTouchedFields,
  getLoginErrors,
} from "src/schemas/loginPage";
import { loginUser } from "src/api/users";
import { useRouter } from "vue-router";
import { showToast } from "src/utils/toast";

const loginCredentials = ref<LoginCredentialsType>({
  email: "",
  password: "",
});
const touchedFields = ref<LoginTouchedFields>({});
const loginFormErrors = ref<LoginFieldErrors>({});

const isLoading = ref<boolean>(false);

const allFieldsCompleted = computed(() => {
  return loginSchema.safeParse(loginCredentials.value).success;
});

const router = useRouter();

const blurHandler = (property: LoginFields) => {
  const message = getLoginFieldError(
    property,
    loginCredentials.value[property]
  );
  loginFormErrors.value[property] = message;
  touchedFields.value[property] = true;
};

const submitHandler = async () => {
  try {
    isLoading.value = true;
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
      isLoading.value = false;
    }
  } catch (error) {
    console.error(error);
  }
};
</script>
