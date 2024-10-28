const app = new Vue({
  el: '#app',
  data: {
    name: '',
    age: '',
    phone: '',
    temp: '',
    state: 1,
    list: []
  },
  computed: {
    available() {
      return this.name !== '' && this.age !== '' && this.phone !== '';
    }
  },
  created() {
    this.fetch_data()
  },
  methods: {
    async fetch_data() {
      try {
        const res = await axios.get('http://127.0.0.1:3000/get');
        console.log(res);
        this.list = res.data
      } catch (error) {
        console.error(error);
      }
    },

    async data_upload() {
      if (this.available) {
        try {
          const res = await axios.post('http://127.0.0.1:3000/post', {
            ID: '',
            name: this.name,
            age: this.age,
            phone: this.phone
          })
        } catch (error) {
          console.error(error);
        }


        this.name = ''
        this.age = ''
        this.phone = ''
        this.fetch_data()

      }
    },

    data_deletes(ID) {
      axios({
        url: 'http://127.0.0.1:3000/delete',
        method: 'delete',
        data: {
          ID
        }
      }).then(result => {
        console.log(result)
        this.fetch_data()
      }).catch(error => {
        console.log(error)
      })

    },

    data_patch(ID) {
      if (this.state === 1) {
        this.state = 0
      }
      axios({
        url: 'http://127.0.0.1:3000/find',
        method: 'get',
        params: { ID }
      }).then(result => {
        console.log(result.data[0])
        this.name = result.data[0].name
        this.age = result.data[0].age
        this.phone = result.data[0].phone
        this.temp = result.data[0].ID
      }).catch(error => {
        console.log(error.message)
      })
    },
    async submit_patch() {
      let obj = {
        ID: this.temp,
        name: this.name,
        age: this.age,
        phone: this.phone
      }
      if (this.available) {
        try {
          await axios({
            url: 'http://127.0.0.1:3000/patch',
            method: 'post',
            data: obj
          });
          console.log('Data updated successfully');
          this.fetch_data();
        } catch (error) {
          console.error('Error updating data:', error);
        }
      }
      this.temp = '';
      this.name = '';
      this.age = '';
      this.phone = '';
      this.state = 1;
    }
  },
})
