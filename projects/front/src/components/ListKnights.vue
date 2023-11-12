<template>
  <div>
    <table id="tb">
      <thead>
        <tr>
          <th>Name</th>
          <th>Idade</th>
          <th>Armas</th>
          <th>Atributo</th>
          <th>Ataque</th>
          <th>Exp</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.name }}</td>
          <td>{{ item.age }}</td>
          <td>{{ item.weapons.length }}</td>
          <td>{{ item.keyAttribute }}</td>
          <td>{{ item.attack }}</td>
          <td>{{ item.exp }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    };
  },
  mounted() {
    fetch('http://localhost:3333/knights')
      .then(response => response.json())
      .then(data => {
        this.items = data;
      })
      .catch(error => {
        console.error('Erro ao buscar dados da API: ', error);
      });
  }
}
</script>
