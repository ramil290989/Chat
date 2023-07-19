import React from 'react';
import { useSelector } from 'react-redux';
import { selectors as channelsSelectors } from '../../slices/channelsSlice.js';
import ChannelButtonWithDropdown from './ChannelButtonWithDropdown.jsx';
import ChannelButton from './ChannelButton.jsx';

const ChannelsList = () => {
  const channels = useSelector(channelsSelectors.selectAll);

  return (
    <ul className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
      {channels.map((channel) => (
        <li className="nav-item w-100" key={channel.id}>
          {!channel.removable
            ? (<ChannelButton channel={channel} />)
            : (<ChannelButtonWithDropdown channel={channel} />)}
        </li>
      ))}
    </ul>
  );
};

export default ChannelsList;
