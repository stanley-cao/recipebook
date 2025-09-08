/**
 * @generated SignedSource<<b3a2a5e722c2c7d59ee7e4bbb8c9e715>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type page_RecipesQuery$variables = {
  first: number;
  tags?: ReadonlyArray<string> | null | undefined;
};
export type page_RecipesQuery$data = {
  readonly recipes: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly description: string | null | undefined;
        readonly id: string;
        readonly likesCount: number;
        readonly title: string;
      };
    }>;
  };
};
export type page_RecipesQuery = {
  response: page_RecipesQuery$data;
  variables: page_RecipesQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "first"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "tags"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "first",
        "variableName": "first"
      },
      {
        "kind": "Variable",
        "name": "tags",
        "variableName": "tags"
      }
    ],
    "concreteType": "RecipeConnection",
    "kind": "LinkedField",
    "name": "recipes",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "RecipeEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Recipe",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              },
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
                "name": "likesCount",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
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
    "name": "page_RecipesQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "page_RecipesQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "bbe6bc72b8fb3deb429c637f13db6813",
    "id": null,
    "metadata": {},
    "name": "page_RecipesQuery",
    "operationKind": "query",
    "text": "query page_RecipesQuery(\n  $first: Int!\n  $tags: [String!]\n) {\n  recipes(first: $first, tags: $tags) {\n    edges {\n      node {\n        id\n        title\n        description\n        likesCount\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "fbb0d5d3ae0a5d913c4e647beba48df1";

export default node;
