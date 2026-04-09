<template>
  <div style="padding: 12px 16px; margin-top: 15px;">
    <h1 style="font-size: clamp(18px, 4vw, 26px); font-weight: 500; margin: 0 0 4px;">
      Escanear Pase
    </h1>
    <p style="color: grey; margin: 0; font-size: 14px;">
      Apunta la cámara al código QR
    </p>
  </div>
  <div class="d-flex justify-center align-center">
  </div>

  <div style="flex: 1; position: relative; overflow: hidden;">
    <video ref="videoRef" style="width: 100%; height: 100%; object-fit: cover;"></video>
    <div
      style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; pointer-events: none;">
      <div
        style="width: 250px; height: 250px; border: 3px solid white; border-radius: 12px; box-shadow: 0 0 0 9999px rgba(0,0,0,0.4);">
      </div>
    </div>
  </div>
  <v-snackbar v-model="snackbar" color="error" location="top" :timeout="3000">
    {{ mensajeError }}
    <template v-slot:actions>
      <v-btn variant="text" @click="snackbar = false">Cerrar</v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { BrowserQRCodeReader } from '@zxing/browser'
import { type IScannerControls } from '@zxing/browser'
import { useRouter } from 'vue-router'

const router = useRouter()
const videoRef = ref<HTMLVideoElement | null>(null)
let controls: IScannerControls | null = null

onMounted(async () => {
  const codeReader = new BrowserQRCodeReader()

  try {
    controls = await codeReader.decodeFromConstraints(
      { video: { facingMode: 'environment' } },
      videoRef.value!,
      async (result) => {
        if (result) {
          detener()

          const texto = result.getText()

          try {
            const url = new URL(texto)

            // valida que sea tu dominio
            const dominiosValidos = [
              'localhost',
              'tuapp.ngrok.io',
              '192.168.1.47',
              'sistemoon.duckdns.org'
            ]

            if (!dominiosValidos.includes(url.hostname)) {
              mostrarError('El QR no pertenece a este sistema')
              return
            }

            router.push(url.pathname)

          } catch {
            mostrarError('QR no válido')
          }
        }
      }
    )
  } catch (e) {
    console.error('Error al acceder a la cámara:', e)
  }
})

const snackbar = ref(false)
const mensajeError = ref('')

const mostrarError = (mensaje: string) => {
  mensajeError.value = mensaje
  snackbar.value = true
  window.setTimeout(() => {
    snackbar.value = false
    window.location.reload()
  }, 3000)
}

onUnmounted(() => detener())

const detener = () => {
  controls?.stop()
}
</script>