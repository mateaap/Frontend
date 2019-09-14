<template>
  <div id="listaZelja">
    <h1 style="color: ghostwhite; text-align: start; margin: 2% 0"><i>Moja lista zelja</i></h1>
    <ol v-if="listaPuna">
      <li v-for="(knjiga, index) in lista.knjige" :key="index">
        <h3 style="color: white;">{{knjiga.naziv}}</h3>
        <h5 style="color: white;">{{knjiga.autor}}</h5>
        <b-button @click="uklonisListe(index, knjiga.id)" variant="danger" class="list-btn">Ukloni</b-button>
      </li>
    </ol>
    <div v-else style="padding-left: 2.5%; color: ghostwhite; text-align: start">
      <p>Trenutno nemate knjiga na listi zelja</p>
    </div>
  </div>
</template>

<script>

    export default {
        name: "ListaZelja",
        props: {
            lista: Object
        },
        data(){
            return {
                listaPuna: false,
            }
        },
        mounted(){
          if(this.lista.knjige.length === 0){
              this.listaPuna = false;
          } else {
            this.listaPuna = true;
          }
        },
        methods: {
            uklonisListe(index){
                var mojaListaZeljaIDs = [];
                this.lista.knjige.splice(index, 1);
                this.lista.knjige.forEach(function(value){
                    mojaListaZeljaIDs.push(value.id);
                });
                const lista = {
                    id: this.lista.id,
                    knjige: mojaListaZeljaIDs
                };
                axios.put('/lista', lista)
                    .then((response) => {
                        if(response.status === 201){
                            alert('Knjiga uspjesno obrisana!');
                        }
                    })
                    .catch((error) => {
                        alert('Greska kod brisanja knjige u listi zelja. Greska: ', error);
                    });
            }
        }
    }
</script>

<style scoped>
  ol li{
    text-align: start;
  }
  ol li h3, ol li h5, .list-btn{
    display: inline-block;
    margin-right: 1.5%;
  }
  .list-btn{
    float: right;
  }

</style>