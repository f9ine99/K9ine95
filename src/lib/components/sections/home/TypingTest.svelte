<script lang="ts">
  import { onMount } from 'svelte';
  import TypingStatsHeader from '$lib/components/sections/home/typing-test/TypingStatsHeader.svelte';
  import TypingBongoCat from '$lib/components/sections/home/typing-test/TypingBongoCat.svelte';
  import TypingVictoryScreen from '$lib/components/sections/home/typing-test/TypingVictoryScreen.svelte';

  const sentences = [
    "ship it and fix it later",
    "code all day, debug all night",
    "it works on my machine",
    "one more commit before bed",
    "clean code is happy code",
    "coffee first, then code",
    "built with love and caffeine",
    "keep it simple and ship it",
    "make it work, make it right, make it fast",
    "hello world is just the beginning",
    "done is better than perfect",
    "push to main and pray",
    "bugs are just surprise features",
    "think twice, code once",
    "building cool things on the internet",
    "less is more, always",
    "learn, build, break, repeat",
    "stay curious, keep building",
    "deploy to vercel and chill",
    "docker makes everything portable",
    "kubernetes keeps it all running",
    "ollama brings ai to your laptop",
    "open source changed the world",
    "linux is home for developers",
    "rag makes ai actually useful",
    "svelte makes the web feel fast",
    "rust is the future of systems",
    "postgres is the goat of databases",
    "tailwind makes styling fun again",
    "the terminal is my happy place",
    "better auth keeps sign in simple",
    "supabase makes postgres even more fun",
    "aws powers apps at global scale",
    "serverless helps teams ship faster",
    "convex keeps realtime data in sync",
    "cloudflare keeps latency low at the edge",
    "llms turn prompts into working products",
    "great llm apps need strong context",
    "small models can still solve big problems"
  ];

  let targetText = $state(sentences[0]);
  let userInput = $state('');
  let startTime = $state(0);
  let wpm = $state(0);
  let accuracy = $state(100);
  let isFinished = $state(false);
  let activePaw = $state('none');
  let charElements = $state<HTMLElement[]>([]);
  let inputElement = $state<HTMLInputElement | null>(null);


  let lastTapTime = 0;
  let mistakes = $state(0);

  function reset(shouldFocus = false) {
    targetText = sentences[Math.floor(Math.random() * sentences.length)];
    userInput = '';
    startTime = 0;
    wpm = 0;
    accuracy = 100;
    isFinished = false;
    mistakes = 0;
    
    if (shouldFocus) {
      setTimeout(() => {
        inputElement?.focus();
      }, 0);
    }
  }

  function handleGlobalKeydown(e: KeyboardEvent) {
    if (e.key === 'Tab') {
      e.preventDefault();
      reset(true);
    }
  }

  onMount(() => {
    reset(false); // Do not focus on initial load to prevent scroll
  });

  const caretStyle = $derived.by(() => {
    if (userInput.length === 0) return 'left: 0; top: 0.28rem;';
    
    // Position at the NEXT character to type
    if (userInput.length < targetText.length) {
      const el = charElements[userInput.length];
      if (el) return `left: ${el.offsetLeft}px; top: ${el.offsetTop + 4}px;`;
    }
    
    // If at the very end
    const lastEl = charElements[targetText.length - 1];
    if (lastEl) return `left: ${lastEl.offsetLeft + lastEl.offsetWidth}px; top: ${lastEl.offsetTop + 4}px;`;
    
    return 'left: 0; top: 0.28rem;';
  });


  function handleInput(e: any) {
    if (isFinished) return;
    
    if (startTime === 0) startTime = Date.now();
    
    const newVal = e.target.value;
    const lastChar = newVal[newVal.length - 1];
    const targetChar = targetText[newVal.length - 1];

    if (newVal.length > userInput.length && lastChar !== targetChar) {
      mistakes++;
    }

    userInput = newVal;
    activePaw = activePaw === 'left' ? 'right' : 'left';
    lastTapTime = Date.now();

    // Calculate accuracy
    if (userInput.length > 0) {
      accuracy = Math.max(0, Math.round(((userInput.length - mistakes) / userInput.length) * 100));
    }

    // Calculate WPM
    const timeElapsed = (Date.now() - startTime) / 60000; // in minutes
    if (timeElapsed > 0) {
      const words = userInput.length / 5;
      wpm = Math.round(words / timeElapsed);
    }

    if (userInput === targetText) {
      isFinished = true;
    }

    setTimeout(() => {
      if (Date.now() - lastTapTime >= 100) activePaw = 'none';
    }, 150);
  }

  function getCharClass(char: string, index: number) {
    if (index >= userInput.length) return 'char-pending';
    return userInput[index] === char ? 'char-correct' : 'char-incorrect';
  }

  const eyeTransform = $derived.by(() => {
    if (targetText.length === 0) return 'translate(0, 0)';
    const progress = userInput.length / targetText.length;
    // Map progress (0-1) to eye movement
    // x: -3px to +3px, y: stays looking down slightly
    const x = (progress * 6) - 3;
    const y = 2; 
    return `translate(${x}px, ${y}px)`;
  });
</script>
<svelte:window onkeydown={handleGlobalKeydown} />

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div
  class="typing-test"
  id="typing"
  role="region"
  aria-labelledby="typing-play-heading"
  onclick={() => inputElement?.focus()}
