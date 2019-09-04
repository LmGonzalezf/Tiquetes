<template>
  <div>
    <b-container>
      <b-row> <!-- Row grande -->
        <b-col> <!-- Columna grande izquierda -->
          
      <b-container class= "containerformV">
          <b-row> <!-- Row 1 de la columna grande izquierda (seleccion ruta)-->
          <b-col>
    <b-form-select v-model="selectedOrigen" :options="options" class="formV"></b-form-select>
          </b-col>
          <b-col>
    <b-form-select v-model="selectedDestino" :options="options" class="formV"></b-form-select>
          </b-col>
          </b-row> <!-- Row 1 de la columan grande izquierda (seleccion ruta) -->
      
          <b-row> <!-- Row 2 de la columna grande izquierda (display ruta) -->
          <b-col>
              <div class="mt-3">Origen: <strong>{{ selectedOrigen }}</strong> </div>
          </b-col>
          <b-col>
              <div class="mt-3">Destino: <strong>{{ selectedDestino }}</strong></div>
          </b-col>
          </b-row> <!-- Row 2 de la columna grande izquierda (display ruta) -->         
    </b-container>
          <b-row> Sapo </b-row>  <!-- Row 3 de la columna grande izquierda (tabla de lineas) -->
           <!-- Row 3 de la columna grande izquierda (tabla de lineas) -->
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
        selectedOrigen: null,
        selectedDestino: null,
        options: [
          { value: null, text: 'Please select an option' },
          { value: 'a', text: 'This is First option' },
          { value: 'b', text: 'Selected Option' },
          { value: { C: '3PO' }, text: 'This is an option with object value' },
          { value: 'd', text: 'This one is disabled', disabled: true }
        ]
      }
    }
  }
</script>