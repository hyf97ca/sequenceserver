import './sequence';
import React from 'react';
import _ from 'underscore';
import {getAlignments} from './t3se';

/**
 * Takes sequence accession as props, fetches the sequence from the server, and
 * displays it in a modal.
 */
export default class TreeModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error_msgs: [],
            alignments: [],
            selected: {},
            search_id: ''
        };
    }

    // Lifecycle methods. //

    render () {
        return (
            <div className="modal tree-viewer" ref="treeModal" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>View tree</h3>
                            Select effector families to run progressive alignments to generate a tree.
                            Selecting a lot of families has the potential to take VERY long to generate the tree.
                        </div>

                        { this.resultsJSX() }
                    </div>
                </div>
            </div>
        );
    }

    /*
    * Returns jQuery reference to the main modal container.
    */
    modal () {
        return $(React.findDOMNode(this.refs.treeModal));
    }

    /**
     * Shows tree viewer.
     */
    show (search_id) {
         var selected = {};
         var alignments = getAlignments();
         alignments.forEach((aln) => {
            selected[aln] = false;
         });
        this.setState({search_id: search_id, alignments: alignments, selected: selected
        }, () => {
            this.modal().modal('show');
        });
    }

    toggleSelected(aln) {
        var selected = this.state.selected;
        selected[aln] = !selected[aln];
        this.setState({selected: selected});
    }

    isSelected(){
        if (this.state.selected === undefined)
            return false;
        for (var i = 0; i < this.state.alignments.length; i++)
        {
            if (this.state.selected[this.state.alignments[i]])
                return true;
        }
        return false;
    }

    generateTree() {
        var nwk_url = "https://hopper.csb.utoronto.ca/generateTree/" + this.state.search_id + ".";

        if (!this.isSelected)
            return false;

        for (var i = 0; i < this.state.alignments.length; i++)
        {
            if (this.state.selected[this.state.alignments[i]])
            {
                nwk_url += this.state.alignments[i];
                nwk_url += "_";
            }
        }
        nwk_url = nwk_url.substring(0, nwk_url.length - 1);

        var a = d3.select('body').append('a')
        .attr('target', '_blank')
        .attr('href', nwk_url);

        a.node().click();
        setTimeout(function() {
            a.remove();
        }, 100);
    }

    viewTree() {
        var nwk_url = "https://icytree.org/?url=hopper.csb.utoronto.ca/generateTree/" + this.state.search_id + ".";

        if (!this.isSelected)
            return false;

        for (var i = 0; i < this.state.alignments.length; i++)
        {
            if (this.state.selected[this.state.alignments[i]])
            {
                nwk_url += this.state.alignments[i];
                nwk_url += "_";
            }
        }
        nwk_url = nwk_url.substring(0, nwk_url.length - 1);

        var a = d3.select('body').append('a')
        .attr('target', '_blank')
        .attr('href', nwk_url);

        a.node().click();
        setTimeout(function() {
            a.remove();
        }, 100);
    }

    resultsJSX () {
        return (
            <div className="modal-body">
                {
                    _.map(this.state.error_msgs, _.bind(function (error_msg) {
                        return (
                            <div className="fastan">
                                <div className="section-header">
                                    <h4>
                                        {error_msg[0]}
                                    </h4>
                                </div>
                                <div className="section-content">
                                    <pre className="pre-reset">
                                        {error_msg[1]}
                                    </pre>
                                </div>
                            </div>
                        );
                    }, this))
                }
                <div className="row">
                {
                    _.map(this.state.alignments, _.bind(function (alignment) {
                        return (<TreeSelector alignment={alignment} toggleSelected={this.toggleSelected.bind(this)}/>);
                    }, this))
                    
                }
                </div>
                <button type="button" disabled={!this.isSelected()} onClick={this.generateTree.bind(this)}>Generate Tree</button>
                <button type="button" disabled={!this.isSelected()} onClick={this.viewTree.bind(this)}>View Tree on IcyTree</button>
            </div>
        );
    }
}

class TreeSelector extends React.Component {

    render () {
        return (
            <div className="col-md-4">
                <div className="section-content">
                <label>
                    <input type="checkbox" id={this.props.alignment + '_checkbox'}
                        value={false} onChange={function () {
                            this.props.toggleSelected(this.props.alignment);
                        }.bind(this)} data-target={'#' + this.props.alignment}
                    />
                </label>
                     {this.props.alignment}
                </div>
            </div>
        );
    }

    componentDidMount () {

    }
}