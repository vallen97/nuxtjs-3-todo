<script setup lang="ts">
useI18n();

const switchLocalePath = useSwitchLocalePath();
const localePath = useLocalePath();
</script>

<template>
  <div class="layout">
    <header>
      <div size="xl" class="header-inner">
        <h1><NuxtLink :to="localePath('/')">TODO with Vuejs</NuxtLink></h1>
        <nav>
          <NuxtLink :to="localePath('/style-guide')">Style Guide</NuxtLink>
          <DarkModeToggle />
          <NuxtLink :to="switchLocalePath('en')">
            <Icon name="circle-flags:uk" />
          </NuxtLink>
          <NuxtLink :to="switchLocalePath('fr')">
            <Icon name="circle-flags:fr" />
          </NuxtLink>
        </nav>
      </div>
    </header>

    <slot />

    <div class="center-footer">
      <a
        href="https://github.com/vallen97"
        target="_blank"
        rel="noopener noreferrer"
        class="center-text"
      >
        View my Github
      </a>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.center-footer {
  margin: auto;
  width: 50%;
  padding: 10px;
  text-align: center;
}

:global(body) {
  background: var(--surface-2);
  color: var(--text-1);
}

.layout {
  display: grid;
  grid-template-rows: auto 1fr auto;

  & header {
    background-color: var(--surface-1);
    box-shadow: var(--shadow-2);
    position: sticky;
    top: 0;
    z-index: 1;
  }

  & footer {
    text-align: center;
  }
}

.header-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--size-2) var(--size-5);
  width: 100%;
  max-width: var(--size-lg);
  margin-inline: auto;

  & > nav {
    display: flex;
    gap: var(--size-2);
    align-items: center;
  }

  & h1 {
    font-size: var(--size-5);
  }

  & a {
    color: inherit;
  }
}
</style>

<i18n lang="json">
{
  "en": {
    "footer": "Made with 💀 by {link}"
  },
  "fr": {
    "footer": "Fait avec 💀 par {link}"
  }
}
</i18n>
