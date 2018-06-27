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
            axios
                .get('/proxy/uptime')
                .then(response => {
                    Number.prototype.pad = function(size) {
                        var s = String(this);
                        while (s.length < ( size || 2 ))
                            s = "0" + s;
                        return s;
                    }
                    var uptime = response.data.data.uptime;

                    var hrs = Math.trunc(uptime/(60*60));
                    var mins = Math.trunc((uptime - hrs*60*60)/60);
                    var secs = uptime - hrs*60*60 - mins*60;
                    this.value = hrs.pad(2) + ':' + mins.pad(2) + ':' + mins.pad(2);
                    this.connected = true;
                })
                .catch(error => {
                    this.connected = false;
                    this.value = '--:--:--';
                })
                .finally(() => this.loading = false);
                this.loading = false;
        }.bind(this), 1500)},
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

