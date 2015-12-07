import React from "react";
import CopyForm from "./copy-form";
import {addRelation, removeRelation} from "../actions/entry";
import ExternalIcon from "./icons/external";
import appStore from "../app-store";
import CharterRelation from "./charter-relation";


class Entry extends React.Component {
	constructor(props) {
		super(props);
	}

	addRelation(type, obj) {
		if(obj.relation.value.length === 0) { return; }
		let targetId = obj.relation.key.replace(/^.*\//, "");
		appStore.dispatch(addRelation(this.props.data._id, type, targetId, this.props.user.token));
	}

	removeRelation(type, relation) {
		appStore.dispatch(removeRelation(this.props.data._id, type, relation, this.props.user.token));
	}

	renderRelations(type) {
		let relations = (this.props.data["@relations"][type] || []).filter((rel) => rel.accepted);

		if(!relations.length) { 
			return <p>{type === "isCopyOf" ? "is geen kopie van een ander document" : "wordt niet gekopiëerd door een ander document"}</p>; 
		}

		return (
			<ul>
				{relations.map((relation, i) => 
					<CharterRelation 
						data={relation} 
						key={i} 
						onClick={this.props.onChange.bind(this)} 
						onDelete={this.removeRelation.bind(this)}
						type={type} 
						user={this.props.user} />
				)}
			</ul>
		)
	}

	renderBody() {
		if(!this.props.data.title) { return (<div></div>); }
		
		let form = this.props.user.token ?
			(<CopyForm id={this.props.data._id} onChange={this.addRelation.bind(this, "isCopyOf")} />)
			: null;

		let inverseForm = this.props.user.token ?
			(<CopyForm id={this.props.data._id} onChange={this.addRelation.bind(this, "isCopiedBy")} />)
			: null;

		let link = this.props.data.links.length > 0 ? 
			(<li>
				<label>Link</label>
				<a href={this.props.data.links[0].url} target="_blank">Archief <ExternalIcon /></a>
			</li>) : null;


		return (
			<div className="entry">
				<h2>{this.props.data.title}</h2>
				<ul>
					<li>
						<label>Datum</label>
						{this.props.data.date}
					</li>
					{link}
					<li>
						<label>Inventaristekst</label>
						{this.props.data.inventaristekst.map((txt, i) => (<p key={i}>{txt}</p>) )}
					</li>
					<li>
						<label>Is kopie van</label>
						{this.renderRelations("isCopyOf")}
						{form}
					</li>
					<li>
						<label>Wordt gekopiëerd door</label>
						{this.renderRelations("isCopiedBy")}
						{inverseForm}
					</li>
				</ul>
			</div>
		)
	}

	render() {
		let body = this.renderBody();
		return (
			<div>
				<a className="button" onClick={this.props.onBackClick} >Terug</a>
				{body}
			</div>
		)
	}
}

Entry.propTypes = {
	data: React.PropTypes.object,
	onBackClick: React.PropTypes.func.isRequired,
	onChange:  React.PropTypes.func.isRequired,
	user: React.PropTypes.object
};

export default Entry;