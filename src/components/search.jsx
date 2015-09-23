import React from "react";
import FacetedSearch from "hire-faceted-search-bridge";
import Result from "./result";
import config from "../config";

const labels = {
	facetTitles: {
		"dynamic_sort_creator": "Auteur",
		"dynamic_sort_title": "Titel",
		"dynamic_i_date": "Datum"
	},
	"resultsFound": "resultaten",
	"sortBy": "Sorteer op",
	"showAll": "Alles",
	"newSearch": "Nieuwe zoekvraag"
};


class Search extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			childIsOpen: false
		}

		this.renderedSearch = null;
	}

	onSelect(data) {
		if(data && data.editThisRecord) {
			this.props.onEditClick(data);
		} else {
			if(document.querySelector(".more-info-opened")) {
				this.setState({childIsOpen: true});
			} else {
				this.setState({childIsOpen: false});
			}
		}
	}

	onChange(results, query) {
		this.setState({childIsOpen: false});
	}

	renderSearch() {
		this.renderedSearch = this.renderedSearch || 
			<FacetedSearch
					config={{
						baseURL: config.baseUrl,
						searchPath: "/search/charterdocuments",
						levels: ["dynamic_sort_creator", "dynamic_sort_title"],
						headers: {VRE_ID: "Charter", Accept: "application/json"}
					}}
					labels={labels}
					onChange={this.onChange.bind(this)}
					onSelect={this.onSelect.bind(this)}
					resultComponent={Result}
					/>;
		return this.renderedSearch;
	}

	render() {
		return (
			<div className={(this.state.childIsOpen ? "child-is-open " : "") + (this.props.user && this.props.user.token ? "editable " : "") }>
				{this.renderSearch()}
			</div>
		);
	}


}

Search.propTypes = {
	user: React.PropTypes.object,
	onEditClick: React.PropTypes.func.isRequired
}

export default Search;