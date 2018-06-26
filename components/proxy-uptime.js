export default {
    name: 'ProxyUptime',
    data() {
        return {
            loading: true,
            connected: false,
        }
    },
    mounted: function() {
        setInterval(function() {
            this.loading = true;
            axios
                .get('/proxy/uptime')
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
            Proxy uptime:
            <span v-if="loading" id="connection-testing">testing...</span>
            <template v-else>
               <span v-if="connected" id="connection-good">00:00:00</span>
               <span v-else id="connection-bad">--:--:--</span>
            </template>
        </div>
    `
};

