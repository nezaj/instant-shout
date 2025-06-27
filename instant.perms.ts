// Docs: https://www.instantdb.com/docs/permissions

import type { InstantRules } from "@instantdb/react";

const rules = {
  // Lock down everything
  $default: {
    "allow": {
      "$default": "false"
    }
  }
} satisfies InstantRules;

export default rules;
