<script lang="ts">
  import { variables } from "$lib/variables";
  import EmailAuthView from "./EmailAuthView.svelte";
  import SocialAuthView from "./SocialAuthView.svelte";

  let classes = "";

  export let supabaseClient : any;
  export let view = "sign_in";

  function setView(newView: string) {
    view = newView;
  }
</script>

<section class="hero is-primary is-fullheight">
  <div class="hero-body">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-5-tablet is-4-desktop is-3-widescreen">
          <form action="" class="box">
            <EmailAuthView {supabaseClient} {view} />
            <hr class="m-0 mb-2">
            <SocialAuthView providers="{['google', 'facebook']}" {supabaseClient} redirectTo="{variables.URL}"></SocialAuthView>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .container {
    display: flex;
    flex-direction: column;
  }
</style>
