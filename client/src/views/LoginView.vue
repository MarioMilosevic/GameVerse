<template>
  <AuthForm @submit.prevent="submitHandler">
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
                <template #default>{{
                  loginFormErrors[input.name as LoginFields]
                }}</template>
              </FormError>
            </template>
          </FormBlock>
        </template>
      </RenderlessComponent>
    </template>
    <template #submit>
      <ActionButton
        size="medium"
        type="submit"
        :style="{ marginTop: '0.5rem' }"
      >
        <template #content> LOG IN </template>
      </ActionButton>
    </template>
  </AuthForm>
</template>

<script setup lang="ts">
import AuthForm from "src/components/form/AuthForm.vue";
import RenderlessComponent from "src/components/layout/RenderlessComponent.vue";
import FormInput from "src/components/form/FormInput.vue";
import FormLabel from "src/components/form/FormLabel.vue";
import FormBlock from "src/components/form/FormBlock.vue";
import FormError from "src/components/form/FormError.vue";
import ActionButton from "src/components/layout/ActionButton.vue";
import { loginInputs } from "src/utils/constants";
import { ref } from "vue";
import { LoginCredentialsType } from "src/utils/types";
import {
  getFieldError,
  LoginFieldErrors,
  LoginFields,
  LoginTouchedFields,
} from "src/schemas/loginPage";
import FormLine from "src/components/form/FormLine.vue";

const loginCredentials = ref<LoginCredentialsType>({ email: "", password: "" });
const touchedFields = ref<LoginTouchedFields>({});
const loginFormErrors = ref<LoginFieldErrors>({});

const blurHandler = (property: LoginFields) => {
  const message = getFieldError(property, loginCredentials.value[property]);
  loginFormErrors.value[property] = message;
  touchedFields.value[property] = true;
};

const submitHandler = () => {
  console.log("radi");
};
</script>
