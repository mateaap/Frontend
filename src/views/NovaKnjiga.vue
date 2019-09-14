<template>
  <div id="novaKnjiga">
    <b-form>
      <b-form-group
              id="form-group-1"
              label="Unos nove knjige">
        <b-form-input
                id="input1"
                v-model="novo.naziv"
                type="text"
                required
                placeholder="Naziv knjige">
        </b-form-input>

        <b-form-input
                id="input2"
                v-model="novo.autor"
                type="text"
                required
                placeholder="Naziv autora knjige">
        </b-form-input>

        <b-form-textarea
                id="input3"
                v-model="novo.opis"
                type="text"
                required
                placeholder="Kratak opis radnje"
                rows="3"
                max-rows="6">
        </b-form-textarea>

        <b-form-select
                id="select1"
                v-model="novo.zanr"
                type="text"
                required
                :options="zanrovi">

        </b-form-select>

      </b-form-group>

      <b-button @click="submit" variant="success" style="margin-right: 2%;">Spremi knjigu</b-button>
      <b-button @click="odustani" variant="danger">Odustani</b-button>
    </b-form>
  </div>
</template>

<script>
    export default {
        name: "NovaKnjiga",
        props: ['sviZanrovi'],
        data(){
            return {
                novo: {
                    naziv: '',
                    autor: '',
                    opis: '',
                    zanr: ''
                },
                zanrovi: [
                    {value: null, text: 'Odaberi zanr knjige'},
                ]
            }
        },
        created(){
            this.sviZanrovi.forEach(function(value){
                this.zanrovi.push({value: value.id, text: value.naziv});
            }, this);
        },
        methods: {
            submit(){

                axios.post('/knjige', this.novo)
                    .then((response) => {
                        if(response.status === 201){
                            alert('Knjiga je uspjesno spremljena!');
                        }
                    })
                    .catch((error) => {
                        alert('Greska kod spremanja nove knjige, ', error);
                    })
                    .finally(() => {
                        this.resetiraj();
                    })
            },
            odustani(){
                this.resetiraj();
                this.$router.replace({name: 'knjige'});
            },
            resetiraj(){
                this.novo.naziv = '';
                this.novo.autor = '';
                this.novo.opis = '';
                this.novo.zanr = '';
            }
        }
    }
</script>

<style scoped>
  #form-group-1{
    width: 40%;
    margin: 2.5% auto;
    color: white;
  }
  #input1, #input2, #input3{
    margin-bottom: .5%;
  }
  #select1{
    width: 50%;
  }

</style>