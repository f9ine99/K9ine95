<script lang="ts">
  import { Download, ExternalLink, FileText } from 'lucide-svelte';
  import SeoHead from '$lib/components/seo/SeoHead.svelte';

  const resumeUrl = 'https://example.com/firaol-gemeda-resume.pdf';
</script>

<SeoHead
  title="More"
  description="Resume, resources, and additional links from Firaol Gemeda."
  path="/more"
  noindex={true}
/>

<main class="more-page">
  <section class="resume-card" aria-labelledby="resume-title">
    <div class="resume-icon">
      <FileText size={28} />
    </div>

    <div class="resume-copy">
      <p class="eyebrow">Resume / CV</p>
      <h1 id="resume-title">Download my resume</h1>
      <p>
        A quick overview of my software engineering, cybersecurity, and product-building work.
      </p>
    </div>

    <div class="resume-actions">
      <a href={resumeUrl} class="resume-button" target="_blank" rel="noopener noreferrer">
        <Download size={18} />
        Download Resume
      </a>
      <a href={resumeUrl} class="preview-link" target="_blank" rel="noopener noreferrer">
        Preview <ExternalLink size={13} />
      </a>
    </div>
  </section>
</main>

<style>
  .more-page {
    max-width: 900px;
    margin: 0 auto;
    padding: 9rem 1.5rem 4rem;
  }

  .resume-card {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 1.25rem;
    align-items: center;
    padding: 1.25rem;
    border: 1px solid var(--border-medium);
    border-radius: 18px;
    background: var(--card-bg);
    box-shadow: 0 18px 45px var(--shadow-medium);
    backdrop-filter: blur(14px);
  }

  .resume-icon {
    width: 56px;
    height: 56px;
    display: grid;
    place-items: center;
    border-radius: 16px;
    color: var(--accent-orange);
    background: var(--subtle-bg);
    border: 1px solid var(--border-subtle);
  }

  .resume-copy {
    min-width: 0;
  }

  .eyebrow {
    margin: 0 0 0.35rem;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--accent-green);
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  h1 {
    margin: 0;
    color: var(--text-primary);
    font-size: clamp(1.45rem, 3vw, 2rem);
    letter-spacing: -0.04em;
  }

  .resume-copy p:last-child {
    margin: 0.45rem 0 0;
    color: var(--text-muted);
    line-height: 1.7;
  }

  .resume-actions {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.75rem;
  }

  .resume-button,
  .preview-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    text-decoration: none;
    white-space: nowrap;
  }

  .resume-button {
    padding: 0.85rem 1.05rem;
    border-radius: 999px;
    color: var(--bg-color);
    background: var(--accent-orange);
    font-weight: 700;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .resume-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 24px rgba(245, 169, 127, 0.22);
  }

  .preview-link {
    color: var(--text-muted);
    font-size: 0.85rem;
    transition: color 0.2s ease;
  }

  .preview-link:hover {
    color: var(--accent-orange);
  }

  @media (max-width: 768px) {
    .more-page {
      padding-top: 7rem;
    }

    .resume-card {
      grid-template-columns: 1fr;
      text-align: center;
      justify-items: center;
    }

    .resume-actions {
      width: 100%;
      align-items: stretch;
    }
  }
</style>
