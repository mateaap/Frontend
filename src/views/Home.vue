<template>
  <div class="home">
    <div class="img-bg">
      <img alt="Vue logo" src="../assets/app_logo.png" style="margin-top: 1.5%">
    </div>
    <div id="prijava" v-if="prijava" style="width: 30%; margin: 1.5% auto;">
      <b-form>
        <b-form-group>
          <b-form-input
                  id="input1"
                  v-model="korisnik.korisnickoIme"
                  type="text"
                  required
                  placeholder="Unesite korisnicko ime"
                  style="margin-bottom: 1%">
          </b-form-input>

          <b-form-input
                  id="input2"
                  v-model="korisnik.lozinka"
                  type="password"
                  required
                  placeholder="Unesite lozinku">
          </b-form-input>

        </b-form-group>

        <b-button @click="prijavaKorisnika" variant="primary" style="margin-right: 2%;">Prijavi se</b-button>
        <b-button @click="prijava = false" variant="danger">Registriraj se</b-button>
      </b-form>
    </div>
    <Registracija v-else @setPrijava="postaviStatusPrijave"></Registracija>
  </div>
</template>

<script>

  import Registracija from "../components/Registracija";
    export default {
        name: 'home',
        data() {
            return {
                korisnik: {
                  korisnickoIme: '',
                  lozinka: ''
                },
                sviKorisnici: [],
                prijava: true
            }
        },
        components: {
            Registracija
        },
        created(){
          this.dohvatiKorisnike();
        },
        methods: {
            async dohvatiKorisnike(){
              await axios.get('/korisnici')
                  .then((response) => {
                      this.sviKorisnici = response.data.korisnici[0];
                  })
                  .catch((error) => {
                      console.log('Greska: ', error);
                  })
            },
            prijavaKorisnika(){
                this.sviKorisnici.forEach(function(value){
                   if(this.korisnik.korisnickoIme === value.korisnicko_ime && this.korisnik.lozinka === value.lozinka){
                       this.$router.replace({name: 'knjige', params:{korisnik:  value}})
                   }
                }, this);
            },
            postaviStatusPrijave(status){
                this.dohvatiKorisnike();
                this.prijava = status;

            }
        }
    }
</script>

<style>
  .img-bg{
    height:200px;
    width: 200px;
    background-color: ghostwhite;
    margin: 0 auto;
    border-radius: 100px;
    transition: 1s ease;
  }
  .img-bg:hover{
    background-color: lightblue;
    border-radius: 80px;
  }
</style>