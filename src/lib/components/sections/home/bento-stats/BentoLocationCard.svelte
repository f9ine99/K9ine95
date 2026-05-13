<script lang="ts">
  import { onMount } from 'svelte';
  import { Clock, MapPin } from 'lucide-svelte';
  import { fade } from 'svelte/transition';
  import Map from '$lib/components/sections/home/Map.svelte';

  let time = $state('');

  function updateTime() {
    const now = new Date();
    time = now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  }

  onMount(() => {
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  });
</script>

<div class="bento-card location-card" in:fade={{ duration: 400, delay: 300 }}>
  <div class="card-header">
    <MapPin size={17} class="header-icon" />
    <h3>Currently Based In 📍</h3>
  </div>

  <div class="map-container">
    <Map />
  </div>

  <div class="location-footer">
    <span class="city">Bole Medhanialem, Addis Ababa</span>
    <div class="local-time">
      <Clock size={13} />
      <span>{time}</span>
    </div>
  </div>
</div>

<style>
  .card-header {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    width: 100%;
  }

  :global(.header-icon) {
    color: var(--accent-orange);
  }

  h3 {
    font-size: 0.95rem;
    margin: 0;
    color: var(--text-primary);
    font-weight: 500;
  }

  .map-container {
    height: 176px;
    border-radius: 11px;
    overflow: hidden;
    position: relative;
    background: var(--bg-color);
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  .location-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.72rem;
    margin-top: -0.5rem;
    color: var(--text-muted);
  }

  .local-time {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-primary);
  }
</style>
