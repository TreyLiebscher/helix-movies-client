// NOTICE: this is an inactive feature due to API cost


import React from 'react';
import propTypes from 'prop-types'
import { PromiseContainerWithRouter } from '../containers/PromiseContainer';
import { getStreaming } from '../lib/tmdbLoader';

export default function StreamingInfo(props) {
    const { info } = props;
    const services = info.locations.map((item, index) => {
        return <li key={index}>
                    <p>{item.display_name}</p>
                    <img src={item.icon} alt="stream company logo"/>
                    <a href={item.url} target="_blank">Watch on {item.display_name}</a>
                </li>
    })
    return (
        <div>
            <p>Streaming info for {info.name}</p>
            <ul>
                {services}
            </ul>
        </div>
    )
    
}

StreamingInfo.propTypes = {
    info: propTypes.object.isRequired
}

const promise = props => {
    const searchTerm = props.match.params.title;
    return getStreaming(searchTerm);
}

const renderFn = (props) => {
    const info = props.resolvedValue;
    const searchTerm = props.match.params.title;
    const p = { info, searchTerm, history: props.history }
    return <StreamingInfo {...p} />
}

const connectedProps = { promise, renderFn };

export const StreamingInfoWithData = () => <PromiseContainerWithRouter {...connectedProps} />