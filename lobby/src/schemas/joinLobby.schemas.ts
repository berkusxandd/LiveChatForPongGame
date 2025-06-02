export const joinLobbySchema = {
  body: {
    type: 'object',
    required: ['lobbyId', 'userId'],
    properties: {
      lobbyId: { type: 'integer' },
      userId: { type: 'integer' },
    },
  },
};

export interface JoinLobbyBody {
  lobbyId: number;
  userId: number;
}