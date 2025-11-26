import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/games', () => {
    return HttpResponse.json([
      {
        id: 1,
        name: 'Game 1',
        url: 'game1'
      },
      {
        id: 2,
        name: 'Game 2',
        url: 'game2'
      },
      {
        id: 3,
        name: 'Game 3',
        url: 'game3'
      },
      {
        id: 4,
        name: 'Game 4',
        url: 'game4'
      },
      {
        id: 5,
        name: 'Game 5',
        url: 'game5'
      }
    ])
  }),
  http.get('/api/games/:game_id/items', () => {
    return HttpResponse.json([
      {
        id: 1,
        name: 'Item 1',
        sources: ['Crafting', 'Gathering']
      },
      {
        id: 2,
        name: 'Item 2',
        sources: ['Crafting']
      },
      {
        id: 3,
        name: 'Item 3',
        sources: ['Mining']
      },
      {
        id: 4,
        name: 'Item 4',
        sources: ['Mining']
      },
      {
        id: 5,
        name: 'Item 5',
        sources: ['Mining']
      }
    ])
  }),
  http.get<{ game_id: string }>('/api/games/:game_id/items/:item_id/recipes', ({ params }) => {
    if(!params.game_id) {
      return HttpResponse.json({ error: "Game not found" }, { status: 404 });
    } else {
      return HttpResponse.json(Array(5).fill(
        {
          "id": 1,
          "category": "Crafting",
          "ingredients": {
            "Item 1": 1,
            "Item 2": 2,
            "Item 3": 3,
          },
          "products": {
            "Product": 1
          },
          "requirements": {
            "Tool": 1,
          }
        }
      ));
    }
  }),
  http.get<{ game_id: string }>('/api/games/:game_id/items/:item_id/ingredients', ({ request, params }) => {
    const url = new URL(request.url);
    const quantity = url.searchParams.get('quantity') ?? '1';
    const quantityAsFloat = Number.parseFloat(quantity);

    if(!params.game_id) {
      return HttpResponse.json({ error: "Game not found" }, { status: 404 });
    } else {
      return HttpResponse.json({"ingredients": {
        "Item 1": 1 * quantityAsFloat,
        "Item 2": 2 * quantityAsFloat,
        "Item 3": 3 * quantityAsFloat,
      }});
    }
  }),
  http.get<{ game_id: string }>('/api/games/:game_id/craftingGrid', () => {
    return HttpResponse.json(
      [
        {
        "id": 1,
        "products": {
            "Item 1": 1
        },
        "crafting_coordinates": {
            "A1": "Item 3",
            "A2": "Item 3",
            "A3": "Item 3",
            "B1": "Item 3",
            "B2": "",
            "B3": "Item 3",
            "C1": "Item 3",
            "C2": "Item 3",
            "C3": "Item 3"
        }
      },
      {
        "id": 2,
        "products": {
            "Item 2": 1
        },
        "crafting_coordinates": {
            "A1": "",
            "A2": "",
            "A3": "",
            "B1": "Item 1",
            "B2": "Item 1",
            "B3": "",
            "C1": "Item 1",
            "C2": "Item 1",
            "C3": ""
        }}]);
  }),
  
  http.get<{ game_id: string }>('/api/games/:game_id/items/:item_id/craftingGrid', () => {
    return HttpResponse.json(
      [
        {
        "id": 1,
        "products": {
            "Item 1": 1
        },
        "crafting_coordinates": {
            "A1": "Item 3",
            "A2": "Item 3",
            "A3": "Item 3",
            "B1": "Item 3",
            "B2": "",
            "B3": "Item 3",
            "C1": "Item 3",
            "C2": "Item 3",
            "C3": "Item 3"
        }
      },
      {
        "id": 2,
        "products": {
            "Item 2": 1
        },
        "crafting_coordinates": {
            "A1": "",
            "A2": "",
            "A3": "",
            "B1": "Item 1",
            "B2": "Item 1",
            "B3": "",
            "C1": "Item 1",
            "C2": "Item 1",
            "C3": ""
        }}]);
  }),
]