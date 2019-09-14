<template>
  <div id="forma">
    <b-form>
      <b-form-group
              id="form-group-1"
              label-align="left"
              label="Unos novog korisnika">
        <b-form-input
                id="input1"
                v-model="korisnik.Ime"
                type="text"
                required
                placeholder="Vase ime">
        </b-form-input>

        <b-form-input
                id="input2"
                v-model="korisnik.Prezime"
                type="text"
                required
                placeholder="Vase prezime">
        </b-form-input>

        <b-form-input
                id="input3"
                v-model="korisnik.korisnicko_ime"
                type="text"
                required
                placeholder="Unesite korisnicko ime">
        </b-form-input>

        <b-form-input
                id="input4"
                v-model="korisnik.lozinka"
                type="password"
                required
                placeholder="Unesite lozinku">
        </b-form-input>

      </b-form-group>

      <b-button @click="submit" variant="danger" style="margin-right: 2%;">Registriraj se</b-button>
      <b-button @click="emitReg" variant="primary">Odustani</b-button>
    </b-form>

  </div>
</template>

<script>
    export default {
        name: "registracija",
        data(){
            return {
                korisnik: {
                    Ime: '',
                    Prezime: '',
                    korisnicko_ime: '',
                    lozinka: ''
                },
            }
        },
        methods: {
            submit(){
                axios.post('/korisnici', this.korisnik)
                    .then((response) => {
                        if(response.status === 201){
                            alert('Korisnik je uspjesno spremljen!');
                            this.resetForm();
                            this.emitReg();
                        }
                    })
            },
            emitReg(){
                this.$emit("setPrijava", true);
            },
            resetForm(){
                this.korisnik.Ime = '';
                this.korisnik.Prezime = '';
                this.korisnik.korisnicko_ime = '';
                this.korisnik.lozinka = '';
            }
        }
    }
</script>

<style scoped>

  #form-group-1{
    width: 30%;
    margin: 2% auto;
    color: ghostwhite;
  }
  #input1, #input2, #input3{
    margin-bottom: 1.5%;
  }
</style>