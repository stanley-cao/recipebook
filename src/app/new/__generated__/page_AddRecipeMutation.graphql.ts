/**
 * @generated SignedSource<<5d655bcde77f6be3fd8a5bf6102fe49c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type NewRecipe = {
  coverImage?: string | null | undefined;
  description?: string | null | undefined;
  ingredients: ReadonlyArray<NewIngredient>;
  steps: ReadonlyArray<NewStep>;
  tagNames: ReadonlyArray<string>;
  title: string;
};
export type NewIngredient = {
  name: string;
  quantity?: string | null | undefined;
};
export type NewStep = {
  imageUrl?: string | null | undefined;
  index: number;
  text: string;
};
export type page_AddRecipeMutation$variables = {
  input: NewRecipe;
};
export type page_AddRecipeMutation$data = {
  readonly addRecipe: {
    readonly id: string;
  };
};
export type page_AddRecipeMutation = {
  response: page_AddRecipeMutation$data;
  variables: page_AddRecipeMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "Recipe",
    "kind": "LinkedField",
    "name": "addRecipe",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
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
    "name": "page_AddRecipeMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "page_AddRecipeMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "bdb2c5244029c488dc5f5315ff90c9d7",
    "id": null,
    "metadata": {},
    "name": "page_AddRecipeMutation",
    "operationKind": "mutation",
    "text": "mutation page_AddRecipeMutation(\n  $input: NewRecipe!\n) {\n  addRecipe(input: $input) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "b354a9baca4f98b23056fbf05e026aec";

export default node;
