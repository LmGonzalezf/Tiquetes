<template>
    <div>
        <b-container class="containerGigante">
            <b-row>
                <!-- Row grande -->
                <b-col cols="8">
                    <!-- Columna grande izquierda -->

                    <b-container class="containerformV">
                        <b-row>
                            <!-- Row 1 de la columna grande izquierda (seleccion ruta)-->
                            <b-col>
                                <b-form-select v-model="selectedOrigen" @change="actualizarTabla()" :options="destinos" class="formV">
                                </b-form-select>
                            </b-col>
                            <b-col>
                                <b-form-select v-model="selectedDestino" @change="actualizarTabla()" :options="destinos" class="formV">
                                </b-form-select>
                            </b-col>
                        </b-row> <!-- Row 1 de la columan grande izquierda (seleccion ruta) -->

                    </b-container>
                    <b-row> <!-- Row 3 de la columna grande izquierda (tabla de lineas) -->
                    <b-container class="containerTabla">
                        <div id="tableLineas">
                            <b-input-group class="mt-3 mb-3" size="sm">
                                <b-form-input v-model="filter" type="search" id="filterInput" placeholder="Buscar"></b-form-input>
                                <b-input-group-append><b-button :disabled="!filter" @click="filter = ''">Clear</b-button></b-input-group-append>
                            </b-input-group>
                            <b-table
                            :table-variant="tableVariant"
                            :small="true"
                            :tbody-tr-class="bodytablelineas"
                            :outlined="outlined" thead-class="headertablalineas"
                            :hover="true" 
                            :fields="fields"
                            :items="items"
                            :keyword="keyword"
                            :striped="striped"
                            :table-class="tablalineas"
                            :filter="filter"
                            :filterIncludedFields="filterOn"
                            :busy="isBusy"
                            sticky-header
                            @row-selected="onRowSelected"
                            selectable
                            :select-mode="selectMode"
                            selected-variant="success"
                            >
                            </b-table>
                        </div>
                    </b-container>
                    </b-row>  <!-- Row 3 de la columna grande izquierda (tabla de lineas) -->
                    <b-row> <!-- Row 4 de la columna grande izquierda (container datos  tiquete) -->
                    <b-container class="containerTabla">
                        <h1><b-badge variant="dark" h-75 >Venta Tiquete</b-badge></h1>
                        <b-row> <!-- Subrow de la row 4 (container datos tiquete) -->
                        <b-col> <!-- Subcolumna inputs de la row 4 (container datos tiquete) -->
                            <b-row><b-form-input required class="inputTiquete" v-model="cedula" placeholder="Cedula"></b-form-input></b-row>
                            <b-row><b-form-input required class="inputTiquete" v-model="nombre" placeholder="Nombre"></b-form-input></b-row>
                            <b-row><b-form-input class="inputTiquete" v-model="celular" placeholder="Celular"></b-form-input></b-row>
                            <b-row><b-form-checkbox class="inputTiquete" v-model="estudiante" name="estudiante" value="true" unchecked-value="false">Estudiante</b-form-checkbox></b-row>
                            <b-row>
                                <b-col><b-button class="btnVenta rounded" block variant="success">Vender</b-button></b-col>
                                <b-col><b-button class="btnVenta rounded" block variant="warning">Limpiar</b-button></b-col>
                            </b-row>
                            <b-row> <h2 class="labelTiquetes"><strong>VALOR TOTAL: </strong> {{ valorTotal}}</h2></b-row>
                        </b-col> <!-- Subcolumna inputs de la row 4 (container datos tiquete) -->
                        <b-col> <!-- Subcolumna labels de la row 4 (container datos tiquete) -->
                            <b-row> <!-- Subrow 4 para label origen (container datos tiquete) -->
                            <b class="labelTiquetes"> <strong> Origen:   </strong> {{origen}} </b>
                            </b-row> <!-- Subrow 4 para label origen (container datos tiquete) -->
                            <b-row> <!-- Subrow 5 para label destino (container datos tiquete) -->
                            <b-col class="colValor" cols="6">
                                <div class="valorTiquete">
                                    <div class="subValor">
                                        <b><strong>Destino: </strong></b>
                                    </div>
                                </div>
                            </b-col>
                            <b-col class="colValor" cols="6"><b-form-select required class="inputValorTiquete" v-model="destinoFinal" :options="destinos"></b-form-select></b-col>
                            
                            </b-row> <!-- Subrow 5 para label destino (container datos tiquete) -->
                            <b-row> <!-- Subrow 2 para label valor (container datos tiquete) -->
                            
                            <b-col class="colValor" cols="6">
                                <div class="valorTiquete">
                                    <div class="subValor">
                                        <b><strong>Valor Unitario: </strong></b>
                                    </div>
                                </div>
                            </b-col>
                            <b-col class="colValor" cols="6"><b-form-input required class="inputValorTiquete" v-model="valorUnitario" placeholder="Valor Unitario"></b-form-input></b-col>
                            
                            </b-row> <!-- Subrow 2para label valor (container datos tiquete) -->
                            <b-row> <!-- Subrow 1 para label puestos (container datos tiquete) -->
                            <b class="labelTiquetes"> <strong> Puestos:   </strong> {{ btnStates.length }} </b>
                            </b-row> <!-- Subrow 1 para label puestos (container datos tiquete) -->
                            <b-container class="containervalorTiquete">
                            
                            </b-container>
                            <b-row> <!-- Subrow 3 para label puestos (container datos tiquete) -->
                            <b class="labelTiquetes"> <strong> Puestos Seleccionados:   </strong> {{btnStates}} </b>
                            </b-row> <!-- Subrow 3 para label puestos (container datos tiquete) -->
                            
                            <b-row> <!-- Subrow 6 para label fecha (container datos tiquete) -->
                            <b class="labelTiquetes"> <strong> Fecha:   </strong> {{fecha}} </b>
                            </b-row> <!-- Subrow 6 para label fecha (container datos tiquete) -->
                            <b-row> <!-- Subrow 7 para label hora (container datos tiquete) -->
                            <b class="labelTiquetes"> <strong> Hora:   </strong> {{hora}} </b>
                            </b-row> <!-- Subrow 7 para label hora (container datos tiquete) -->
                            <b-row> <!-- Subrow 8 para label placa (container datos tiquete) -->
                            <b class="labelTiquetes"> <strong> Placa:   </strong> {{placa}} </b>
                            </b-row> <!-- Subrow 8 para label placa (container datos tiquete) -->
                            <b-row> <!-- Subrow 9 para label movil (container datos tiquete) -->
                            <b class="labelTiquetes"> <strong> Movil:   </strong> {{movil}} </b>
                            </b-row> <!-- Subrow 9 para label  (container datos tiquete) -->
                        </b-col> <!-- Subcolumna labels de la row 4 (container datos tiquete) -->
                        </b-row> <!-- Subrow de la row 4 (container datos tiquete) -->
                    </b-container>
                    </b-row> <!-- Row 4 de la columna grande izquierda (container datos tiquete) -->
                </b-col>
                <b-col sm="4" cols="4">
                    <b-container class="containerPuestos" v-bind:style="{visibility:computedVisibility}">
                    <div class="divPuestos">
                    <b-container class="containerNumPuestos">
                    <p :key="item" v-for='item in arrayPuestos'>
                        <b-row align-h="between" >
                        <b-col class="colpuestos"  v-for="(btn, idx) in item" :key="idx">
                            <b-button
                            class="btnPuesto"
                            :key="idx"
                            :disabled = "btn.able"
                            :pressed.sync="btn.state"
                            pill
                            variant="secondary"
                            active-class="btnActivo"

                        >
                        {{ btn.caption }}
                        </b-button> 
                        </b-col>
                        
                        </b-row>
                    </p>
                    </b-container>
                    </div>
                    </b-container>
                          
                </b-col> <!-- Columna grande puestos (derecha) -->
            </b-row> <!-- Row grande -->
        </b-container>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                destinoFinal:'',
                computedVisibility:'hidden',
                bodytablelineas: 'bodytablelineas',
                tablalineas:'tablalineas',
                selectMode: 'single',
                selected: [],
                isBusy: 'false',
                keyword: '',
                headVariant: 'light',
                outlined: true,
                tableVariant:'light',
                striped: true,
                selectedOrigen: parseInt(this.$store.state.taquilla),
                selectedDestino: '' ,
                cedula:'',
                nombre:'',
                celular:'',
                estudiante:false,
                destinos: this.$store.state.destinos,
                puestos:'',
                valorUnitario: '',
                puestosSelec: '',
                origen:'',
                destino:'',
                fecha:'',
                hora:'',
                placa:'',
                movil:'',
                valorTotal:'',
                carroActual:'',
                filter: null,
                filterOn: [],
                puestosCarro:'',
                puestosOcupados:[],
                arrayPuestos: [],
                carro:{},
            items: [],
            valoresFiltrados: '',
			fields: [
				{key: 'num_carro', label: 'Carro', sortable: true},
                {key: 'hora', label: 'Hora', sortable: true},
                {key: 'fecha', label: 'Fecha', sortable: true},
                {key: 'origen', label: 'Origen', sortable: true},
                {key: 'destino', label: 'Destino', sortable: true},
                {key: 'estado', label: 'Estado', sortable: true}]
            }
        },
    methods: {
        async onRowSelected(items) {
        this.destinoFinal = this.selectedDestino
        const self = this;
        this.selected = items
        this.carroActual = items[0].num_carro
        this.origen = items[0].origen
        this.destino = items[0].destino
        this.hora = items[0].hora
        this.fecha = items[0].fecha
        this.movil = items[0].num_carro
        this.puestosOcupados = [];
        var auxPuestos = [];
        this.computedVisibility = 'visible';
        await this.$http.get('http://localhost:3000/carros/'+ items[0].num_carro)
            .then(function (response) {
                self.carro = response.data[0]
                self.placa = response.data[0].placa
                self.puestosCarro = response.data[0].num_puestos
            }).catch(function(error) {
                if(error.response){console.log(error)}
            });
            await this.$http.get('http://localhost:3000/puestosLinea/'+ items[0].id)
            .then(function (response) {
                auxPuestos = response.data
                for (let index = 0; index < auxPuestos.length; index++) {
                    self.puestosOcupados.push(auxPuestos[index].num_puesto);
                }
            }).catch(function(error) {
                if(error.response){console.log(error)}
            });
        var arreglosPequeños;
        var count = 1;
        this.arrayPuestos=[];
        for (let index = 0; index <= Math.floor(self.puestosCarro/4); index++) {
            arreglosPequeños = [];
            for (let index2 = 0; index2 < 4; index2++) {
                if (count > self.puestosCarro) break;
                arreglosPequeños.push({caption: count, state:false, able: this.puestosOcupados.includes(count)})
                count++
            }
            this.arrayPuestos.push(arreglosPequeños) 
        }
      },
        actualizarTabla: async function (){
            this.isBusy = true;
            const self = this;
            if(this.selectedDestino == ''){
                console.log("entró acá")
               await this.$http.get('http://localhost:3000/lineas')
            .then(function (response) {
                self.items = response.data
            }).catch(function(error) {
                if(error.response){console.log(error)}
            });  
            }
            await this.$http.get('http://localhost:3000/lineasVentas/'+ this.selectedOrigen +'&' + this.selectedDestino )
            .then(function (response) {
                self.items = response.data
            }).catch(function(error) {
                if(error.response){console.log(error)}
            }); 
            this.isBusy = false;
        }
    },
    computed: {
      btnStates: function() {
        var ocupaditos = []
        for (let index = 0; index < this.arrayPuestos.length; index++) {
            for (let index2 = 0; index2 < this.arrayPuestos[index].length; index2++) {
                if(this.arrayPuestos[index][index2].state != undefined)
                    if(this.arrayPuestos[index][index2].state)
                        ocupaditos.push(this.arrayPuestos[index][index2].caption)
            }
        }
        return ocupaditos
      },
      seleccionados: function(){
          return this.arrayPuestos.map(btn => btn.state)
      }
    },
    mounted(){
        this.actualizarTabla()
    },
    
    }
</script>