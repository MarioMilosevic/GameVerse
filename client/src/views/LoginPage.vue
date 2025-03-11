<template>
  <AuthForm class="w-[500px] h-[100px] border border-white mx-auto">
    <template #inputs>
      <RenderlessComponent>
        <template v-for="input in loginInputs" :key="input.name">
          {{ input.name }}
        </template>
      </RenderlessComponent>
    </template>
  </AuthForm>
</template>

<script setup lang="ts">
import AuthForm from "src/components/form/AuthForm.vue";
import RenderlessComponent from "src/components/layout/RenderlessComponent.vue";
import { loginInputs } from "src/utils/constants";
</script>

<style scoped></style>
