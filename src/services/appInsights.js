import { ApplicationInsights } from '@microsoft/applicationinsights-web';

const appInsights = new ApplicationInsights({
    config: {
        connectionString: process.env.VUE_APP_APPINSIGHTS_CONNECTION_STRING // Use env variable
    }
});

appInsights.loadAppInsights();
appInsights.trackPageView();

export default appInsights;