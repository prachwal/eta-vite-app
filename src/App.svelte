<script lang="ts">
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import Counter from './lib/Counter.svelte'
  
  interface ApiResponse<T = any> {
    status: boolean;
    payload?: T;
    error?: {
      code: string;
      message: string;
      details?: any;
    };
    metadata?: {
      timestamp: string;
      requestId?: string;
      [key: string]: any;
    };
  }

  interface HelloResponse {
    message: string;
  }

  interface User {
    id: number;
    name: string;
  }

  let helloMessage = '';
  let users: User[] = [];
  let newUserName = '';
  let loading = false;
  let error = '';

  async function fetchHello() {
    try {
      loading = true;
      error = '';
      const response = await fetch('/api/hello');
      const data: ApiResponse<HelloResponse> = await response.json();
      
      if (data.status && data.payload) {
        helloMessage = data.payload.message;
      } else {
        error = data.error?.message || 'Failed to fetch hello message';
      }
    } catch (err) {
      error = err instanceof Error ? err.message : 'Unknown error occurred';
    } finally {
      loading = false;
    }
  }

  async function createUser() {
    if (!newUserName.trim()) {
      error = 'Please enter a user name';
      return;
    }

    try {
      loading = true;
      error = '';
      
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newUserName }),
      });

      const data: ApiResponse<User> = await response.json();
      
      if (data.status && data.payload) {
        users = [...users, data.payload];
        newUserName = '';
      } else {
        error = data.error?.message || 'Failed to create user';
      }
    } catch (err) {
      error = err instanceof Error ? err.message : 'Unknown error occurred';
    } finally {
      loading = false;
    }
  }

  // Fetch hello message on component mount
  fetchHello();
</script>

<main>
  <div>
    <a href="https://vite.dev" target="_blank" rel="noreferrer">
      <img src={viteLogo} class="logo" alt="Vite Logo" />
    </a>
    <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
    </a>
  </div>
  <h1>Vite + Svelte</h1>

  <div class="card">
    <Counter />
  </div>

  <!-- API Testing Section -->
  <div class="card">
    <h2>API Testing</h2>
    
    <div>
      <h3>Hello Endpoint</h3>
      {#if loading && !helloMessage}
        <p>Loading...</p>
      {:else if helloMessage}
        <p><strong>Response:</strong> {helloMessage}</p>
      {/if}
      
      <button on:click={fetchHello} disabled={loading}>
        Refresh Hello
      </button>
    </div>

    <div>
      <h3>Users Endpoint</h3>
      
      <form on:submit|preventDefault={createUser}>
        <input 
          type="text" 
          bind:value={newUserName} 
          placeholder="Enter user name"
          disabled={loading}
        />
        <button type="submit" disabled={loading || !newUserName.trim()}>
          Create User
        </button>
      </form>

      {#if users.length > 0}
        <h4>Created Users:</h4>
        <ul>
          {#each users as user}
            <li>ID: {user.id}, Name: {user.name}</li>
          {/each}
        </ul>
      {/if}
    </div>

    {#if error}
      <div style="color: red; margin-top: 1rem;">
        <strong>Error:</strong> {error}
      </div>
    {/if}
  </div>

  <p>
    Check out <a href="https://github.com/sveltejs/kit#readme" target="_blank" rel="noreferrer">SvelteKit</a>, the official Svelte app framework powered by Vite!
  </p>

  <p class="read-the-docs">
    Wersja: {__APP_VERSION__}
  </p>
</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e8a);
  }
  .read-the-docs {
    color: #888;
  }

  .card {
    padding: 2em;
    margin: 1em 0;
  }

  input {
    padding: 0.5em;
    margin-right: 0.5em;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    padding: 0.5em 1em;
    background: #646cff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover:not(:disabled) {
    background: #535bf2;
  }

  button:disabled {
    background: #ccc;
    cursor: not-allowed;
  }

  ul {
    text-align: left;
    max-width: 300px;
    margin: 1em auto;
  }

  li {
    margin: 0.5em 0;
  }
</style>
