new Vue({ el: '#custom-components'});

Vue.component('board-status', {
    data: function() {
        this.$http.get('/board/1/ping').then(
            response => { // get body data
                this.value = 'GOOD';
                this.is_bad = false;
            },
            response => { // error callback
                this.value = 'BAD';
                this.is_bad = true;
            }
        );
        return 0;
    },
    props: [ 'value', 'is_bad' ],
    template: '<div>Connection status: {{ this.value }}</div>'
});

Vue.component('board-uptime', {
    data: function() {
        this.$http.post('/board/1/uptime').then(
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
    props: [ 'value', 'is_bad' ],
    template: '<div>Board uptime: {{ this.value }}</div>'
});



var general = new Vue({
    el: '#general',
    data: {
        status: 'OK',
        uptime: '15h 23m 17s'
    }
});


