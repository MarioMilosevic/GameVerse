<template>
  <AuthForm class="w-[500px] border border-white mx-auto flex flex-col gap-4">
    <template #title>
        <h1 class="text-2xl text-center uppercase">Login into your account</h1>
    </template>
    <template #inputs>
      <RenderlessComponent>
        <template v-for="input in loginInputs" :key="input.name">
        <FormInput v-bind="input" v-model="loginCredentials[input.name as keyof typeof loginCredentials]"/>
        </template>
      </RenderlessComponent>
    </template>
    <template #submit>
        <ActionButton>Log In</ActionButton>
    </template>
  </AuthForm>
</template>

<script setup lang="ts">
import AuthForm from "src/components/form/AuthForm.vue";
import RenderlessComponent from "src/components/layout/RenderlessComponent.vue";
import FormInput from "src/components/form/FormInput.vue";
import FormBlock from "src/components/form/FormBlock.vue";
import ActionButton from "src/components/layout/ActionButton.vue";
import { loginInputs } from "src/utils/constants";
import { ref } from "vue";
import { LoginCredentialsType } from "src/utils/types";

const loginCredentials = ref<LoginCredentialsType>({ email: '', password: '' })

</script>

<style scoped></style>
