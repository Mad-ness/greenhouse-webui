import ProxyStatus from './proxy-status.js';
import ProxyStats from './proxy-stats.js';


export default {
    name: 'App',
    components: {
        ProxyStatus,
        ProxyStats,
    },
    template: `
        <div class="container mx-auto p-4">
            <ProxyStatus></ProxyStatus>
            <ProxyStats></ProxyStats>
        </div>
    `
};

