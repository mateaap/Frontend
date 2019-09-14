<template>
  <div id="knjige" style="width: 80%; margin: 2.5% auto">

    <h1 style="color: ghostwhite; margin-bottom: 5%"><i>Knjige</i></h1>

    <b-table id="tablica" hover fixed head-variant="dark" table-variant="light" :items="knjige" :fields="stupci" caption-top>
      <template slot="table-caption">Ovdje su prikazane sve knjige koje imate na raspolaganju. Slobodno ih mozete dodati na listu zelja.</template>
      <template v-slot:cell(akcija)="row">
        <b-button size="sm" variant="outline-info" @click="dodajNaListuZelja(row)">Dodaj na listu zelja</b-button>
      </template>
    </b-table>
    
    <b-button-group>
      <router-link :to="{name:'novaKnjiga', params:{sviZanrovi: sviZanrovi}}"><b-button variant="outline-warning">Dodaj novu knjigu</b-button></router-link>
      <b-button v-if="!prikaziZelje" @click="prikaziZelje = true" variant="outline-light">Prikazi listu zelja</b-button>
      <b-button v-if="prikaziZelje" @click="prikaziZelje = false" variant="outline-primary">Sakri listu zelja</b-button>
      <b-button @click="odjava" variant="outline-danger">Odjavi se</b-button>
    </b-button-group>
    <ListaZelja v-if="prikaziZelje" :lista="mojaListaZelja"></ListaZelja>
  </div>
</template>

<script>

  import ListaZelja from "../components/ListaZelja";

  export default {
      name: 'knjige',
      props: ['korisnik'],
      data(){
          return {
              sveKnjige: [],
              sviZanrovi: [],
              sveListeZelja: [],

              knjige: [],
              stupci: [
                  {key: 'naziv', label: 'Naziv'},
                  {key: 'autor', label: 'Autor'},
                  {key: 'opis', label: 'Opis'},
                  {key: 'zanr', label: 'Zanr'},
                  {key: 'akcija', label: ''}
              ],
              mojaListaZelja: {
                  id: '',
                  knjige: []
              },
              prikaziZelje: false
          }
      },
      components: {
        ListaZelja
      },
      async created(){
        await this.dohvatiKnjige();
        await this.dohvatiZanrove();
        await this.dohvatiListuZelja();
        this.sloziTablicu();
        this.sloziListu();
      },
      methods: {
          async dohvatiKnjige(){
              await axios.get('/knjige')
                  .then((response) => {
                      this.sveKnjige = response.data.knjige;
                  })
                  .catch((error) => {
                      console.log('Greska: ', error);
                  })
          },
          async dohvatiZanrove(){
              await axios.get('/zanrovi')
                  .then((response) => {
                      this.sviZanrovi = response.data.zanrovi[0];
                      console.log('zanrovi: ', this.sviZanrovi);
                  })
                  .catch((error) => {
                      console.log('Greska: ', error);
                  });
          },
          async dohvatiListuZelja(){
              await axios.get('/lista')
                  .then((response) => {
                      this.sveListeZelja = response.data.lista;
                      console.log('ovo je lista zelja: ', this.sveListeZelja);
                  })
                  .catch((error) => {
                      console.log('Greska: ', error);
                  })
          },
          sloziTablicu(){
              this.sviZanrovi.forEach(function(zanr){
                  this.sveKnjige.forEach(function(knjiga){
                      if(knjiga.zanr === zanr.id){
                          this.knjige.push({id: knjiga.id, naziv: knjiga.naziv, autor: knjiga.autor, opis: knjiga.opis, zanr: zanr.naziv});
                      }
                  }, this);
              }, this);
          },
          sloziListu(){
              this.sveListeZelja.forEach(function(value){
                  if(value.korisnik === this.korisnik.id){
                      this.mojaListaZelja.id = value.id;
                      this.mojaListaZelja.knjige = value.knjige;
                  }
              }, this);
          },
          dodajNaListuZelja(row){
              var mojaListaZeljaIDs = [];
              this.mojaListaZelja.knjige.push(row.item);
              this.mojaListaZelja.knjige.forEach(function(value){
                 mojaListaZeljaIDs.push(value.id);
              });
              if (this.mojaListaZelja.id === '') {
                  const lista = {
                      korisnik: this.korisnik.id,
                      knjige: mojaListaZeljaIDs
                  };
                  axios.post('/lista', lista);
              } else {
                  const lista = {
                      id: this.mojaListaZelja.id,
                      knjige: mojaListaZeljaIDs
                  };
                  axios.put('/lista', lista)
                      .then((response) => {
                          if(response.status === 201){
                              console.log('Knjiga uspjesno dodana!');
                          }
                      })
                      .catch((error) => {
                          alert('Greska kod dodavanja knjige u listu zelja. Greska: ', error);
                      });
              }

          },
          odjava(){
              this.$router.replace({name: 'home'});
          }

      }
  }
</script>
<style>

</style>