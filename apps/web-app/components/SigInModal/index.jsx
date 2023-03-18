import { createClient } from '@supabase/supabase-js'
import SignInModalView from "./view.jsx";

const supabaseUrl = "https://polcxtixgqxfuvrqgthn.supabase.co"
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const SignInModal = ({ isOpen, closeModal, checkSession }) => {

  async function handleSignIn(event) {
    event?.preventDefault();
    const email = event.target[0].value
    const password = event.target[1].value
    try {
      const result = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      closeModal()
      checkSession()
    } catch (error) {
      closeModal()
      alert("Not a valid login")
    }

  }

  return <SignInModalView isOpen={isOpen} closeModal={closeModal} handleSignIn={handleSignIn} />;
};

export default SignInModal;
