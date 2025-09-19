/**
 * @generated SignedSource<<6dd6c6256626aa5d503614df13c5351a>>
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
  estimatedMinutes?: number | null | undefined;
  images?: ReadonlyArray<string> | null | undefined;
  ingredients: ReadonlyArray<NewIngredient>;
  slug?: string | null | undefined;
  steps: ReadonlyArray<NewStep>;
  tags?: ReadonlyArray<string> | null | undefined;
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
export type pageAddRecipeMutation$variables = {
  input: NewRecipe;
};
export type pageAddRecipeMutation$data = {
  readonly addRecipe: {
    readonly id: string;
  };
};
export type pageAddRecipeMutation = {
  response: pageAddRecipeMutation$data;
  variables: pageAddRecipeMutation$variables;
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
    "name": "pageAddRecipeMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "pageAddRecipeMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "a7974b82d33491a0942b2c95f0e8d69a",
    "id": null,
    "metadata": {},
    "name": "pageAddRecipeMutation",
    "operationKind": "mutation",
    "text": "mutation pageAddRecipeMutation(\n  $input: NewRecipe!\n) {\n  addRecipe(input: $input) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "e10e0249610df9f0715e7f601ca6e999";

export default node;
