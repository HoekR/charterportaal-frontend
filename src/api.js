import config from "./config";
import xhr from "xhr";

export function getDocumentSuggest(query, done) {
	let options = {
		headers: {"VRE_ID": config.vreId, "Accept": "application/json"},
		url: `${config.entryUrl}/autocomplete?query=*${query}*`
	}
	let xhrDone = function(err, resp, body) {
		let data = JSON.parse(body);
		done(data.map(function(d) { return {key: d.key, value: d.value[0]} }));
	}
	xhr(options, xhrDone);
};