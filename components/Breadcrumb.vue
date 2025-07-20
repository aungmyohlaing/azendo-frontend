<template>
  <nav class="breadcrumb" aria-label="Breadcrumb">
    <ol class="breadcrumb-list">
      <li v-for="(item, index) in items" :key="index" class="breadcrumb-item">
        <NuxtLink
          v-if="item.href && index < items.length - 1"
          :to="item.href"
          class="breadcrumb-link"
        >
          {{ item.label }}
        </NuxtLink>
        <span v-else class="breadcrumb-current" :aria-current="index === items.length - 1 ? 'page' : undefined">
          {{ item.label }}
        </span>
        <span v-if="index < items.length - 1" class="breadcrumb-separator">/</span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
interface BreadcrumbItem {
  label: string
  href?: string
}

interface Props {
  items: BreadcrumbItem[]
}

defineProps<Props>()
</script>

<style scoped>
.breadcrumb {
  margin-bottom: 1.5rem;
}

.breadcrumb-list {
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  flex-wrap: wrap;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
}

.breadcrumb-link {
  color: var(--primary-color);
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.2s ease;
}

.breadcrumb-link:hover {
  color: var(--primary-dark);
  text-decoration: underline;
}

.breadcrumb-current {
  color: var(--text-light);
  font-size: 0.875rem;
  font-weight: 500;
}

.breadcrumb-separator {
  color: var(--text-light);
  margin: 0 0.5rem;
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .breadcrumb {
    margin-bottom: 1rem;
  }
  
  .breadcrumb-list {
    font-size: 0.8rem;
  }
  
  .breadcrumb-separator {
    margin: 0 0.25rem;
  }
}
</style> 