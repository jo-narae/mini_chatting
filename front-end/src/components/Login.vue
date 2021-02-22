<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="300px"
  >
    <v-card>
      <v-card-text class="pt-3">
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-text-field
            v-model="name"
            :rules="[value => !!value || '대화명을 입력해주세요']"
            label="대화명"
            v-on:keyup.enter="userLogin"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions class="pb-3">
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="userLogin">
          입력
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data () {
    return {
      valid: true,
      dialog: true,
      name: ''
    }
  },
  methods: {
    async userLogin() {
      if (this.$refs.form.validate()) {
        await this.$joinUser(this.name);
        await this.$emit('setUserName', this.name);
        this.dialog = false;
      }
    }
  }
}
</script>

<style>

</style>