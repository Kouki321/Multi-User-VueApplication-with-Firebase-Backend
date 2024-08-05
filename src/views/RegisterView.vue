<template>
  <div class="form-wrap"> 
    <form class="registerView"> 
      <p class="login-register"> 
        Already have an account?
        <router-link class="router-link" :to="{ name: 'LoginView' }">Login</router-link> 
      </p> 
      <h2>Create your FireBlog Account</h2> 
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder="First Name" v-model="firstName" /> 
          <img src="../assets/Icons/user-alt-light.svg" class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="Last Name" v-model="lastName" /> 
          <img src="../assets/Icons/user-alt-light.svg" class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="User Name" v-model="userName" /> 
          <img src="../assets/Icons/user-alt-light.svg" class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="Email" v-model="email" /> 
          <img src="../assets/Icons/envelope-regular.svg" class="icon" />
        </div>
        <div class="input"> 
          <input type="password" placeholder="Password" v-model="password" /> 
          <img src="../assets/Icons/lock-alt-solid.svg" class="icon" />
        </div>
        <div class="error" v-show="error">{{ this.errorMsg }}</div>
      </div>  
      <button @click.prevent="register">Sign up</button>
      <div class="angle"></div>
    </form> 
    <div class="background"></div>
  </div> 
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebase/firebaseInit";
import { collection, doc, setDoc } from "firebase/firestore";

export default {
  name: 'RegisterView',
  data() {
    return {
      email: "",
      password: "",
      lastName: "",
      firstName: "",
      userName: "",
      error: null,
      errorMsg: "",
      active: false,
      admin: false,
    };
  },
  methods: {
    async register() {
      if (
        this.email !== "" &&
        this.password !== "" &&
        this.firstName !== "" &&
        this.lastName !== "" &&
        this.userName !== ""
      ) {
        this.error = false;
        this.errorMsg = "";

        try {
          const auth = getAuth();
          const createUser = await createUserWithEmailAndPassword(auth, this.email, this.password);
          const result = await createUser;

          const userDoc = doc(collection(db, "users"), result.user.uid);
          await setDoc(userDoc, {
            firstName: this.firstName,
            lastName: this.lastName,
            userName: this.userName,
            active: false,
            admin: false,
            email: this.email,
          });
          
          this.$router.push({ name: "HomeView" });
        } catch (error) {
          this.error = true;
          this.errorMsg = error.message;
          console.error("Error registering user:", error); // Print error details
        }
        return;
      }
      this.error = true;
      this.errorMsg = "Please fill out all the fields!";
    },
  }
};
</script>

<style lang="scss" scoped>
.register {
  h2 {
    max-width: 350px;
  }
}
</style>
