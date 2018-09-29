import React, { Component } from 'react';
import propTypes from 'prop-types'
import { PromiseContainerWithRouter } from '../containers/PromiseContainer';
import { getStreamingAvailability, getStreaming } from '../lib/tmdbLoader';

export default function StreamingInfo(props) {
    const { info } = props;
    const services = info.locations.map((item, index) => {
        return <li key={index}>{item.display_name}</li>
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
    // return getStreamingAvailability(searchTerm);
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