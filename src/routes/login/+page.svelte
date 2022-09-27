<script>
    import googleSignIn from '$lib/assets/btn_google_signin_light_normal_web.png'
    import { handleLogin, signInWithGoogle } from "$lib/auth";

  let loading = false;
  let email;
  let password;
</script>
  
  <svelte:head>
    <title>Home</title>
    <meta name="description" content="Svelte demo app" />
  </svelte:head>
  
  <section class="hero is-primary is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-5-tablet is-4-desktop is-3-widescreen">
            <form action="" class="box">
              <div class="field">
                <label for="" class="label">E-Mail</label>
                <div class="control has-icons-left">
                  <input type="email" placeholder="e.g. bobsmith@gmail.com" class="input" required>
                  <span class="icon is-small is-left">
                    <i class="fa fa-envelope"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <label for="" class="label">Passwort</label>
                <div class="control has-icons-left">
                  <input type="password" placeholder="*******" class="input" required>
                  <span class="icon is-small is-left">
                    <i class="fa fa-lock"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <label for="" class="checkbox">
                  <input type="checkbox">
                 Eingeloggt bleiben
                </label>
              </div>
              <div class="field">
                <button class="button is-success">
                  Login
                </button>
              </div>
              oder...
            <a href="#" on:click|once={signInWithGoogle}><img src="{googleSignIn}" alt="Mit Google einloggen"></a>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  <style>
  </style>
  