>
  <header class="typing-intro">
    <h2 id="typing-play-heading" class="typing-intro-heading">If you love typing</h2>
    <p class="typing-intro-copy">
      Click, type the gray line. New line: <kbd class="typing-kbd">Tab</kbd> or <span class="typing-intro-action">Reset</span>.
    </p>
  </header>

  <TypingStatsHeader {wpm} {accuracy} onReset={() => reset(true)} />

  <TypingBongoCat {isFinished} {accuracy} {mistakes} {activePaw} {eyeTransform} />

  <div class="test-area">
    {#if isFinished}
      <TypingVictoryScreen {wpm} {accuracy} onRetry={() => reset(true)} />
    {:else}
      <div class="target-text">
        {#if !isFinished}
          <div 
            class="caret" 
            class:blinking={userInput.length === 0}
            style={caretStyle}
          ></div>
        {/if}
        {#each targetText.split('') as char, i}
          <span 
            bind:this={charElements[i]}
            class={getCharClass(char, i)}
          >{char}</span>
        {/each}
      </div>


      <input 
        type="text" 
        bind:value={userInput} 
        bind:this={inputElement}
        oninput={handleInput}
        class="typing-input"
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        spellcheck="false"
      />


    {/if}
  </div>
</div>

<style>
  .typing-test {
    background: var(--card-bg);
    border: 1px solid var(--border-subtle);
    border-radius: 10px;
    padding: 1.375rem 1.5rem 1.5rem;
    margin: 2rem auto;
    max-width: min(48rem, 100%);
    position: relative;
    cursor: pointer;
    box-shadow: none;
    transition:
      border-color 0.22s ease,
      box-shadow 0.28s ease,
      background-color 0.22s ease;
  }

  .typing-test:hover {
    border-color: var(--border-medium);
  }

  .typing-test:focus-within {
    border-color: color-mix(in srgb, var(--accent-orange) 55%, var(--border-medium));
    animation: typingSectionGlow 2.4s ease-in-out infinite;
  }

  @keyframes typingSectionGlow {
    0%,
    100% {
      box-shadow:
        0 0 0 1px color-mix(in srgb, var(--accent-orange) 32%, transparent),
        0 0 20px color-mix(in srgb, var(--accent-orange) 14%, transparent),
        0 0 40px color-mix(in srgb, var(--accent-orange) 8%, transparent);
    }
    50% {
      box-shadow:
        0 0 0 1px color-mix(in srgb, var(--accent-orange) 42%, transparent),
        0 0 28px color-mix(in srgb, var(--accent-orange) 20%, transparent),
        0 0 52px color-mix(in srgb, var(--accent-orange) 12%, transparent);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .typing-test:focus-within {
      animation: none;
      box-shadow:
        0 0 0 1px color-mix(in srgb, var(--accent-orange) 35%, transparent),
        0 0 18px color-mix(in srgb, var(--accent-orange) 12%, transparent);
    }
  }

  .typing-intro {
    margin-bottom: 1rem;
    padding-bottom: 0.875rem;
    border-bottom: 1px solid var(--border-subtle);
  }

  .typing-intro-heading {
    margin: 0 0 0.25rem 0;
    font-family: var(--font-mono);
    font-size: 0.875rem;
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: 1.35;
    color: var(--heading-color);
  }

  .typing-intro-copy {
    margin: 0;
    max-width: 32rem;
    font-family: var(--font-mono);
    font-size: 0.8125rem;
    line-height: 1.45;
    color: var(--text-muted);
  }

  .typing-intro-action {
    color: var(--text-primary);
    font-weight: 500;
  }

  .typing-kbd {
    display: inline-block;
    padding: 0.06rem 0.35rem;
    margin: 0 0.08rem;
    font-family: var(--font-mono);
    font-size: 0.6875rem;
    font-weight: 600;
    line-height: 1.35;
    color: var(--text-primary);
    vertical-align: 0.06em;
    border-radius: 4px;
    border: 1px solid var(--border-medium);
    background: var(--subtle-bg);
  }

  .test-area {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .typing-input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
    z-index: -1;
  }

  /* Monkeytype inspired styles */
  .target-text {
    position: relative;
    font-size: 1.2rem;
    font-family: var(--font-mono);
    line-height: 1.45;
    user-select: none;
    letter-spacing: 0.035em;
  }

  .caret {
    position: absolute;
    width: 2px;
    height: 1.2rem;
    background: var(--accent-orange);
    transition: all 0.1s cubic-bezier(0.19, 1, 0.22, 1);
    top: 0.28rem;
  }


  .caret.blinking {
    animation: blink 1s infinite alternate;
  }

  @keyframes blink {
    from { opacity: 1; }
    to { opacity: 0; }
  }

  .char-pending {
    color: var(--text-muted);
    opacity: 0.3;
  }

  .char-correct {
    color: var(--text-primary);
    opacity: 1;
  }

  .char-incorrect {
    color: #f7768e;
    opacity: 1;
    background: rgba(247, 118, 142, 0.15);
    border-radius: 2px;
  }


  @media (max-width: 768px) {
    .typing-intro {
      margin-bottom: 0.875rem;
      padding-bottom: 0.75rem;
    }

    .typing-intro-heading {
      font-size: 0.8125rem;
    }

    .typing-intro-copy {
      font-size: 0.75rem;
    }

    .typing-test {
      padding: 1.125rem 1.125rem 1.25rem;
      margin: 1.35rem auto;
    }

    .target-text {
      font-size: 1.02rem;
      line-height: 1.4;
    }

    .caret {
      height: 1.02rem;
      top: 0.18rem;
    }
  }
</style>
