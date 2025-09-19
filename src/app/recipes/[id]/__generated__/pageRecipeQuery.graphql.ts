/**
 * @generated SignedSource<<359151c21dcad5fa4762e6f7a4e22f32>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type pageRecipeQuery$variables = {
  id: string;
};
export type pageRecipeQuery$data = {
  readonly recipe: {
    readonly coverImage: string | null | undefined;
    readonly createdAt: any;
    readonly description: string | null | undefined;
    readonly estimatedMinutes: number | null | undefined;
    readonly id: string;
    readonly images: ReadonlyArray<string>;
    readonly ingredients: ReadonlyArray<{
      readonly id: string;
      readonly name: string;
      readonly quantity: string | null | undefined;
    }>;
    readonly steps: ReadonlyArray<{
      readonly id: string;
      readonly imageUrl: string | null | undefined;
      readonly index: number;
      readonly text: string;
    }>;
    readonly tags: ReadonlyArray<string>;
    readonly title: string;
    readonly updatedAt: any;
  } | null | undefined;
};
export type pageRecipeQuery = {
  response: pageRecipeQuery$data;
  variables: pageRecipeQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "Recipe",
    "kind": "LinkedField",
    "name": "recipe",
    "plural": false,
    "selections": [
      (v1/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "title",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "description",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "coverImage",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "images",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "tags",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "estimatedMinutes",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Ingredient",
        "kind": "LinkedField",
        "name": "ingredients",
        "plural": true,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "quantity",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Step",
        "kind": "LinkedField",
        "name": "steps",
        "plural": true,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "index",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "text",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "imageUrl",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "createdAt",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "updatedAt",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "pageRecipeQuery",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "pageRecipeQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "323126e4a82c136ea9a39ed9e36de084",
    "id": null,
    "metadata": {},
    "name": "pageRecipeQuery",
    "operationKind": "query",
    "text": "query pageRecipeQuery(\n  $id: ID!\n) {\n  recipe(id: $id) {\n    id\n    title\n    description\n    coverImage\n    images\n    tags\n    estimatedMinutes\n    ingredients {\n      id\n      name\n      quantity\n    }\n    steps {\n      id\n      index\n      text\n      imageUrl\n    }\n    createdAt\n    updatedAt\n  }\n}\n"
  }
};
})();

(node as any).hash = "0c9f1c78ff0f78f417fb70430d79fcd8";

export default node;
