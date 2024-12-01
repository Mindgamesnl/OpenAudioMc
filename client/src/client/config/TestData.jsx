const getRandomSpatialAudio = () => Math.random() < 0.5;

export const SeededTestData = {
  isLoading: false,
  clickLock: false,
  currentUser: {
    userName: 'Mindgamesnl',
    uuid: 'f0c8657b-f384-4df6-9d66-e9f36c36ce8a',
    token: 'test',
    publicServerKey: 'test',
  },

  lang: {
    serverName: 'play.imaginefun.net',
  },

  voiceState: {
    enabled: true,
    ready: true,
    isMutedServerSide: true,
    serverHasModeration: true,
    peersHidden: false,

    peers: {
      // Imagineers
      'e2afb937-6021-4b94-ba17-e6b5f0ec7685': {
        name: 'Midnightb',
        uuid: 'e2afb937-6021-4b94-ba17-e6b5f0ec7685',
        streamKey: 'e2afb937-6021-4b94-ba17-e6b5f0ec7685',
        speaking: getRandomSpatialAudio(),
        muted: false,
        loading: false,
        options: {
          spatialAudio: getRandomSpatialAudio(),
          visible: true,
        },
        displayName: 'Midnightb',
        displayUuid: 'e2afb937-6021-4b94-ba17-e6b5f0ec7685',
      },

      // Devs
      '88243ba3-382f-4eb0-874f-c5831eb3c0a6': {
        name: 'ToetMats',
        uuid: '88243ba3-382f-4eb0-874f-c5831eb3c0a6',
        streamKey: '88243ba3-382f-4eb0-874f-c5831eb3c0a6',
        speaking: getRandomSpatialAudio(),
        muted: false,
        loading: false,
        options: {
          spatialAudio: getRandomSpatialAudio(),
          visible: true,
        },
        displayName: 'ToetMats',
        displayUuid: '88243ba3-382f-4eb0-874f-c5831eb3c0a6',
      },
      'f0c8657b-f384-4df6-9d66-e9f36c36ce8a': {
        name: 'MindGamesNl',
        uuid: 'f0c8657b-f384-4df6-9d66-e9f36c36ce8a',
        streamKey: 'f0c8657b-f384-4df6-9d66-e9f36c36ce8a',
        speaking: getRandomSpatialAudio(),
        muted: false,
        loading: false,
        options: {
          spatialAudio: getRandomSpatialAudio(),
          visible: true,
        },
        displayName: 'MindGamesNl',
        displayUuid: 'f0c8657b-f384-4df6-9d66-e9f36c36ce8a',
      },
      '601b4e30-e0b1-4f7b-af77-bf01a23be9de': {
        name: 'Cubits',
        uuid: '601b4e30-e0b1-4f7b-af77-bf01a23be9de',
        streamKey: '601b4e30-e0b1-4f7b-af77-bf01a23be9de',
        speaking: getRandomSpatialAudio(),
        muted: false,
        loading: false,
        options: {
          spatialAudio: getRandomSpatialAudio(),
          visible: true,
        },
        displayName: 'Cubits',
        displayUuid: '601b4e30-e0b1-4f7b-af77-bf01a23be9de',
      },
      '9f15bf38-96dd-4d0c-ba3b-cc6e447402ec': {
        name: 'DeJayDev',
        uuid: '9f15bf38-96dd-4d0c-ba3b-cc6e447402ec',
        streamKey: '9f15bf38-96dd-4d0c-ba3b-cc6e447402ec',
        speaking: getRandomSpatialAudio(),
        muted: false,
        loading: false,
        options: {
          spatialAudio: getRandomSpatialAudio(),
          visible: true,
        },
        displayName: 'DeJayDev',
        displayUuid: '9f15bf38-96dd-4d0c-ba3b-cc6e447402ec',
      },
      '7db73360-529c-4728-8935-40e62334226c': {
        name: 'RealInstantRamen',
        uuid: '7db73360-529c-4728-8935-40e62334226c',
        streamKey: '7db73360-529c-4728-8935-40e62334226c',
        speaking: getRandomSpatialAudio(),
        muted: false,
        loading: false,
        options: {
          spatialAudio: getRandomSpatialAudio(),
          visible: true,
        },
        displayName: 'RealInstantRamen',
        displayUuid: '7db73360-529c-4728-8935-40e62334226c',
      },

      // Park Operators
      '5bf38c73-7fae-4144-a70e-b30b903a9658': {
        name: 'Jackets_',
        uuid: '5bf38c73-7fae-4144-a70e-b30b903a9658',
        streamKey: '5bf38c73-7fae-4144-a70e-b30b903a9658',
        speaking: getRandomSpatialAudio(),
        muted: false,
        loading: false,
        options: {
          spatialAudio: getRandomSpatialAudio(),
          visible: true,
        },
        displayName: 'Jackets_',
        displayUuid: '5bf38c73-7fae-4144-a70e-b30b903a9658',
      },
      'afb4bb27-0166-48d8-9478-9b96dc1efd09': {
        name: 'Foolish__Mortal',
        uuid: 'afb4bb27-0166-48d8-9478-9b96dc1efd09',
        streamKey: 'afb4bb27-0166-48d8-9478-9b96dc1efd09',
        speaking: getRandomSpatialAudio(),
        muted: false,
        loading: false,
        options: {
          spatialAudio: getRandomSpatialAudio(),
          visible: true,
        },
        displayName: 'Foolish__Mortal',
        displayUuid: 'afb4bb27-0166-48d8-9478-9b96dc1efd09',
      },
      'cc977440-03e1-4282-8996-6855dc912265': {
        name: 'Wuttles1',
        uuid: 'cc977440-03e1-4282-8996-6855dc912265',
        streamKey: 'cc977440-03e1-4282-8996-6855dc912265',
        speaking: getRandomSpatialAudio(),
        muted: false,
        loading: false,
        options: {
          spatialAudio: getRandomSpatialAudio(),
          visible: true,
        },
        displayName: 'Wuttles1',
        displayUuid: 'cc977440-03e1-4282-8996-6855dc912265',
      },
      'c5b29f32-5dba-4d85-8f2e-5bcd509f0589': {
        name: 'Yelyyah',
        uuid: 'c5b29f32-5dba-4d85-8f2e-5bcd509f0589',
        streamKey: 'c5b29f32-5dba-4d85-8f2e-5bcd509f0589',
        speaking: getRandomSpatialAudio(),
        muted: false,
        loading: false,
        options: {
          spatialAudio: getRandomSpatialAudio(),
          visible: true,
        },
        displayName: 'Yelyyah',
        displayUuid: 'c5b29f32-5dba-4d85-8f2e-5bcd509f0589',
      },
      '00db9369-d27b-4b73-bbec-38be7ac65950': {
        name: 'Godsgiftt',
        uuid: '00db9369-d27b-4b73-bbec-38be7ac65950',
        streamKey: '00db9369-d27b-4b73-bbec-38be7ac65950',
        speaking: getRandomSpatialAudio(),
        muted: false,
        loading: false,
        options: {
          spatialAudio: getRandomSpatialAudio(),
          visible: true,
        },
        displayName: 'Godsgiftt',
        displayUuid: '00db9369-d27b-4b73-bbec-38be7ac65950',
      },
      'd8c63cfd-67a1-4da4-b754-57bc3325cc16': {
        name: 'YetiSlippers',
        uuid: 'd8c63cfd-67a1-4da4-b754-57bc3325cc16',
        streamKey: 'd8c63cfd-67a1-4da4-b754-57bc3325cc16',
        speaking: getRandomSpatialAudio(),
        muted: false,
        loading: false,
        options: {
          spatialAudio: getRandomSpatialAudio(),
          visible: true,
        },
        displayName: 'YetiSlippers',
        displayUuid: 'd8c63cfd-67a1-4da4-b754-57bc3325cc16',
      },
      'c03e8c45-92ec-41ce-bbfb-de806aa4d38c': {
        name: 'Dispelsa',
        uuid: 'c03e8c45-92ec-41ce-bbfb-de806aa4d38c',
        streamKey: 'c03e8c45-92ec-41ce-bbfb-de806aa4d38c',
        speaking: getRandomSpatialAudio(),
        muted: false,
        loading: false,
        options: {
          spatialAudio: getRandomSpatialAudio(),
          visible: true,
        },
        displayName: 'Dispelsa',
        displayUuid: 'c03e8c45-92ec-41ce-bbfb-de806aa4d38c',
      },
    },
  },
  voiceChannels: {
    activeChannelId: 'staff-chat',
    channels: {
      'team-a': {
        name: 'private-channel',
        firstMembers: [
          {
            name: 'IModZombies4Fun',
            uuid: '6bed63db-beda-461f-a3a2-d138fd8e5bf4',
          },
        ],
      },
      'staff-chat': {
        name: 'staff-chat',
        firstMembers: [
          {
            name: 'Mats',
            uuid: '88243ba3-382f-4eb0-874f-c5831eb3c0a6',
          },
          {
            name: 'Cubits',
            uuid: '601b4e30-e0b1-4f7b-af77-bf01a23be9de',
          },
          {
            name: 'Cameron_273',
            uuid: '3c94548c-c78d-4fe2-a27b-3cf29dfe4497',
          },
        ],
        otherMembers: 6,
      },
      'off-topic': {
        name: 'off-topic',
        firstMembers: [
          {
            name: 'Izzy_29x',
            uuid: '6774cf2b-9185-4b53-993f-8e8339f4acae',
          },
          {
            name: 'Kai',
            uuid: '937acdcd-3170-42e4-9dc7-014aac719a4e',
          },
        ],
        joinable: true,
        otherMembers: 0,
      },
    },
  },
};
