<script setup>
import { useTheme } from 'vuetify'

const theme = useTheme()

const toggleTheme = () => {
  const newTheme = theme.global.current.value.dark ? 'light' : 'dark'
  theme.global.name.value = newTheme
  localStorage.setItem('theme', newTheme)
}
</script>

<template>
  <v-switch
    :model-value="theme.global.current.value.dark"
    @update:model-value="toggleTheme"
    prepend-icon="mdi-weather-sunny"
    append-icon="mdi-weather-night"
    color="primary"
    hide-details
  />
</template>