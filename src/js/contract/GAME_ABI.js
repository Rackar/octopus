const address_GAME = '0xF5024f332DA848F1D49407c6552ad68E47B8a906';
const ABI_GAME = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'invitingAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'invitedAddress',
        type: 'address',
      },
    ],
    name: 'InviteSuccess',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'allowJoinStartTime',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'allowJoinEndTime',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'gamePlanStartTime',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'playerLimit',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'matchId',
        type: 'uint256',
      },
    ],
    name: 'MatchCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'matchId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'pool',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'winner',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'color',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'lucky',
        type: 'string',
      },
    ],
    name: 'MatchEnded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'matchId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'userAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'color',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'lucky',
        type: 'string',
      },
    ],
    name: 'MatchJoined',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'matchId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'gamePlanStartTime',
        type: 'uint256',
      },
    ],
    name: 'MatchStarted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_startTime',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_power',
        type: 'uint256',
      },
    ],
    name: 'MintCoin',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_user',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'approveAirdropToAddress',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_gap',
        type: 'uint256',
      },
    ],
    name: 'changeMintGap',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'claimMintCoin',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_allowJoinStartTime',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_allowJoinEndTime',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_gamePlanStartTime',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_playerLimit',
        type: 'uint256',
      },
    ],
    name: 'createNewMatch',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'deposit',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_matchId',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: '_color',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_lucky',
        type: 'string',
      },
    ],
    name: 'joinMatch',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_power',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_whoInviteMe',
        type: 'address',
      },
    ],
    name: 'mintCoin',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_matchId',
        type: 'uint256',
      },
    ],
    name: 'startBattle',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'userAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'matchId',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'color',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'lucky',
            type: 'string',
          },
        ],
        internalType: 'struct OCGTgame.Player',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bool',
        name: '_canMint',
        type: 'bool',
      },
    ],
    name: 'switchMint',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'allPlayers',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'balance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'coinCanClaim',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_user',
        type: 'address',
      },
    ],
    name: 'getBalance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getCurentMatchId',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getCurrentMatch',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'allowJoinStartTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'allowJoinEndTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'gamePlanStartTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'playerLimit',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'matchId',
            type: 'uint256',
          },
        ],
        internalType: 'struct OCGTgame.Match',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_matchId',
        type: 'uint256',
      },
    ],
    name: 'getMatchPlayers',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'userAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'matchId',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'color',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'lucky',
            type: 'string',
          },
        ],
        internalType: 'struct OCGTgame.Player[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getNow',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'matches',
    outputs: [
      {
        internalType: 'uint256',
        name: 'allowJoinStartTime',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'allowJoinEndTime',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'gamePlanStartTime',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'playerLimit',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'matchId',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'token',
    outputs: [
      {
        internalType: 'contract OCGTtoken',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

export { address_GAME, ABI_GAME };
