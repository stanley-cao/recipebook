/**
 * @generated SignedSource<<5ed07276a3308333d94a39973b5dd8f1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type page_ToggleLikeMutation$variables = {
  recipeId: string;
};
export type page_ToggleLikeMutation$data = {
  readonly toggleLike: boolean;
};
export type page_ToggleLikeMutation = {
  response: page_ToggleLikeMutation$data;
  variables: page_ToggleLikeMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "recipeId"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "recipeId",
        "variableName": "recipeId"
      }
    ],
    "kind": "ScalarField",
    "name": "toggleLike",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "page_ToggleLikeMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "page_ToggleLikeMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "071fd47151ec152d2d12f25695a7b5b0",
    "id": null,
    "metadata": {},
    "name": "page_ToggleLikeMutation",
    "operationKind": "mutation",
    "text": "mutation page_ToggleLikeMutation(\n  $recipeId: ID!\n) {\n  toggleLike(recipeId: $recipeId)\n}\n"
  }
};
})();

(node as any).hash = "370cf267182f2818336a70629209ca82";

export default node;
