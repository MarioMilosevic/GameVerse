<template>
  <AuthForm @submit.prevent="submitHandler">
    <template #title>
      <h1 class="text-2xl text-center uppercase">Create your account</h1>
    </template>

    <template #inputs>
      <RenderlessComponent>
        <template v-for="input in signUpInputs" :key="input.name">
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
                @blur-event="blurHandler(input.name as SignUpFields)"
                v-bind="input"
                v-model="signUpCredentials[input.name as keyof typeof signUpCredentials]"
              />
            </template>
            <template #line>
              <FormLine />
            </template>
            <template #error>
              <FormError>
                <template #default>{{
                  signUpFormErrors[input.name as SignUpFields]
                }}</template>
              </FormError>
            </template>
          </FormBlock>
        </template>
      </RenderlessComponent>
    </template>
    <template #submit>
      <ActionButton type="submit" :style="{ marginTop: '0.5rem' }">
        <template #content> SIGN UP </template>
      </ActionButton>
    </template>
  </AuthForm>
</template>

<script setup lang="ts">
import AuthForm from "src/components/form/AuthForm.vue";
import FormBlock from "src/components/form/FormBlock.vue";
import FormInput from "src/components/form/FormInput.vue";
import FormLabel from "src/components/form/FormLabel.vue";
import FormError from "src/components/form/FormError.vue";
import FormLine from "src/components/form/FormLine.vue";
import ActionButton from "src/components/layout/ActionButton.vue";
import RenderlessComponent from "src/components/layout/RenderlessComponent.vue";
import { signUpInputs } from "src/utils/constants";
import { ref } from "vue";
import {
  getSignUpFieldError,
  SignUpFieldErorrs,
  SignUpFields,
  SignUpTouchedFields,
} from "src/schemas/signUpPage";
import { SignUpCredentialsType } from "src/utils/types";

const touchedFields = ref<SignUpTouchedFields>({});
const signUpFormErrors = ref<SignUpFieldErorrs>({});
const signUpCredentials = ref<SignUpCredentialsType>({
  fullName: "",
  email: "",
  password: "",
  passwordConfirm: "",
});

const blurHandler = (property: SignUpFields) => {
  const message = getSignUpFieldError(
    property,
    signUpCredentials.value[property]
  );
  signUpFormErrors.value[property] = message;
  touchedFields.value[property] = true;
};

const submitHandler = () => {
  console.log("submit");
};
</script>
