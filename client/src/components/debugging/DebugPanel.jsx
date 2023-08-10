import React from 'react';
import PropTypes from 'prop-types';
import { OaStyleCard } from '../card/OaStyleCard';
import { Graph } from '../graph/Graph';

export default function DebugPanel(props) {
  const { data } = props;

  let highest = null;
  let lowest = null;
  for (let i = 0; i < data.length; i++) {
    const value = data[i];
    if (highest == null) highest = value;
    if (lowest == null) lowest = value;
    if (value > highest) highest = value;
    if (value < lowest) lowest = value;
  }

  return (
    <OaStyleCard width="6" title={props.title}>
      <Graph color={props.color} catchLine={props.title} data={data} fill={props.fill} />
      <table className="w-full text-black">
        <tbody>
          <tr>
            <td className="text-left">Highest</td>
            <td className="text-right">{highest}</td>
          </tr>
          <tr>
            <td className="text-left">Lowest</td>
            <td className="text-right">{lowest}</td>
          </tr>
        </tbody>
      </table>
    </OaStyleCard>
  );
}

DebugPanel.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  color: PropTypes.string,
  fill: PropTypes.bool,
};

DebugPanel.defaultProps = {
  color: 'black',
  fill: false,
};
