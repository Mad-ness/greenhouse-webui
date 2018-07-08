export default {
    name: 'ProxyStats',
    data() {
        return {
            uptime: 0,
            uptime_str: '--:--:--',
            loading: true,
            connected: false,
        }
    },
    mounted: function() {
        setInterval(function() {
            this.uptime += 1;
            this.uptime_str = int2strtime(this.uptime);
        }.bind(this), 1000);

        setInterval(function() {
            this.loading = true;
            function pad(num, size) {
                var s = "" + num;
                while ( s.length < size )
                    s = "0" + num;
                return s;
            }
            axios
                .get('/proxy/uptime\?did=1')
                .then(response => {
                    this.uptime = Number(response.data.data.uptime);
                    this.connected = true;
                })
                .catch(error => {
                    this.connected = false;
                })
                .finally(() => this.loading = false);
                this.loading = false;
        }.bind(this), 15000)},
    template: `
        <div>
            Proxy uptime:
            <span v-if="loading" id="connection-testing">testing...</span>
            <template v-else>
               <span v-if="connected" id="connection-good">{{ this.uptime_str }}</span>
               <span v-else id="connection-bad">{{ this.uptime_str }}</span>
            </template>
        </div>
    `
};

