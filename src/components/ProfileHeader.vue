<script setup lang="ts">
defineProps<{ initials: string; name: string; subtitle: string; matriculationNumber: string }>()
</script>

<template>
  <div class="hero">
    <div class="avatar" aria-hidden="true">{{ initials }}</div>
    <div class="text">
      <h1>{{ name }}</h1>
      <p>{{ subtitle }}</p>
    </div>
    <span class="badge">Matrikel-Nr. {{ matriculationNumber }}</span>
    <div class="actions"><slot /></div>
  </div>
</template>

<style scoped>
.hero {
  display: flex; flex-wrap: wrap; align-items: center; gap: 1.25rem;
  padding: 1.75rem;
  border-radius: var(--radius);
  color: #fff;
  background: linear-gradient(135deg, var(--color-primary) 0%, #7c3aed 100%);
  box-shadow: var(--shadow);
}
.avatar {
  display: grid; place-items: center; width: 4.5rem; height: 4.5rem; border-radius: 50%;
  background: rgba(255, 255, 255, 0.2); border: 2px solid rgba(255, 255, 255, 0.6);
  font-size: 1.6rem; font-weight: 700;
}
.text { flex: 1 1 14rem; }
h1 { margin: 0; font-size: 1.6rem; }
p { margin: 0.15rem 0 0; opacity: 0.9; }
.badge { padding: 0.35rem 0.8rem; border-radius: 999px; background: rgba(255, 255, 255, 0.18); font-size: 0.85rem; font-weight: 600; }
.actions { display: flex; gap: 0.6rem; flex-wrap: wrap; }
</style>
