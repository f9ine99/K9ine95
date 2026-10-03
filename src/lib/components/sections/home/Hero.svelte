<script lang="ts">
  import { Mail, FileText, ArrowUpRight, MapPin } from 'lucide-svelte';
  import { reveal } from '$lib/actions/reveal';

  const email = 'firaolgemedabuliye@gmail.com';
  const resumeUrl = 'https://assets.firaol.xyz/resume/Fira-resume.pdf';
  const name = 'Firaol Gemeda';
</script>

<header class="hero" id="home">
  <div class="hero-glow" aria-hidden="true"></div>

  <div class="title-block reveal" use:reveal>
    <p class="hello">Hey, I'm</p>
    <h1 class="name">{name}</h1>
    <span class="name-underline" aria-hidden="true"></span>
  </div>

  <p class="bio reveal" use:reveal={80}>
    Co-Founder of
    <a href="https://ethiohamerai.vercel.app" target="_blank" rel="noopener noreferrer">
      HamerAI
      <ArrowUpRight size={13} />
    </a>
    — building secure, scalable systems and shipping products that solve real-world problems.
  </p>

  <div class="hero-cta reveal" use:reveal={150}>
    <a class="cta-primary" href="mailto:{email}">
      <Mail size={16} />
      Get in touch
    </a>
    <a class="cta-secondary" href={resumeUrl} target="_blank" rel="noopener noreferrer">
      <FileText size={15} />
      Résumé
    </a>
  </div>

  <p class="location reveal" use:reveal={220}>
    <MapPin size={12} aria-hidden="true" />
    Addis Ababa · Open to remote
  </p>
</header>

<style>
  .hero {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1.05rem;
    margin: 0 auto 3.5rem;
    padding-top: 10.75rem;
    max-width: 42rem;
  }

  .hero-glow {
    position: absolute;
    top: 5.5rem;
    left: 50%;
    width: min(28rem, 90vw);
    height: 14rem;
    transform: translateX(-50%);
    background: radial-gradient(
      ellipse,
      color-mix(in srgb, var(--accent-orange) 16%, transparent),
      transparent 70%
    );
    pointer-events: none;
    z-index: 0;
  }

  :global(html.js) .hero-glow {
    opacity: 1;
  }

  .title-block,
  .bio,
  .hero-cta,
  .location {
    position: relative;
    z-index: 1;
  }

  .title-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.35rem;
  }

  .hello {
    margin: 0;
    font-family: var(--font-mono);
    font-size: 0.9rem;
    color: var(--text-muted);
  }

  .name {
    margin: 0;
    font-size: clamp(2.9rem, 7.5vw, 4.25rem);
    font-weight: 700;
    line-height: 1;
    letter-spacing: -0.045em;
    color: var(--text-primary);
  }

  .name-underline {
    display: block;
    width: 3.25rem;
    height: 3px;
    margin-top: 0.55rem;
    border-radius: 999px;
    background: linear-gradient(
      90deg,
      var(--accent-orange),
      color-mix(in srgb, var(--accent-blue) 70%, var(--accent-orange))
    );
    transform-origin: center;
  }

  :global(html.js) .title-block .name-underline {
    scale: 0 1;
  }

  :global(html.js) .title-block:global(.is-visible):not(:global(.is-immediate)) .name-underline {
    animation: draw-line 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.42s forwards;
  }

  :global(html.js) .title-block:global(.is-immediate) .name-underline {
    scale: 1;
  }

  .bio {
    margin: 0.2rem 0 0;
    max-width: 33rem;
    font-size: 1.1rem;
    line-height: 1.7;
    color: var(--text-primary);
    opacity: 0.92;
  }

  .bio a {
    display: inline-flex;
    align-items: center;
    gap: 0.1rem;
    color: var(--text-primary);
    font-weight: 600;
    text-decoration: none;
    transition: color 0.18s ease;
  }

  .bio a:hover {
    color: var(--accent-orange);
  }

  .hero-cta {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.7rem;
    margin-top: 0.55rem;
  }

  .cta-primary,
  .cta-secondary {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.76rem 1.25rem;
    border-radius: 999px;
    font-family: var(--font-mono);
    font-size: 0.86rem;
    font-weight: 600;
    letter-spacing: -0.01em;
    transition:
      transform 0.18s ease,
      box-shadow 0.18s ease,
      border-color 0.18s ease,
      color 0.18s ease,
      background-color 0.18s ease;
  }

  .cta-primary {
    background: var(--accent-orange);
    color: var(--bg-color);
    border: 1px solid var(--accent-orange);
  }

  .cta-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 28px var(--shadow-medium);
  }

  .cta-secondary {
    background: color-mix(in srgb, var(--card-bg) 65%, transparent);
    color: var(--text-primary);
    border: 1px solid var(--border-medium);
  }

  .cta-secondary:hover {
    transform: translateY(-2px);
    border-color: var(--accent-orange);
    color: var(--accent-orange);
  }

  .location {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    margin: 0.7rem 0 0;
    font-family: var(--font-mono);
    font-size: 0.72rem;
    letter-spacing: 0.02em;
    color: var(--text-muted);
  }

  @keyframes draw-line {
    from {
      scale: 0 1;
    }
    to {
      scale: 1 1;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .hero-glow,
    .name-underline {
      animation: none;
      opacity: 1;
      scale: none;
    }
  }

  @media (max-width: 768px) {
    .hero {
      padding-top: 8.5rem;
      gap: 0.9rem;
      margin-bottom: 2.75rem;
    }

    .bio {
      font-size: 1.02rem;
    }

    .name {
      font-size: clamp(2.5rem, 11vw, 3.2rem);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .title-block,
    .bio,
    .hero-cta,
    .location {
      animation: none;
    }
  }
</style>
