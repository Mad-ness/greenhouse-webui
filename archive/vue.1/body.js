
Vue.component('board-status', {
    template: '<div>Connection status: {{ this.value }}</div>',
    data: function() {
        return { 
            value: axios.get('/device/ping?did=2')
                    .then( this.value = 'GET' )
                    .catch( this.value = 'Exception' )
        }
    }
});

new Vue({ el: '#custom-components'});

/*
Vue.component('board-uptime', {
    data: function() {
        this.$http.post('/proxy/uptime').then(
            response => { // get body data
                this.value = '14h 25m 13s';
                this.is_bad = false;
            },
            response => { // error callback
                this.value = 'No info';
                this.is_bad = true;
            }
        );
    },
    template: '<div>Board uptime: {{ this.value }}</div>'
});
*/


var general = new Vue({
    el: '#general',
    data: {
        status: 'OK',
        uptime: '15h 23m 17s'
    }
});


