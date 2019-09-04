<template>
    <div>
        <b-container class="containerGigante">
            <b-row>
                <!-- Row grande -->
                <b-col>
                    <!-- Columna grande izquierda -->

                    <b-container class="containerformV">
                        <b-row>
                            <!-- Row 1 de la columna grande izquierda (seleccion ruta)-->
                            <b-col>
                                <b-form-select v-model="selectedOrigen" :options="destinos" class="formV">
                                </b-form-select>
                            </b-col>
                            <b-col>
                                <b-form-select v-model="selectedDestino" :options="destinos" class="formV">
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
                            >
                            </b-table>
                        </div>
                    </b-container>
                    </b-row>  <!-- Row 3 de la columna grande izquierda (tabla de lineas) -->
                    <b-row> <!-- Row 4 de la columna grande izquierda (container datos  tiquete) -->
                    <b-container class="containerTabla">
                        <h2><b-badge>Venta Tiquete</b-badge></h2>
                        <b-row> <!-- Subrow de la row 4 (container datos tiquete) -->
                        <b-col> <!-- Subcolumna inputs de la row 4 (container datos tiquete) -->
                            <b-row><b-form-input required class="inputTiquete" v-model="cedula" placeholder="Cedula"></b-form-input></b-row>
                            <b-row><b-form-input required class="inputTiquete" v-model="nombre" placeholder="Nombre"></b-form-input></b-row>
                            <b-row><b-form-input class="inputTiquete" v-model="celular" placeholder="Celular"></b-form-input></b-row>
                            <b-row><b-form-checkbox class="inputTiquete" v-model="estudiante" name="estudiante" value="true" unchecked-value="false">Estudiante</b-form-checkbox></b-row>
                            <b-row>
                                <b-col><b-button variant="success">Vender</b-button></b-col>
                                <b-col><b-button variant="warning">Limpiar</b-button></b-col>
                            </b-row>
                            <b-row> <h2 id="valorTotal"><strong>VALOR TOTAL: </strong> asuputamdre</h2></b-row>
                        </b-col> <!-- Subcolumna inputs de la row 4 (container datos tiquete) -->
                        <b-col> <!-- Subcolumna labels de la row 4 (container datos tiquete) -->
                            <b-row> <!-- Subrow 1 para label puestos (container datos tiquete) -->
                            <b class="labelTiquetes"> <strong> Puestos:   </strong> asuputamdre </b>
                            </b-row> <!-- Subrow 1 para label puestos (container datos tiquete) -->
                            <b-row> <!-- Subrow 2 para label valor (container datos tiquete) -->
                            <b class="labelTiquetes"> <strong> Valor Unitario:   </strong> asuputamdre </b>
                            </b-row> <!-- Subrow 2para label valor (container datos tiquete) -->
                            <b-row> <!-- Subrow 3 para label puestos (container datos tiquete) -->
                            <b class="labelTiquetes"> <strong> Puestos Seleccionados:   </strong> asuputamdre </b>
                            </b-row> <!-- Subrow 3 para label puestos (container datos tiquete) -->
                            <b-row> <!-- Subrow 4 para label origen (container datos tiquete) -->
                            <b class="labelTiquetes"> <strong> Origen:   </strong> asuputamdre </b>
                            </b-row> <!-- Subrow 4 para label origen (container datos tiquete) -->
                            <b-row> <!-- Subrow 5 para label destino (container datos tiquete) -->
                            <b class="labelTiquetes"> <strong> Destino:   </strong> asuputamdre </b>
                            </b-row> <!-- Subrow 5 para label destino (container datos tiquete) -->
                            <b-row> <!-- Subrow 6 para label fecha (container datos tiquete) -->
                            <b class="labelTiquetes"> <strong> Fecha:   </strong> asuputamdre </b>
                            </b-row> <!-- Subrow 6 para label fecha (container datos tiquete) -->
                            <b-row> <!-- Subrow 7 para label hora (container datos tiquete) -->
                            <b class="labelTiquetes"> <strong> Hora:   </strong> asuputamdre </b>
                            </b-row> <!-- Subrow 7 para label hora (container datos tiquete) -->
                            <b-row> <!-- Subrow 8 para label placa (container datos tiquete) -->
                            <b class="labelTiquetes"> <strong> Placa:   </strong> asuputamdre </b>
                            </b-row> <!-- Subrow 8 para label placa (container datos tiquete) -->
                            <b-row> <!-- Subrow 9 para label movil (container datos tiquete) -->
                            <b class="labelTiquetes"> <strong> Movil:   </strong> asuputamdre </b>
                            </b-row> <!-- Subrow 9 para label  (container datos tiquete) -->
                        </b-col> <!-- Subcolumna labels de la row 4 (container datos tiquete) -->
                        </b-row> <!-- Subrow de la row 4 (container datos tiquete) -->
                    </b-container>
                    </b-row> <!-- Row 4 de la columna grande izquierda (container datos tiquete) -->
                </b-col>
                <b-col sm="4">Hola</b-col> <!-- Columna grande puestos (derecha) -->
            </b-row> <!-- Row grande -->
        </b-container>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                keyword: '',
                headVariant: 'light',
                outlined: true,
                tableVariant:'light',
                striped: true,
                selectedOrigen: null,
                selectedDestino: null,
                cedula:'',
                nombre:'',
                celular:'',
                estudiante:'',
                destinos: ['verga', 'sapo', {asopotamadre: 'xd'}],
                carroActual:{},
                filter: null,
                filterOn: [],
                
            items: [{ carro: 2011, hora: '16:16', origen: '1 - Pacho', destino: '2 - Bogotá', estado: 1 },
            { carro: 2011, hora: '16:16', origen: '1 - Pacho', destino: '2 - Bogotá', estado: 1 },
            { carro: 2012, hora: '16:16', origen: '1 - Zipa', destino: '2 - Bogotá', estado: 1 },
            { carro: 2013, hora: '16:16', origen: '1 - Pacho', destino: '2 - Bogotá', estado: 1 },
            { carro: 2014, hora: '16:16', origen: '1 - Pacho', destino: '2 - Bogotá', estado: 1 }],
            valoresFiltrados: '',
			fields: [
				{key: 'carro', label: 'Carros', sortable: true},
				{key: 'hora', label: 'Last name', sortable: true},
                {key: 'origen', label: 'Origen', sortable: true},
                {key: 'destino', label: 'Destino', sortable: true},
                {key: 'estado', label: 'Estado', sortable: true}]
            }
        },
        computed: {
    },
    mounted(){
        
    }
    }
</script>