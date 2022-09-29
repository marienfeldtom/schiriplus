<script>
  import Auth from '$lib/components/auth/Auth.svelte';
  import { supabaseClient } from '$lib/db';
</script>
<Auth {supabaseClient} />
  <style>
  </style>
  