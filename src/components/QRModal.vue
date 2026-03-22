<script setup lang="ts">
import { ref, watch } from 'vue'
import QRCode from 'qrcode'

const props = defineProps<{
  paseId: number | null
  modelValue: boolean
}>()

const emit = defineEmits(['update:modelValue'])
const qrUrl = ref('')

watch(() => props.paseId, async (id) => {
  if (!id) return
  const url = `${window.location.origin}/pase/${id}`
  qrUrl.value = await QRCode.toDataURL(url, { width: 300 })
})
</script>

<template>
  <v-dialog :model-value="modelValue" @update:model-value="emit('update:modelValue', $event)" max-width="400">
    <v-card class="pa-6 text-center">
      <v-card-title class="mb-4">Código QR del Pase</v-card-title>
      <img v-if="qrUrl" :src="qrUrl" alt="QR del pase" class="mx-auto d-block" />
      <v-card-subtitle class="mt-2">Pase #{{ paseId }}</v-card-subtitle>
      <v-card-actions class="justify-center mt-4">
        <v-btn color="primary" :href="qrUrl" download="pase-qr.png">
          Descargar QR
        </v-btn>
        <v-btn @click="emit('update:modelValue', false)">
          Cerrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

