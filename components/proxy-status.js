export default {
    name: 'ProxyStatus',
    data() {
        return {
            loading: true,
            connected: false,
            status_style: ''
        }
    },
    mounted: function() {
        setInterval(function() {
            this.loading = true;
            axios
                .get('/proxy/ping\?did=1')
                .then(response => {
                    if ( response.data.status_code == 202 ) {
                        this.connected = true;
                    } else
                        this.conn_state = 'Unknown'
                })
                .catch(error => {
                    this.connected = false;
                })
                .finally(() => this.loading = false);
                this.loading = false;
        }.bind(this), 3500)},
    template: `
        <div>
            Proxy connection:
            <span v-if="loading" id="connection-testing">testing...</span>
            <template v-else>
               <span v-if="connected" id="connection-good">Good</span>
               <span v-else id="connection-bad">Bad</span>
            </template>
        </div>
    `
};

