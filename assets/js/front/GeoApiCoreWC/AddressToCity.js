export class AddressToCity {
    constructor(document, api_url, bearer_token, license, domain, country_target, address_target, zip_target, city_target) {
        this.apiUrl         = api_url;
        this.bearerToken    = bearer_token;
        this.license        = license;
        this.domain         = domain;
        this.countryElement = document.querySelector(country_target);
        this.addressElement = document.querySelector(address_target);
        this.zipElement     = document.querySelector(zip_target);
        this.cityElement    = document.querySelector(city_target);
    }

    getApiUrl() {
        return this.apiUrl;
    }

    getBearerToken() {
        return this.bearerToken;
    }

    getLicense() {
        return this.license;
    }

    getDomain() {
        return this.domain;
    }

    getCountryElement() {
        return this.countryElement;
    }

    getAddressElement() {
        return this.addressElement;
    }

    getZipElement() {
        return this.zipElement;
    }

    getCityElement() {
        return this.cityElement;
    }

    async apiCallGeoAddressData() {
        const
            countryCode = this.countryElement.options[this.countryElement.selectedIndex].value,
            addressValue = this.addressElement.value,
            response = await fetch(
                this.getApiUrl(),
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + this.getBearerToken()
                    },
                    body: JSON.stringify({
                        'address': encodeURIComponent(addressValue),
                        'country': countryCode,
                        'license': this.getLicense(),
                        'domain': this.getDomain()
                    })
                }
            )
        ;

        if (! response.ok) {
            return false;
        }

        const geoData = await response.json();

        // implement better checking ZIP and City separate
        if (! geoData) {
            return false;
        }

        this.zipElement.value  = geoData.zip;
        this.cityElement.value = geoData.name;
    }
}