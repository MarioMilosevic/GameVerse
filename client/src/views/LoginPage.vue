<template>
  <AuthForm
    class="w-[400px] bg-slate-800 mt-40 rounded-xl px-5 py-6 mx-auto flex flex-col gap-4"
  >
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
                v-bind="input"
                v-model="loginCredentials[input.name as keyof typeof loginCredentials]"
              />
            </template>
          </FormBlock>
        </template>
      </RenderlessComponent>
    </template>
    <template #submit>
      <ActionButton size="medium">
        <template #content> Log In </template>
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
import ActionButton from "src/components/layout/ActionButton.vue";
import { loginInputs } from "src/utils/constants";
import { ref } from "vue";
import { LoginCredentialsType } from "src/utils/types";

const loginCredentials = ref<LoginCredentialsType>({ email: "", password: "" });
</script>

<style scoped></style>
