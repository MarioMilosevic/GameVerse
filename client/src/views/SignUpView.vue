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
      <ActionButton
        type="submit"
        :style="{ marginTop: '0.5rem' }"
        :disabled="!allFieldsCompleted"
      >
        SIGN UP
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
import ActionButton from "src/components/layout/buttons/ActionButton.vue";
import RenderlessComponent from "src/components/layout/others/RenderlessComponent.vue";
import { profileImg, signUpInputs } from "src/utils/constants";
import { ref, computed } from "vue";
import {
  getSignUpErrors,
  getSignUpFieldError,
  SignUpFieldErorrs,
  SignUpFields,
  signUpSchema,
  SignUpTouchedFields,
} from "src/schemas/signUpPage";
import { SignUpCredentialsType } from "src/utils/types";
import { showToast } from "src/utils/toast";
import { createUser } from "src/api/users";
import { useRouter } from "vue-router";

const touchedFields = ref<SignUpTouchedFields>({});
const signUpFormErrors = ref<SignUpFieldErorrs>({});
const signUpCredentials = ref<SignUpCredentialsType>({
  fullName: "",
  email: "",
  password: "",
  passwordConfirm: "",
});

const allFieldsCompleted = computed(() => {
  return signUpSchema.safeParse(signUpCredentials.value).success;
});

const router = useRouter();

const blurHandler = (property: SignUpFields) => {
  const message = getSignUpFieldError(
    property,
    signUpCredentials.value[property]
  );
  signUpFormErrors.value[property] = message;
  touchedFields.value[property] = true;
};

const submitHandler = async () => {
  try {
    const { error } = signUpSchema.safeParse(signUpCredentials.value);
    if (error) {
      Object.entries(getSignUpErrors(error)).forEach(([key, value]) => {
        signUpFormErrors.value[key as SignUpFields] = value;
      });
    } else {
      const newUser = {
        ...signUpCredentials.value,
        role: "USER",
        image: profileImg,
      };
      const { data, message } = await createUser(newUser);
      if (data) {
        router.push("/login");
        setTimeout(() => {
          showToast("User Created");
        }, 1000);
      } else {
        showToast(message, "error");
      }
    }
  } catch (error) {
    console.error(error);
    showToast("Unexpected error occured", "error");
  }
};
</script>
