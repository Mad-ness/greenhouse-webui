export default {
    name: 'ProxyStats',
    data() {
        return {
            value: '--:--:--',
            loading: true,
            connected: false,
        }
    },
    mounted: function() {
        setInterval(function() {
            this.loading = true;
            function pad(num, size) {
                var s = "" + num;
                while ( s.length < size )
                    s = "0" + num;
                return s;
            }
            axios
                .get('/proxy/uptime')
                .then(response => {
                    var uptime = response.data.data.uptime;
                    var hrs = Math.trunc(uptime/(60*60));
                    var mins = Math.trunc((uptime - hrs*60*60)/60);
                    var secs = uptime - hrs*60*60 - mins*60;
                    this.value = pad(hrs,2) + ':' + pad(mins, 2) + ':' + pad(secs,2);
                    this.connected = true;
                })
                .catch(error => {
                    this.connected = false;
                    this.value = '--:--:--';
                })
                .finally(() => this.loading = false);
                this.loading = false;
        }.bind(this), 5000)},
    template: `
        <div>
            Proxy uptime:
            <span v-if="loading" id="connection-testing">testing...</span>
            <template v-else>
               <span v-if="connected" id="connection-good">{{ this.value }}</span>
               <span v-else id="connection-bad">{{ this.value }}</span>
            </template>
        </div>
    `
};

