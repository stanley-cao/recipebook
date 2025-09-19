/**
 * @generated SignedSource<<a75a7256d7617f8b65673884e3570420>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type RecipeClientQuery$variables = {
  tags?: ReadonlyArray<string> | null | undefined;
};
export type RecipeClientQuery$data = {
  readonly recipes: ReadonlyArray<{
    readonly coverImage: string | null | undefined;
    readonly description: string | null | undefined;
    readonly estimatedMinutes: number | null | undefined;
    readonly id: string;
    readonly tags: ReadonlyArray<string>;
    readonly title: string;
  }>;
};
export type RecipeClientQuery = {
  response: RecipeClientQuery$data;
  variables: RecipeClientQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
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
        "name": "tags",
        "variableName": "tags"
      }
    ],
    "concreteType": "Recipe",
    "kind": "LinkedField",
    "name": "recipes",
    "plural": true,
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
        "name": "coverImage",
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
    "name": "RecipeClientQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RecipeClientQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "18d4c943a373727e59c3fe5d2c8122fe",
    "id": null,
    "metadata": {},
    "name": "RecipeClientQuery",
    "operationKind": "query",
    "text": "query RecipeClientQuery(\n  $tags: [String!]\n) {\n  recipes(tags: $tags) {\n    id\n    title\n    description\n    coverImage\n    tags\n    estimatedMinutes\n  }\n}\n"
  }
};
})();

(node as any).hash = "e532d4c888cca206fbe254978831881a";

export default node;
