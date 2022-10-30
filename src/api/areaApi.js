import {api} from './';

const baseUrl = "https://candleinthewind508.eastasia.cloudapp.azure.com/api/admin/geo";

const areaApi = api.injectEndpoints({
	endpoints: build => ({
		getAllCountries: build.query({
			query: () => ({
				url: `${baseUrl}/countries`,
				method: 'GET',
			})
		}),
		getAllCities: build.query({
			query: () => ({
				url: `${baseUrl}/cities`,
				method: 'GET',
			})
		}),
		getAllDistricts: build.query({
			query: () => ({
				url: `${baseUrl}/districts`,
				method: 'GET',
			})
		}),
		getAllWards: build.query({
			query: () => ({
				url: `${baseUrl}/wards`,
				method: 'GET',
			})
		}),
		getCityByCountryCode: build.query({
			query: ({countryCode}) => ({
				url: `${baseUrl}/cities/bycountry/${countryCode}`,
				method: 'GET',
			})
		}),
		getDistrictByCityCode: build.query({
			query: ({cityCode}) => ({
				url: `${baseUrl}/districts/bycity/${cityCode}`,
				method: 'GET',
			})
		}),
		getWardByDistrictCode: build.query({
			query: ({districtCode}) => ({
				url: `${baseUrl}/wards/bydistrict/${districtCode}`,
				method: 'GET',
			})
		}),
	})
})

export const { 
	useGetAllCountriesQuery,
	useGetAllCitiesQuery,
	useGetAllDistrictsQuery,
	useGetAllWardsQuery,
	useGetCityByCountryCodeQuery, 
	useGetDistrictByCityCodeQuery,
	useGetWardByDistrictCodeQuery
} = areaApi;
