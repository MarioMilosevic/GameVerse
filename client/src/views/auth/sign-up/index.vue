<template>
  <FormWrapper @submit.prevent="submitHandler" id="signUpForm" class="px-6">
    <template #title>
      <h1 class="text-2xl text-center uppercase">Create your account</h1>
    </template>
    <template #inputs>
      <SlotProvider>
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
                {{ signUpFormErrors[input.name as SignUpFields] }}
              </FormError>
            </template>
          </FormBlock>
        </template>
      </SlotProvider>
    </template>
    <template #submit>
      <Button type="submit" :style="{ marginTop: '0.5rem' }" :disabled="!allFieldsCompleted" :is-loading="isLoading">
        SIGN UP
      </Button>
    </template>
    <template #text>
      <FormGuest text="Login" />
    </template>
  </FormWrapper>
</template>

<script setup lang="ts">
import FormWrapper from "@/shared/components/form/FormWrapper.vue";
import FormBlock from "@/shared/components/form/FormBlock.vue";
import FormInput from "@/shared/components/form/FormInput.vue";
import FormLabel from "@/shared/components/form/FormLabel.vue";
import FormError from "@/shared/components/form/FormError.vue";
import FormLine from "@/shared/components/form/FormLine.vue";
import FormGuest from "@/shared/components/form/FormGuest.vue";
import Button from "@/shared/components/Button.vue";
import SlotProvider from "@/shared/components/SlotProvider.vue";
import { signUpInputs, userRoles } from "@/shared/constants";
import { ref, computed } from "vue";
import {
  getSignUpErrors,
  getSignUpFieldError,
  SignUpFieldErorrs,
  SignUpFields,
  signUpSchema,
  SignUpTouchedFields,
} from "@/schemas/sign-up";
import { SignUpCredentialsType } from "@/utils/types";
import { showToast } from "@/utils/toast";
import { createUser } from "@/api/users";
import { useRouter } from "vue-router";

const touchedFields = ref<SignUpTouchedFields>({});
const signUpFormErrors = ref<SignUpFieldErorrs>({});
const signUpCredentials = ref<SignUpCredentialsType>({
  fullName: "",
  email: "",
  password: "",
  passwordConfirm: "",
});

const isLoading = ref<boolean>(false);

const allFieldsCompleted = computed(() => {
  return signUpSchema.safeParse(signUpCredentials.value).success;
});

const router = useRouter();

const blurHandler = (property: SignUpFields) => {
  const message = getSignUpFieldError(property, signUpCredentials.value[property]);
  signUpFormErrors.value[property] = message;
  touchedFields.value[property] = true;
};

const submitHandler = async () => {
  try {
    isLoading.value = true;
    const { error } = signUpSchema.safeParse(signUpCredentials.value);
    if (error) {
      Object.entries(getSignUpErrors(error)).forEach(([key, value]) => {
        signUpFormErrors.value[key as SignUpFields] = value;
      });
    } else {
      const newUser = {
        ...signUpCredentials.value,
        role: userRoles.USER,
      };
      const { data, message } = await createUser(newUser);
      if (data) {
        router.push("/login");
        setTimeout(() => {
          showToast("User Created");
        }, 1000);
      } else {
        isLoading.value = false;
        showToast(message, "error");
      }
    }
  } catch (error) {
    console.error(error);
    showToast("Unexpected error occured", "error");
  }
};
</script>
