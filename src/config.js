let baseUrl = "https://test.repository.huygens.knaw.nl/v2";

export default {
	baseUrl: baseUrl,
	entryUrl: baseUrl + "/domain/charterdocuments",
	relationUrl: baseUrl + "/domain/charterrelations",
	relationTypesUrl: baseUrl + "/system/relationtypes",
	federatedAuthenticateUrl: "https://secure.huygens.knaw.nl/saml2/login",
	basicAuthenticateUrl: baseUrl + "/authenticate",
	userUrl: baseUrl + "/system/users/me",
	vreId: "Charter"
};