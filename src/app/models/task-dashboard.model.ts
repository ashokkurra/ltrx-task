export class DashboardDetails {
    firstname?: string;
    lastname?: string;
    country?: string;
    bio?: string;
    username?: string;
    email?: string;

    constructor(dashboardDetailsObj: DashboardDetails) {
        if (dashboardDetailsObj) {
            this.firstname = dashboardDetailsObj.firstname || '';
            this.lastname = dashboardDetailsObj.lastname || '';
            this.country = dashboardDetailsObj.country || '';
            this.bio = dashboardDetailsObj.bio || '';
            this.username = dashboardDetailsObj.username || '';
            this.email = dashboardDetailsObj.email || '';
        }
    }
}
