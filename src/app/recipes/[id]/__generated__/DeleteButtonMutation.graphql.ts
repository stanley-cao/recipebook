/**
 * @generated SignedSource<<580db52a4dea8340fb086bf4e20d25c9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type DeleteButtonMutation$variables = {
  id: string;
};
export type DeleteButtonMutation$data = {
  readonly deleteRecipe: boolean;
};
export type DeleteButtonMutation = {
  response: DeleteButtonMutation$data;
  variables: DeleteButtonMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "kind": "ScalarField",
    "name": "deleteRecipe",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "DeleteButtonMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "DeleteButtonMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "570e266b4895dbfd32e0f49afd836d66",
    "id": null,
    "metadata": {},
    "name": "DeleteButtonMutation",
    "operationKind": "mutation",
    "text": "mutation DeleteButtonMutation(\n  $id: ID!\n) {\n  deleteRecipe(id: $id)\n}\n"
  }
};
})();

(node as any).hash = "6e5de696820b30251cbfc1b5d80642bd";

export default node;
