/**
 * @generated SignedSource<<10675547ab9529a5ebd6aeb240162ab2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type page_AddCommentMutation$variables = {
  recipeId: string;
  text: string;
};
export type page_AddCommentMutation$data = {
  readonly addComment: {
    readonly author: {
      readonly name: string | null | undefined;
    };
    readonly id: string;
    readonly text: string;
  };
};
export type page_AddCommentMutation = {
  response: page_AddCommentMutation$data;
  variables: page_AddCommentMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "recipeId"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "text"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "recipeId",
    "variableName": "recipeId"
  },
  {
    "kind": "Variable",
    "name": "text",
    "variableName": "text"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "text",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "page_AddCommentMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Comment",
        "kind": "LinkedField",
        "name": "addComment",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "author",
            "plural": false,
            "selections": [
              (v4/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "page_AddCommentMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Comment",
        "kind": "LinkedField",
        "name": "addComment",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "author",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "74d931a998136d72c30311d98e90bcaa",
    "id": null,
    "metadata": {},
    "name": "page_AddCommentMutation",
    "operationKind": "mutation",
    "text": "mutation page_AddCommentMutation(\n  $recipeId: ID!\n  $text: String!\n) {\n  addComment(recipeId: $recipeId, text: $text) {\n    id\n    text\n    author {\n      name\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "d5e0406fdb1ea5fd014e0c86836dd09b";

export default node;
