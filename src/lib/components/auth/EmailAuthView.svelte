<script lang="ts">
  import googleSignIn from "$lib/assets/btn_google_signin_light_normal_web.png";
  import { signInWithGoogle } from "$lib/auth";

  export let supabaseClient: any;
  export let view : any;
  export let setView;

  let error = "",
    message = "",
    loading = false,
    email = "",
    password = "";

  async function submit() {
    error = "";
    message = "";
    loading = true;

    if (view == "sign_up") {
      const { error: signUpError } = await supabaseClient.auth.signUp({
        email,
        password,
      });

      if (signUpError) error = signUpError.message;
    } else if (view == "sign_in") {
      const { error: signInError } = await supabaseClient.auth.signIn({
        email,
        password,
      });

      if (signInError) error = signInError.message;
    }

    loading = false;
  }
</script>

<div class="field">
  <label for="" class="label">E-Mail</label>
  <div class="control has-icons-left">
    <input
      type="email"
      placeholder="e.g. bobsmith@gmail.com"
      class="input"
      required
    />
    <span class="icon is-small is-left">
      <i class="fa fa-envelope" />
    </span>
  </div>
</div>
<div class="field">
  <label for="" class="label">Passwort</label>
  <div class="control has-icons-left">
    <input type="password" placeholder="*******" class="input" required />
    <span class="icon is-small is-left">
      <i class="fa fa-lock" />
    </span>
  </div>
</div>
<div class="field">
  <label for="" class="checkbox">
    <input type="checkbox" />
    Eingeloggt bleiben
  </label>
</div>
<div class="field">
  <button class="button is-success"> Login </button>
</div>
