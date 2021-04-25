### Game State

```json
{
  "id": "asdlkahsdlb12301293",
  "active": false,
  "level": 1,
  "players": [
    {
      "id": 1,
      "name": "Jason",
      "position": { "x": 10, "y": 1 },
      "cards": [{ "id": 1, "value": 15, "x": 10, "y": 10 }]
    }
  ],
  "positionMatrix": [[], []],
  "metadata": {
    "lives": 4,
    "ninjastars": 2
  },
  "stack": [{ "id": 1, "value": 15, "playedBy": 1 }]
}
```

```ts
const ACTIONS = [
  "INIT": { },
  "JOIN": { "id": 1 },
  "CHANGE_CARD_POSITION": { "id": 1, "x": 1, "y": 1 },
  "PLAYER_HAND_UP_START": { "id": 1, "x": 1, "y": 1 },
  "PLAYER_HAND_UP_END": { "id": 1, "x": 1, "y": 1 },
  "PLAYER_HAND_DOWN_START": { "id": 1, "x": 1, "y": 1 },
  "PLAYER_HAND_DOWN_END": { "id": 1, "x": 1, "y": 1 }
]
```
