import React from 'react';
import { getTranslation } from '../../client/OpenAudioAppContainer';

export function DisabledRegionBanner() {
  return (
    <div className="w-full flex justify-center align-middle">
      <div className="content-section flex justify-center w-4/5 py-5">
        <div className="flex content-card-collection items-stretch">
          <div className="content-text full">
            <div className="text-center">
              <p className="soft-text text-red-500 bg-gray-700 rounded-md">
                {getTranslation(null, 'vc.disabled').replace('%serverName', getTranslation(null, 'serverName'))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
